import React from "react";
import ReactDOM from "react-dom/client";
import { SourceEditor, ExpressionEditor } from './component';
import './component/index.css'

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const Test = () => {
    const [includePattern, setIncludePattern] = React.useState('\\/.+\\d+\\/.+.html');
    const [excludePattern, setExcludePattern] = React.useState('[\\d]+');
    const [shouldMatchText, setShouldMatchText]= React.useState([
        '/binnenland/6232158/schippers-hadden-vlak-voor-dodelijke-aanvaring-waddenzee-marifooncontact.html',
        '/buitenland/6231337/britse-vakbonden-boos-over-hoge-uitkering-voor-oud-premier-truss.html',
        '/achterklap/6232016/zangeres-tabitha-bevallen-van-tweede-dochter.html',
    ].join('\n'));
        const [shouldNotMatchText, setShouldNotMatchText]= React.useState([
            '/',
            '/spanningen-oekraine',
            '/tickets',
            '/296075/video/hoe-helpt-het-satellietnetwerk-starlink-oekraine-in-de-oorlog.html',
        ].join('\n'));

    const handleIncludePatternChange = React.useCallback((value) => {
       setIncludePattern(value);
    }, []);

    const handleShouldMatchChange = React.useCallback((value) => {
        setShouldMatchText(value);
    }, []);

    const handleExcludePatternChange = React.useCallback((value) => {
        setExcludePattern(value);
    }, []);


    const handleShouldNotMatchChange = React.useCallback((value) => {
        setShouldNotMatchText(value);
    }, []);


    return (
      <div>
          <h1>https://www.nu.nl</h1>
          <div style={{ display: 'flex' }}>
              <div>
                  <h2>Include</h2>
                  <ExpressionEditor
                      pattern={includePattern}
                      flags={'g'}
                      onPatternChange={handleIncludePatternChange}
                  />
                  <h3>Should include</h3>
                  <SourceEditor
                      pattern={includePattern}
                      flags="gm"
                      onTextChange={handleShouldMatchChange}
                      text={shouldMatchText || ''}
                      options={{
                          lineWrapping: true,
                      }}
                  />
              </div>
              <div style={{ marginLeft: 20 }}>
                  <h2>Exclude</h2>
                  <ExpressionEditor
                      pattern={excludePattern}
                      flags="g"
                      onPatternChange={handleExcludePatternChange}
                  />
                  <h3>Should exclude</h3>
                  <SourceEditor
                      pattern={excludePattern || ''}
                      flags="g"
                      onTextChange={handleShouldNotMatchChange}
                      text={shouldNotMatchText || ''}
                      options={{
                          lineWrapping: true,
                      }}
                  />
              </div>
          </div>
          <button
              onClick={() => {
                  setIncludePattern('something\\dcompletely.different')
              }}
          >
              Set new value
          </button>
      </div>
  );
};

root.render(<Test />);
