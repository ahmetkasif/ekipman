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
      <Card className="profile">
        <Card.Content header={
          <div className="profileTop">
            <Header as='h4'>
              <Header.Content className="">
                Oyunlar
              </Header.Content>
            </Header>
          </div>
        }/>
        <Card.Content description={
          <GameList history={this.props.history} />
        }/>
      </Card>
    );
  }
}