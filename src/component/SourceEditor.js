import React from "react";
import { findDOMNode } from "react-dom";
import { PropTypes } from 'prop-types';

import { CodeMirror } from './Codemirror';
import { SourceHighlighter } from './regexr-site/SourceHighlighter';
import { RegExLexer } from './regexr-site/RegExLexer';
import { RegExJS } from './regexr-site/RegExJS';
import { Docs } from './regexr-site/utils/Docs';
import { Tooltip } from './regexr-site/controls/Tooltip';
import { CMUtils } from './regexr-site/utils/CMUtils';

import { RegexUtils } from './RegexUtils';

class SourceEditor extends React.PureComponent {
  // Using this as a ref, you can also use:
  // - scrollToMatch: scrolls to the nth match

  state = {
    hoverX: null,
    hoverY: null,
  };

  componentDidMount() {
    this._exprLexer = new RegExLexer();

    var cmElem = this._cmElem;

    // We need some way of styling width/height
    // of this for sizing the cmDiv to 100%
    var cmDiv = findDOMNode(cmElem);
    cmDiv.style.width = this.props.width || '100%';
    cmDiv.style.height = this.props.height || 'auto';

    var cm = cmElem.getCodeMirror();
    cm.setSize(this.props.width, this.props.height);

    var options = this.props.options || {};
    var themeColor = options.themeColor || '#6CF';

    // Initialize source highlighter, tooltips
    this.sourceHighlighter = new SourceHighlighter(cm, this._sourceCanvas, themeColor);
    this.sourceTooltip = Tooltip.add(cm.display.lineDiv);
    this.sourceTooltip.on('mousemove', this.handleMouseMove, this);
    this.sourceTooltip.on('mouseout', this.handleMouseOut, this);

    this.resizeCanvas();

    this._resizeListener = window.addEventListener('resize', this.resizeCanvas);
  }

  componentWillUnmount() {
    window.removeEventListener(this._resizeListener);
  }

  resizeCanvas = () => {
    var rect = this._sourceMeasure.getBoundingClientRect();
    this._sourceCanvas.width = rect.right - rect.left || 0;
    this._sourceCanvas.height = rect.bottom - rect.top || 0;

    this.redraw();
  };

  /**
   * Get the matches given the current regex (from
   * props.pattern and props.flags) and text
   * @param {String}   text   text to match against
   * @param {function} callback  callback that gets called with
   *                             (error, matches)
   *
   */
  getMatches = (text, callback) => {
    // 1. Validate with lexing
    var pattern = this.props.pattern;
    var flags = this.props.flags;

    var regex = null;
    if (pattern) {
      // Don't allow empty regex: guaranteed infinite loop
      try {
        regex = new RegExp(pattern, flags);
      } catch (e) {
        // Invalid regexp
      }
    }

    if (!regex) {
      callback('invalid');
    } else {
      // To prevent regex DDoS, RegExr offloads to a
      // Web Worker
      RegExJS.match(regex, text, callback);
    }
  };

  redraw = text => {
    text = text || this.props.text;

    // Redraw source highlights
    this.getMatches(
      text,
      function (error, matches) {
        var hoverX = this.state.hoverX;
        var hoverY = this.state.hoverY;
        var hoverMatch = null;

        if (!error && hoverX && hoverY) {
          var cm = this._cmElem.getCodeMirror();
          // Check what index character we're hovering over
          var index = CMUtils.getCharIndexAt(cm, hoverX, hoverY);

          // See which match, if any, we're hovering over
          hoverMatch = index != null ? RegexUtils.getMatchAt(matches, index) : null;

          if (hoverMatch) {
            var rect = index != null && CMUtils.getCharRect(cm, index);
            if (rect) {
              rect.right = rect.left = hoverX;
            }
            this.sourceTooltip.show(Docs.forMatch(hoverMatch), rect);
          } else {
            this.sourceTooltip.hide();
          }
        }

        this.sourceHighlighter.draw(error ? null : matches, hoverMatch, null);

        this.sendOnViewportChange(matches);
      }.bind(this)
    );
  };

  /**
   * Send a call to the onViewportChange handler on scrolls,
   * changes in the content, etc.
   * @return { from, to, prevMatch, nextMatch }
   *         where from, to are both character counts, and
   *         prevMatch, nextMatch are the indexes of the
   *         first match before and after the visible section
   */
  sendOnViewportChange = matches => {
    if (!this.props.onViewportChange) return;

    var cm = this._cmElem.getCodeMirror();

    var viewport = cm.getScrollInfo();
    var left = viewport.left;
    var top = viewport.top;
    var right = viewport.left + viewport.clientWidth;
    var bottom = viewport.top + viewport.clientHeight;
    var firstChar = cm.indexFromPos(cm.coordsChar({ left: left, top: top }, 'local'));
    var lastChar = cm.indexFromPos(cm.coordsChar({ left: right, top: bottom }, 'local'));

    var processMatches = function processMatches(matches) {
      var prevMatch = null;
      var nextMatch = null;

      if (matches) {
        for (var i = 0; i !== matches.length; i++) {
          var match = matches[i];
          if (match.end < firstChar) {
            prevMatch = i;
          } else if (match.index > lastChar) {
            nextMatch = i;
            break;
          }
        }
      }

      var ret = {
        firstChar: firstChar,
        lastChar: lastChar,
        prevMatch: prevMatch,
        nextMatch: nextMatch,
      };

      this.props.onViewportChange(ret);
    }.bind(this);

    if (matches) {
      processMatches(matches);
    } else {
      this.getMatches(this.props.text, function (error, matches) {
        processMatches(matches);
      });
    }
  };

  handleCMChange = text => {
    this.props.onTextChange(text);
  };

  handleCMScroll = () => {
    this.redraw();
  };

  componentDidUpdate() {
    // Redraw with slight delay so that it's
    // based on new content
    setTimeout(this.redraw, 1);
  }

  handleMouseMove = event => {
    this.setState({
      hoverX: event.clientX,
      hoverY: event.clientY,
    });
  };

  handleMouseOut = () => {
    this.setState({ hoverX: null, hoverY: null });
  };

  /**
   * Scrolls to the nth match
   * (does nothing if the nth match doesn't exist)
   * @param {int} matchIndex    index of the match
   */
  scrollToMatch = matchIndex => {
    var cm = this._cmElem.getCodeMirror();
    this.getMatches(this.props.text, function (error, matches) {
      var match = matches[matchIndex];

      if (match) {
        cm.scrollIntoView({
          from: cm.posFromIndex(match.index),
          to: cm.posFromIndex(match.end),
        });
      }
    });
  };

  render() {
    var text = this.props.text;
    var options = this.props.options;
    var containerStyle = this.props.containerStyle;

    var width = this.props.width || '100%';
    var height = this.props.height || 'auto';
    var style = { width: width, height: height };

    return (
      <div style={Object.assign(style, containerStyle)}>
        <canvas
          className="regexr-source-canvas"
          width="1"
          height="1"
          ref={function (elem) {
            this._sourceCanvas = elem;
          }.bind(this)}
        ></canvas>

        <div
          className="regexr-source-measure"
          style={style}
          ref={function (elem) {
            this._sourceMeasure = elem;
          }.bind(this)}
        >
          <CodeMirror
            className="regexr-source-editor"
            onChange={this.handleCMChange}
            value={text}
            options={Object.assign(
              {
                tabSize: 2,
                indentWithTabs: false,
                readOnly: !this.props.onTextChange,
              },
              options
            )}
            onScroll={this.handleCMScroll}
            ref={function (elem) {
              this._cmElem = elem;
            }.bind(this)}
          />
        </div>
      </div>
    );
  }
}

SourceEditor.propTypes = {
  pattern: PropTypes.string,
  flags: PropTypes.string,

  text: PropTypes.string.isRequired,
  onTextChange: PropTypes.func,
  // If omitted, text will be readOnly

  containerStyle: PropTypes.object,
  // Extra style for container div

  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  options: PropTypes.object,
  // Additional options for the CodeMirror editor

  onViewportChange: PropTypes.func,
  // A listener to see which matches are visible
};

export {   SourceEditor };
