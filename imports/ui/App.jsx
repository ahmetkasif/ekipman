import React, {Component} from 'react';
import { Router, Route, Switch, Redirect } from 'react-router';
var createHistory = require('history').createBrowserHistory;
import 'semantic-ui-css/semantic.min.css';

import { Games } from '../api/games.js';

import Login from './Login.jsx';
import Register from './Register.jsx';

import Nav from './Nav.jsx';
import Home from './publicPages/Home.jsx';
import ForgotPassword from './ForgotPassword.jsx';
import ProfileContainer from './Profile.jsx';
import NewGame from './gamePages/NewGame.jsx';
import GameDetailsContainer from './gamePages/GameDetails.jsx';
import UpdateGameContainer from './gamePages/UpdateGame.jsx';
import Settings from './Settings.jsx';
import Leaderboard from './Leaderboard.jsx';
import About from './publicPages/About.jsx';
import GameLobby from './gamePages/GameLobby.jsx';
import NotFound from './NotFound.jsx';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Meteor.userId() ? (
      <PublicRoute {...rest} component={matchProps => (
        <Component {...matchProps} />
      )} />
    ) : (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>
    )
  )}/>
);

const PublicRoute = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={matchProps => (
      <div className="DefaultLayout">
        <Nav {...matchProps} />
        <Component {...matchProps} />
      </div>
    )} />
  )
};

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router history={ createHistory() }>
        <div className="fullHeight">
          <Switch>
            <PrivateRoute path="/games" exact component={GameLobby}/>
            <PrivateRoute path="/games/:gameId?" exact component={GameDetailsContainer}/>
            <PrivateRoute path="/newGame" exact component={NewGame}/>
            <PrivateRoute path="/updateGame/:gameId?" exact component={UpdateGameContainer}/>
            <PrivateRoute path="/profile/:username?" exact component={ProfileContainer}/>
            <PrivateRoute path="/settings" exact component={Settings}/>
            <PublicRoute path="/" exact component={Home}/>
            <PublicRoute path="/login" exact component={Login}/>
            <PublicRoute path="/register" exact component={Register}/>
            <PublicRoute path="/forgotPassword" exact component={ForgotPassword}/>
            <PublicRoute path="/leaderboard" exact component={Leaderboard}/>
            <PublicRoute path="/about" exact component={About}/>
            <PublicRoute component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}
