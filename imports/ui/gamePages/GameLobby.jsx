import React, { Component } from 'react';
import { Item, Segment, Header } from 'semantic-ui-react';
import GameList from './GameList.jsx';

export default class GameLobby extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Segment className='page' raised color='teal'>
        <Header as='h3' dividing color='teal' content='Oyunlar'/>
        <Item.Group divided>
          <GameList history={this.props.history} />
        </Item.Group>
      </Segment>
    );
  }
}