'use strict';

var React = require('react');
var shallowCompare = require('react-addons-shallow-compare');

var PatternEditor = require('./PatternEditor');
var FlagsEditor = require('./FlagsEditor');

var ExpressionEditor = React.createClass({
  propTypes: {
    pattern: React.PropTypes.string.isRequired,
    flags: React.PropTypes.string.isRequired,

    onPatternChange: React.PropTypes.func.isRequired,
    onFlagsChange: React.PropTypes.func.isRequired,

    width: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),  // Defaults to 100%
    height: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ])   // Defaults to auto
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  },

  render: function() {
    return (<div className="regexr regexr-expression">
      <div className="regexr-left">/</div>
      <div>
        <PatternEditor
            value={this.props.pattern}
            onChange={this.props.onPatternChange}
            width={this.props.width}
            height={this.props.height} />
      </div>
      <div className="regexr-right">
        <FlagsEditor
            value={this.props.flags}
            onChange={this.props.onFlagsChange} />
      </div>
    </div>);
  },
});

module.exports = ExpressionEditor;
