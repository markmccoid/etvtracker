import React from 'react';
import { MemoryRouter as Router, Route, Switch } from 'react-router-dom';


import Login from './components/login/Login';
import Main from './components/Main';

const Routes = () => {
  return (
    <Router
      initialEntries={[ '/login', '/']}
      initialIndex={0}
    >
      <Switch>
        <Route exact path='/login' component={Login}/>
        <Route path='/' component={Main}/>
        <Route render={(props) => <div>Path {props.location.pathname} Not Found in <strong>AppRouter.js</strong></div>} />
      </Switch>
    </Router>
  )
};

export default Routes;