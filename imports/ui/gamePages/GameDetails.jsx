import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { List, Dimmer, Loader, Image, Segment, Header, Divider, Button, Dropdown } from 'semantic-ui-react';
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
    this.assignCountries = this.assignCountries.bind(this);
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

  changeState(newState){
    Meteor.call(
      'changeState',
      this.props.game._id,
      newState,
    );
  }

  deleteGame(){
    Meteor.call(
      'deleteGame',
      this.props.game._id  
    );
    this.props.history.push('/games');
  }

  assignCountries(){
    var countries = this.props.game.countries;

    var players = this.props.game.players;
    players.forEach(player => {
      console.log(player);
    });
    const npl = players.sort((a, b) => function(){
      if(a.name > b.name){
        return 1;
      }
      return -1;
    });

    npl.forEach(player => {
      console.log(player);
    });

    countries.forEach(country => {
      players.forEach(player => {
        if(player.option1 == country.value){
          player.country = country.value;
        } else if(player.option2 == country.value){
          player.country = country.value;
        } else if(player.option3 == country.value){
          player.country = country.value;
        }
      });
    });

    //this.changeState(2);
  }

  renderHostActions(){
    if(this.props.game.hostID === Meteor.userId()){
      return(
        <Dropdown color='olive' button text='Seçenekler'>
          <Dropdown.Menu>
            <Dropdown.Item text='Alımları Kapat' color='teal' disabled={this.props.game.state == 0 ? false : true} onClick={() => this.changeState(1)}/>
            <Dropdown.Item text='Ülkeleri Dağıt' color='teal' disabled={this.props.game.state == 1 ? false : true} onClick={() => this.assignCountries()}/>
            <Dropdown.Item text='Düzenle' onClick={() => this.props.history.push('/updateGame/' + this.props.game._id, {id: this.props.game._id})}/>
            <Dropdown.Item text='Sil' onClick={() => this.deleteGame()}/>
          </Dropdown.Menu>
        </Dropdown>
      );
    }
  }

  getHost(id){
    let user = Meteor.users.findOne({_id: id}, { fields: { username: 1 }});
    if(user){
      return(
        <p>Sunucu : <b>{user.username}</b></p>
      ); 
    } else {
      return (
        <Loader/>
      );
    }
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
      text: 'Oyundan başarıyla ayrıldın.',
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
        'Durum: Kayıtlar devam ediyor'
      );
    } else if(this.props.game.state == 1){
      return(
        'Durum: Kayıtlar kapandı. Ülkeler dağıtılıyor'
      );
    } else if(this.props.game.state == 2){
      return(
        'Durum: Oyun devam ediyor'
      );
    } else if(this.props.game.state == 3){
      return(
        'Durum: Oyun tamamlandı'
      );
    } else {
      return(
        'Durum: Bilinmiyor.'
      );
    }
  }

  renderPlayers(){
    if(this.props.game.players){
      return this.props.game.players.map((player) => (
        <List.Item key={player.id}>
          <Image avatar src={gravatar.url(player.email)} />
          <List.Content>
            <b><a onClick={() => this.props.history.push('/profile/' + player.name, {username: player.name})}>{player.name}</a>{Meteor.userId() == this.props.game.hostID ? ' Tercihleri: ' + player.option1 + ', ' + player.option2 + ', ' + player.option3 : ''}</b>
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
        <Segment key={this.props.game._id} className='page' raised color='teal'>
          <Header as='h3' dividing color='teal'>
            {'Oyun İsmi: ' + this.props.game.name}
          </Header>
          <Button.Group floated='right'>
            <Button content='Lobiye Dön' onClick={() => this.props.history.push('/games/')} />
            {this.renderHostActions()}
            {this.renderJoinGame()}
          </Button.Group>
          {this.getHost(this.props.game.hostID)}
          Açıklamalar: {this.props.game.description}<br/>
          Başlangıç Tarihi: {this.props.game.startDate}<br/>
          Kurallar: {this.props.game.rules}<br/>
          {this.renderState()}
          <Divider/>
          <b>Oyuncular:</b>
          <List animated verticalAlign='middle'>
            {this.renderPlayers()}
          </List>
        </Segment>
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
    Meteor.subscribe('game', props.match.params.gameId);
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
