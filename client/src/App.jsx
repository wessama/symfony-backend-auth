import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import HomePage from './components/HomePage';

function App() {
  return (
      <Router>
        <Switch>
          <Route path="/register" component={RegistrationForm} />
          <Route path="/login" component={LoginForm} />
        </Switch>
      </Router>
  );
}

export default App;
