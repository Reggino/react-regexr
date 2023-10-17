/** @format */

import { PropTypes } from 'prop-types';

import React from 'react';
import { CodeMirror } from './Codemirror';
// import 'codemirror/addon/display/placeholder';

import { ExpressionHighlighter } from './regexr-site/ExpressionHighlighter';
import { ExpressionHover } from './regexr-site/ExpressionHover';
import { RegexUtils } from './RegexUtils';

class PatternEditor extends React.PureComponent {
  componentDidMount() {
    var elem = this._cmElem;

    var cm = elem.getCodeMirror();
    var width = null;
    var height = this.props.height || 'auto';
    cm.setSize(width, height);

    // Copied from regexr code:
    // Hacky method to disable overwrite mode on expressions to avoid overwriting flags
    cm.toggleOverwrite = function () {};

    this._cmElem = elem;
    this._expressionHighlighter = new ExpressionHighlighter(cm);
    this._expressionHover = new ExpressionHover(cm, this._expressionHighlighter);

    this.updateCodeMirror(this.props.value);
  }

  updateCodeMirror(pattern) {
    if (this._cmElem) {
      this._cmElem.getCodeMirror().setValue(pattern);
    }
    var parsed = RegexUtils.parsePattern(pattern);
    this._expressionHighlighter.draw(parsed.tree);
    this._expressionHover.token = parsed.token;
  }

  componentDidUpdate() {
    this.updateCodeMirror(this.props.value);
  }

  render() {
    var value = this.props.value;

    return (
      <CodeMirror
        className="regexr regexr-expression-editor"
        value={value}
        onChange={this.props.onChange}
        options={{
          lineNumbers: false,
          tabSize: 2,
          indentWithTabs: false,
          placeholder: '(Type a regular expression)',
          lineWrapping: true,
        }}
        ref={function (elem) {
          this._cmElem = elem;
        }.bind(this)}
      />
    );
  }
}

PatternEditor.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,

  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Defaults to 100%
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Defaults to auto
};

export {  PatternEditor };
