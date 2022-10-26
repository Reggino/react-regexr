/** @format */

'use strict';

var PropTypes = require('prop-types');

var React = require('react');

var PatternEditor = require('./PatternEditor');

class ExpressionEditor extends React.PureComponent {
  render() {
    return React.createElement(
      'div',
      { className: 'regexr regexr-expression' },
      React.createElement(
        'div',
        { className: 'regexr-left' },
        '/'
      ),
      React.createElement(
        'div',
        null,
        React.createElement(PatternEditor, {
          value: this.props.pattern,
          onChange: this.props.onPatternChange,
          height: this.props.height
        })
      ),
      React.createElement(
        'div',
        { className: 'regexr-right' },
        '/'
      )
    );
  }
}

ExpressionEditor.propTypes = {
  pattern: PropTypes.string.isRequired,
  flags: PropTypes.string.isRequired,

  onPatternChange: PropTypes.func.isRequired,
  onFlagsChange: PropTypes.func,

  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Defaults to 100%
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]) // Defaults to auto
};

module.exports = ExpressionEditor;