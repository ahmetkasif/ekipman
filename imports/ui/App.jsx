import React, {Component} from 'react';
import { Router, Route, Switch, Redirect } from 'react-router';
var createHistory = require('history').createBrowserHistory;
import 'semantic-ui-css/semantic.min.css';
import { Grid } from 'semantic-ui-react';

import { Games } from '../api/games.js';
import { Messages } from '../api/messages.js';

import Login from './Login.jsx';
import Register from './Register.jsx';

import Nav from './Nav.jsx';
import Home from './publicPages/Home.jsx';
import ForgotPassword from './ForgotPassword.jsx';
import ProfileContainer from './Profile.jsx';
import NewGame from './gamePages/NewGame.jsx';
import GameDetailsContainer from './gamePages/GameDetails.jsx';
import UpdateGameContainer from './gamePages/UpdateGame.jsx';
import GameJoinContainer from './gamePages/GameJoin.jsx';
import Settings from './Settings.jsx';
import Leaderboard from './Leaderboard.jsx';
import About from './publicPages/About.jsx';
import Rules from './Rules.jsx';
import Links from './Links.jsx';
import Advertorial from './Advertorial.jsx';
import ChatBoxContainer from './Chatbox.jsx';
import GameLobby from './gamePages/GameLobby.jsx';
import NotFound from './NotFound.jsx';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Meteor.userId() ? (
      <PublicRoute {...rest} component={matchProps => (
        <Grid className='appContainer' stackable columns={2}>
          <Grid.Column className='pageContainer' width={12}>
            <Component {...matchProps} />
          </Grid.Column>
          <Grid.Column className='advertorialContainer' width={4}>
            <Advertorial />
          </Grid.Column>
        </Grid>
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
      <div>
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
        <Switch>
          <PrivateRoute path="/games" exact component={GameLobby}/>
          <PrivateRoute path="/games/:gameId?" exact component={GameDetailsContainer}/>
          <PrivateRoute path="/newGame" exact component={NewGame}/>
          <PrivateRoute path="/joinGame/:gameId?" exact component={GameJoinContainer}/>
          <PrivateRoute path="/updateGame/:gameId?" exact component={UpdateGameContainer}/>
          <PrivateRoute path="/profile/:username?" exact component={ProfileContainer}/>
          <PrivateRoute path="/rules" exact component={Rules}/>
          <PrivateRoute path="/links" exact component={Links}/>
          <PrivateRoute path="/settings" exact component={Settings}/>
          <PrivateRoute path="/lobby" exact component={ChatBoxContainer}/>
          <PrivateRoute path="/leaderboard" exact component={Leaderboard}/>
          <PublicRoute path="/" exact component={Home}/>
          <PublicRoute path="/login" exact component={Login}/>
          <PublicRoute path="/register" exact component={Register}/>
          <PublicRoute path="/forgotPassword" exact component={ForgotPassword}/>
          <PublicRoute component={NotFound} />
        </Switch>
      </Router>
    );
  }
}
