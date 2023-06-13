/* eslint-disable */
'use strict';

var React = require('react');
var ExpressionEditor = require('../src/ExpressionEditor');
var SourceEditor = require('../src/SourceEditor');

class MainPage extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      includePattern: '\\/.+\\d+\\/.+.html',
      excludePattern: '[\\d]+',
      shouldMatchText: [
        '/binnenland/6232158/schippers-hadden-vlak-voor-dodelijke-aanvaring-waddenzee-marifooncontact.html',
        '/buitenland/6231337/britse-vakbonden-boos-over-hoge-uitkering-voor-oud-premier-truss.html',
        '/achterklap/6232016/zangeres-tabitha-bevallen-van-tweede-dochter.html',
      ].join('\n'),
      shouldNotMatchText: [
        '/',
        '/spanningen-oekraine',
        '/tickets',
        '/296075/video/hoe-helpt-het-satellietnetwerk-starlink-oekraine-in-de-oorlog.html',
      ].join('\n'),
    };
  }

  handleIncludePatternChange = value => {
    this.setState({ includePattern: value });
  };

  handleExcludePatternChange = value => {
    this.setState({ excludePattern: value });
  };

  handleShouldMatchChange = value => {
    this.setState({ shouldMatchText: value });
  };

  handleShouldNotMatchChange = value => {
    this.setState({ shouldNotMatchText: value });
  };

  render() {
    const { includePattern, excludePattern, shouldMatchText, shouldNotMatchText } = this.state;
    return (
      <div>
        <h1>https://www.nu.nl</h1>
        <div style={{ display: 'flex' }}>
          <div>
            <h2>Include</h2>
            <ExpressionEditor
              pattern={includePattern}
              flags={'g'}
              onPatternChange={this.handleIncludePatternChange}
            />
            <h3>Should include</h3>
            <SourceEditor
              pattern={includePattern}
              flags="gm"
              onTextChange={this.handleShouldMatchChange}
              text={shouldMatchText || ''}
              options={{
                lineWrapping: true,
              }}
              ref={function (elem) {
                this._shouldMatchEditor = elem;
              }.bind(this)}
            />
          </div>
          <div style={{ marginLeft: 20 }}>
            <h2>Exclude</h2>
            <ExpressionEditor
              pattern={excludePattern}
              flags="g"
              onPatternChange={this.handleExcludePatternChange}
            />
            <h3>Should exclude</h3>
            <SourceEditor
              pattern={excludePattern || ''}
              flags="g"
              onTextChange={this.handleShouldNotMatchChange}
              text={shouldNotMatchText || ''}
              options={{
                lineWrapping: true,
              }}
              ref={function (elem) {
                this._shouldNotMatchEditor = elem;
              }.bind(this)}
            />
          </div>
        </div>
        <button
          onClick={() => {
            this.setState({
              includePattern: 'something\\dcompletely.different',
            });
          }}
        >
          Set new value
        </button>
      </div>
    );
  }
}

module.exports = MainPage;
