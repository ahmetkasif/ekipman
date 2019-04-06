import React, { Component } from 'react';
import { Header, Card } from 'semantic-ui-react';
import GameList from './GameList.jsx';

export default class GameLobby extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Card className="cardSpecial">
        <Card.Content header={
          <Card.Header as='h4'>
            Oyunlar
          </Card.Header>
        }/>
        <Card.Content description={
          <GameList history={this.props.history} />
        }/>
      </Card>
    );
  }
}