import React, {Component} from 'react';
import { Router, Route, Switch, Redirect, withRouter } from 'react-router';
var createHistory = require('history').createBrowserHistory;
import 'semantic-ui-css/semantic.min.css';

import { Games } from '../api/games.js';

import Login from './Login.jsx';
import Register from './Register.jsx';

import Nav from './Nav.jsx';
import News from './News.jsx';
import ForgotPassword from './ForgotPassword.jsx';
import ProfileContainer from './Profile.jsx';
import NewGame from './NewGame.jsx';
import GameDetailsContainer from './GameDetails.jsx';
import UpdateGameContainer from './UpdateGame.jsx';
import SettingsContainer from './Settings.jsx';
import About from './About.jsx';
import GameLobbyContainer from './GameLobby.jsx';
import Loading from './Loading.jsx';
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
            <PublicRoute path="/" exact component={News}/>
            <PrivateRoute path="/newGame" exact component={NewGame}/>
            <PrivateRoute path="/updateGame/:gameId?" exact component={UpdateGameContainer}/>
            <PrivateRoute path="/games" exact component={GameLobbyContainer}/>
            <PrivateRoute path="/settings" exact component={SettingsContainer}/>
            <PublicRoute path="/games/:gameId?" exact component={GameDetailsContainer}/>
            <PublicRoute path="/profile/:username?" exact component={ProfileContainer}/>
            <PublicRoute path="/loading" exact component={Loading}/>
            <PublicRoute path="/about" exact component={About}/>
            <PublicRoute path="/login" exact component={Login}/>
            <PublicRoute path="/register" exact component={Register}/>
            <PublicRoute path="/forgotPassword" exact component={ForgotPassword}/>
            <PublicRoute component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}
