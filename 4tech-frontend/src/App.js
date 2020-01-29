import React from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

import Login from './containers/Login/Login';
import Timeline from './containers/Timeline/Timeline';
import './App.css';
import PrivateRoute from './components/Header/PrivateRoute/PrivateRoute';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <PrivateRoute path="/timeline" component={Timeline} />
        <Redirect to="./" />
      </Switch>
    </Router>
  );
}

export default App;
