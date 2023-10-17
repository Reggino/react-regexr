/** @format */



import { PropTypes } from 'prop-types';

import { React } from 'react';

class Tooltip extends React.PureComponent {
  render() {
    var children = this.props.children;
    var className = this.props.className || '';

    return <div className={'regexr regexr-react-tooltip ' + className}>{children}</div>;
  }
}

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export {Tooltip};
