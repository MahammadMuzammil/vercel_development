// App.js

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './components/Register'
import Login from './components/Login';
import Home from './components/Home';


function App() {
  return (
    <Switch>
      <Route exact path="/login" component={Login } />
      <Route exact path='/register' component={Register}/>
      <ProtectedRoute exact path="/" component={Home} />
      {/* Other routes */}
    </Switch>
  );
}

export default App;
