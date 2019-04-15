import React, { Component } from 'react';
import { Item, Card } from 'semantic-ui-react';
import GameList from './GameList.jsx';

export default class GameLobby extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Card>
        <Card.Content header={
          <Card.Header as='h4'>
            Oyunlar
          </Card.Header>
        }/>
        <Card.Content description={
          <Item.Group divided>
            <GameList history={this.props.history} />
          </Item.Group>
        }/>
      </Card>
    );
  }
}