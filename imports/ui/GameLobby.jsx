import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Header, Label, Card, Button } from 'semantic-ui-react';
import Loading from './Loading.jsx';

class GameLobby extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.renderGames = this.renderGames.bind(this);
  }

  renderHostActions(game){
    if(game.hostID === Meteor.userId()){
      return(
        <Button className="mini" color='teal' onClick={() => this.props.history.push('/updateGame/' + game._id, {id: game._id})}>Düzenle</Button>
      );
    }
  }

  renderGames(){
    if(this.props.games){
      return this.props.games.map((game) => (
        <Card key={game._id} className="postFrame">
          <Card.Content className="postFrameHeader" header={
            <Header as='h4' image>
              <Header.Subheader style={{cursor: 'pointer'}} onClick={() => this.props.history.push('/profile/ahmetkasif', {username: 'ahmetkasif'})}>{"Westernfront's Game"}</Header.Subheader>
            </Header>
          }/>
          <Card.Content>
            Açıklamalar : <Label basic color='green' horizontal>{"Historical"}</Label> <Label basic color='blue' horizontal>{"1444"}</Label>
          </Card.Content>
          <Card.Content extra>
            <div className='ui'>
              <Button className="mini" color='olive' onClick={() => this.props.history.push('/games/' + game._id, {id: game._id})}>İncele</Button>
              {this.renderHostActions(game)}
              <Button className="mini" color='green' disabled>Paylaş</Button>
            </div>
          </Card.Content>
        </Card>
      ));
    } else {
      return(
        <Loading/>
      );
    }
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
              <Header.Content className="right floated">
                <button className="ui right floated primary button" onClick={() => this.props.history.push('/newGame/')}>Yeni Oyun</button>
              </Header.Content>
            </Header>
          </div>
        }/>
        <Card.Content description={
          this.renderGames()
        }/>
      </Card>
    );
  }
}

export default GameLobbyContainer = withTracker(props => {
    Meteor.subscribe('games');
    const games = Games.find().fetch();
  
    return{
      games
    };
  })(GameLobby);
