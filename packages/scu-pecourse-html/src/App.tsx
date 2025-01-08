import React from 'react';
import { HashRouter, Switch, Route, Link } from 'react-router-dom';
import Login from './page/login';
import Choose from './page/choose';

function App() {
  return (
    <div className="app">
      <HashRouter>
        <Switch>
          <Route path="/" component={Login} exact={true} />
          <Route path="/choose" component={Choose} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default <App />;
