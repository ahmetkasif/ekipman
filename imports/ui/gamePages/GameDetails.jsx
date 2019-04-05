import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Container, List, Dropdown, Dimmer, Loader, Image, Header, Label, Card, Button } from 'semantic-ui-react';
import Noty from 'noty';

const options = [
  { key: 'Ottomans', text: 'Ottomans', value: 'Ottomans' },
  { key: 'France', text: 'France', value: 'France' },
  { key: 'Austria', text: 'Austria', value: 'Austria' },
  { key: 'Castille', text: 'Castille', value: 'Castille' },
  { key: 'England', text: 'England', value: 'England' },
  { key: 'Mamluks', text: 'Mamluks', value: 'Mamluks' },
  { key: 'Muscovy', text: 'Muscovy', value: 'Muscovy' },
  { key: 'Poland', text: 'Poland', value: 'Poland' },
  { key: 'Sweden', text: 'Sweden', value: 'Sweden' },
  { key: 'Portugal', text: 'Portugal', value: 'Portugal' },
  { key: 'Brandenburg', text: 'Brandenburg', value: 'Brandenburg' },
]

class GameDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Ottomans'
    };
    this.renderGame = this.renderGame.bind(this);
    this.renderState = this.renderState.bind(this);
    this.renderPlayers = this.renderPlayers.bind(this);
    this.renderJoinGame = this.renderJoinGame.bind(this);
    this.renderHostActions = this.renderHostActions.bind(this);
    this.joinGame = this.joinGame.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  renderAuthorPic(mail){
    if(mail){
      return(
        <Image src={gravatar.url(mail.address)} />
      );
    } else {
      return(
        <Dimmer active inverted>
          <Loader inverted>Yükleniyor</Loader>
        </Dimmer>
      );
    }
  }

  handleChange(event, data){
    this.setState({
      value: data.value
    });
  }

  renderJoinGame(){
    if(!this.props.joined){
      return(
        <Container color='blue'>
          <Dropdown
            onChange={() => this.handleChange()}
            className="mini"
            button
            options={options}
            value={this.state.value}
          />
          <Button className="mini" onClick={() => this.joinGame(this.props.game._id)}>Katıl</Button>
        </Container>
      );
    } else {
      return(
        <Button className="mini" color='orange' onClick={() => this.joinGame(this.props.game._id)}>Ayrıl</Button>
      );
    }
  }

  renderHostActions(){
    if(this.props.game.hostID === Meteor.userId()){
      return(
        <Button className="mini" color='teal' onClick={() => this.props.history.push('/updateGame/' + this.props.game._id, {id: this.props.game._id})}>Düzenle</Button>
      );
    }
  }

  getHost(id){
    let user = Meteor.users.findOne({_id: id}, { fields: { username: 1 }});
    
    return(
      <p>Oyun Sahibi : {user.username}</p>
    ); 
  }
  

  joinGame(gameID){
    if(!this.props.joined){
      Meteor.call(
        'addPlayer',
        gameID,
        this.state.value
      );
      new Noty({
        type: 'information',
        layout: 'topRight',
        theme: 'sunset',
        text: 'Oyuna başarıyla katıldın',
        timeout: 1000,
        progressBar: true,
        closeWith: ['click', 'button'],
        animation: {
          open: 'noty_effects_open',
          close: 'noty_effects_close'
        }
      }).show();
    } else {
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
        <List.Item as='li'key={player.id}>{player.name} : {player.country}</List.Item>
      ));
    } else {
      return (
        <Loader/>
      );
    }
  }

  renderGame(){
    if(this.props.game){
      return (
        <Card key={this.props.game._id} className="postFrame">
          <Card.Content className="postFrameHeader" header={
            <Header as='h4' image>
              <Header.Subheader>Oyun İsmi: {this.props.game.name}</Header.Subheader>
            </Header>
          }/>
          <Card.Content>
            {this.getHost(this.props.game.hostID)}
            Açıklamalar : <Label basic color='green' horizontal>{"Historical"}</Label> <Label basic color='blue' horizontal>{"1444"}</Label>
          </Card.Content>
          <Card.Content>
            Açıklamalar: {this.props.game.description}<br/>
            Başlangıç Tarihi: {this.props.game.startDate}<br/>
            Kurallar: {this.props.game.rules}<br/>
            {this.renderState()}
          </Card.Content>
          <Card.Content extra>
            <Label horizontal as='a' color='green'>1444</Label>
            <Label horizontal as='a' color='red'>Historical</Label>
            <Label horizontal as='a' color='teal'>Peşkeş</Label>
          </Card.Content>
          <Card.Content extra>
            <b>Oyuncular:</b>
            <List as='ol'>
              {this.renderPlayers()}
            </List>
          </Card.Content>
          <Card.Content extra>
            <div className='ui'>
              {this.renderHostActions()}
              {this.renderJoinGame()}
            </div>
          </Card.Content>
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
