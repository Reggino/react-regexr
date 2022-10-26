/** @format */

'use strict';

var PropTypes = require('prop-types');

var React = require('react');

class Tooltip extends React.PureComponent {
  render() {
    var children = this.props.children;
    var className = this.props.className || '';

    return React.createElement(
      'div',
      { className: 'regexr regexr-react-tooltip ' + className },
      children
    );
  }
}

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

module.exports = Tooltip;