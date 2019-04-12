import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Container, List, Dropdown, Dimmer, Loader, Image, Header, Label, Card, Button } from 'semantic-ui-react';
import Noty from 'noty';

var gravatar = require('gravatar');

class GameDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Ottomans'
    };
    
    this.renderState = this.renderState.bind(this);
    this.renderPlayers = this.renderPlayers.bind(this);
    this.renderJoinGame = this.renderJoinGame.bind(this);
    this.renderHostActions = this.renderHostActions.bind(this);
  }

  handleChange(event, data){
    this.setState({
      value: data.value
    });
  }

  renderJoinGame(){
    if(this.props.game.state == 0){
      if(!this.props.joined){
        return(
          <Button color='teal' onClick={() => this.props.history.push('/joinGame/' + this.props.game._id, {id: this.props.game._id})}>Katıl</Button>
        );
      } else {
        return(
          <Button color='orange' onClick={() => this.joinGame(this.props.game._id)}>Ayrıl</Button>
        );
      }
    } else {
      return(
        ""
      );
    }
  }

  renderHostActions(){
    if(this.props.game.hostID === Meteor.userId()){
      return(
        <Button.Group>
          <Button attached='bottom' color='teal' disabled>Alımları Kapat</Button>
          <Button attached='bottom' color='teal' onClick={() => this.props.history.push('/updateGame/' + this.props.game._id, {id: this.props.game._id})}>Düzenle</Button>
          <Button attached='bottom' color='red' disabled onClick={() => this.props.history.push('/deleteGame/' + this.props.game._id, {id: this.props.game._id})}>Sil</Button>
        </Button.Group>
      );
    }
  }

  getHost(id){
    let user = Meteor.users.findOne({_id: id}, { fields: { username: 1 }});
    
    return(
      <p><b>Sunucu : {user.username}</b></p>
    ); 
  }
  

  joinGame(gameID){
    Meteor.call(
      'removePlayer',
      gameID
    );
    new Noty({
      type: 'information',
      layout: 'topRight',
      theme: 'sunset',
      text: 'Oyundan başarıyla ayrıldın',
      timeout: 1000,
      progressBar: true,
      closeWith: ['click', 'button'],
      animation: {
        open: 'noty_effects_open',
        close: 'noty_effects_close'
      }
    }).show();
  }

  renderState(){
    if(this.props.game.state == 0){
      return(
        <p>Durum: Kayıtlar devam ediyor</p>
      );
    } else if(this.props.game.state == 1){
      return(
        <p>Durum: Kayıtlar kapandı. Oyun devam ediyor.</p>
      );
    } else if(this.props.game.state == 2){
      return(
        <p>Durum: Oyun tamamlandı.</p>
      );
    } else {
      return(
        <p>Durum: Bilinmiyor.</p>
      );
    }
  }

  renderPlayers(){
    if(this.props.game.players){
      return this.props.game.players.map((player) => (
        <List.Item key={player.id}>
          <Image avatar src={gravatar.url(player.email)} />
          <List.Content>
            <b><a onClick={() => this.props.history.push('/profile/' + player.name, {username: player.name})}>{player.name}</a> Tercihleri : {player.option1}, {player.option2}, {player.option3}</b>
          </List.Content>
        </List.Item>
      ));
    } else {
      return (
        <Loader/>
      );
    }
  }

  render(){
    if(this.props.game){
      return (
        <Card key={this.props.game._id} attached="true">
          <Card.Content>
            <Card.Header>Oyun İsmi: {this.props.game.name}
            <Button.Group floated='right'>
              <Button content='Lobiye Dön' onClick={() => this.props.history.push('/games/')} />
              {this.renderJoinGame()}
            </Button.Group>
            </Card.Header>
          </Card.Content>
          <Card.Content>
            <Label>EU4</Label>
            <Label>Tarihi</Label>
            <Label>Peşkeş</Label>
          </Card.Content>
          <Card.Content>
            Açıklamalar: {this.props.game.description}<br/>
            Başlangıç Tarihi: {this.props.game.startDate}<br/>
            Kurallar: {this.props.game.rules}<br/>
            {this.renderState()}
          </Card.Content>
          <Card.Content>
            {this.getHost(this.props.game.hostID)}
            <b>Oyuncular:</b>
            <List animated verticalAlign='middle'>
              {this.renderPlayers()}
            </List>
          </Card.Content>
          {this.renderHostActions()}
        </Card>
      );
    } else {
      return (
        <Dimmer active inverted>
          <Loader inverted>Yükleniyor</Loader>
        </Dimmer>
      );
    }
  }
}

export default GameDetailsContainer = withTracker(props => {
  Tracker.autorun(() => {
    Meteor.subscribe('users');
    Meteor.subscribe('games');
  });

  const users = Accounts.users.find({}).fetch();

  const game = Games.findOne({_id: props.match.params.gameId}, {transform: function (game) {
    const host = Meteor.users.findOne({_id: game.hostID}, { fields: { username: 1, emails: 1 }});
    if(host){
      game.hostUsername = host.username;
      game.hostEmail = host.emails;
    }

    return game;
  }});

  var joined = false;

  if(game){
    if(game.players){
      game.players.forEach(function(player) {
        if(player.id === Meteor.userId()){
          joined = true;
        }
      });
    }
  }
  
  return {
    users,
    game,
    joined
  };
})(GameDetails);
