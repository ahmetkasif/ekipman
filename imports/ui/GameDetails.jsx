import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Image, Header, Label, Card, Button } from 'semantic-ui-react';
import Loading from './Loading.jsx';
var gravatar = require('gravatar');

class GameDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.renderGame = this.renderGame.bind(this);
    this.renderHostActions = this.renderHostActions.bind(this);
  }

  renderAuthorPic(mail){
    if(mail){
      return(
        <Image src={gravatar.url(mail.address)} />
      );
    } else {
      return(
        <Loading/>
      );
    }
  }

  renderHostActions(){
    if(this.props.game.hostID === Meteor.userId()){
      return(
        <Button color='teal' onClick={() => this.props.history.push('/updateGame/' + this.props.game._id, {id: this.props.game._id})}>Düzenle</Button>
      );
    }
  }

  renderGame(){
    if(this.props.game){
      return (
        <Card key={this.props.game._id} className="postFrame">
          <Card.Content className="postFrameHeader" header={
            <Header as='h4' image>
              <Header.Subheader style={{cursor: 'pointer'}} onClick={() => this.props.history.push('/profile/westernfront', {username: 'westernfront'})}>{"Westernfront's Game"}</Header.Subheader>
            </Header>
          }/>
          <Card.Content>
            Açıklamalar: {this.props.game.description}<br/>
            Başlangıç Zamanı: {this.props.game.startDate}<br/>
            Kurallar: {this.props.game.rules}<br/>
            Durum: {this.props.game.state}
          </Card.Content>
          <Card.Content extra>
            <Label horizontal as='a' color='green'>1444</Label>
            <Label horizontal as='a' color='red'>Historical</Label>
            <Label horizontal as='a' color='teal'>Peşkeş</Label>
          </Card.Content>
          <Card.Content extra>
            <b>Oyuncular:</b><br/><br/>
              - Westernfront : Ottomans<br/>
              - Steafun : Candar<br/>
              - Lygrim : Spain<br/>
              - Alucard : Muscovy<br/>
              - Guderian : France<br/>
              - Naked : England<br/>
              - Fatro : Poland<br/>
              - Hacı Oyunda : Brandenburg<br/>
          </Card.Content>
          <Card.Content extra>
            <div className='ui'>
              {this.renderHostActions()}
              <Button color='blue' disabled>Paylaş</Button>
            </div>
          </Card.Content>
        </Card>
      );
    } else {
      return (
        <Loading/>
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderGame()}
      </div>
    );
  }
}

export default GameDetailsContainer = withTracker(props => {
  Tracker.autorun(() => {
    Meteor.subscribe('games');
  });

  const game = Games.findOne({_id: props.match.params.gameId});

  return{
    game
  };
})(GameDetails);
