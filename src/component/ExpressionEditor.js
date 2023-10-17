/** @format */



import { PropTypes } from "prop-types";

import React from "react";

import { PatternEditor } from "./PatternEditor";

class ExpressionEditor extends React.PureComponent {
  render() {
    return (
      <div className="regexr regexr-expression">
        <div className="regexr-left">/</div>
        <div>
          <PatternEditor
            value={this.props.pattern}
            onChange={this.props.onPatternChange}
            height={this.props.height}
          />
        </div>
        <div className="regexr-right">/</div>
      </div>
    );
  }
}

ExpressionEditor.propTypes = {
  pattern: PropTypes.string.isRequired,
  flags: PropTypes.string.isRequired,

  onPatternChange: PropTypes.func.isRequired,
  onFlagsChange: PropTypes.func,

  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Defaults to 100%
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Defaults to auto
};

export  { ExpressionEditor };
