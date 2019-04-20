import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Item, Label, Button, Dimmer, Loader } from 'semantic-ui-react';

class GameList extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.renderState = this.renderState.bind(this);
  }

  getHost(id){
    let user = Meteor.users.findOne({_id: id}, { fields: { username: 1 }});
    if(user){
      return(
        <p>Sunucu : {user.username}</p>
      ); 
    } else {
      return (
        <Dimmer active inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
      );
    }
  }

  renderState(state){
    if(state == 0){
      return(
        'Durum: Kayıtlar devam ediyor'
      );
    } else if(state == 1){
      return(
        'Durum: Kayıtlar kapandı. Ülkeler dağıtılıyor'
      );
    } else if(state == 2){
      return(
        'Durum: Oyun devam ediyor'
      );
    } else if(state == 3){
      return(
        'Durum: Oyun tamamlandı'
      );
    } else {
      return(
        'Durum: Bilinmiyor.'
      );
    }
  }

  renderLogo(type){
    switch (type) {
      case 'eu4':
        return(
          <Item.Image size='small' src='/images/eu4logo.png' />
        );
      case 'hoi4':
        return(
          <Item.Image size='small' src='/images/hoi4logo.png' />
        );
      case 'civ6':
        return(
          <Item.Image size='small' src='/images/civ6logo.png' />
        );
      case 'ck2':
        return(
          <Item.Image size='small' src='/images/ck2logo.png' />
        );
      default:
        return(
          <Item.Image size='small' src='/images/defaultgamelogo.png' />
        );
        break;
    }
  }

  render(){
    if(this.props.games){
      return this.props.games.map((game) => (
        <Item key={game._id}>
          {this.renderLogo(game.type)}
          <Item.Content>
            <Item.Header as='h4'>Oyun İsmi: {game.name}</Item.Header>
            <Item.Meta>
              {this.getHost(game.hostID)}
            </Item.Meta>
            <Item.Description>
              Açıklamalar: {game.description}<br/>
              Başlangıç Tarihi: {game.startDate}<br/>
              Kurallar: {game.rules}<br/>
              {this.renderState(game.state)}
            </Item.Description>
            <Item.Extra>
              <Button primary floated='right' onClick={() => this.props.history.push('/games/' + game._id, {id: game._id})}>
                İncele
              </Button>
              <Label>EU4</Label>
              <Label>Tarihi</Label>
              <Label>Peşkeş</Label>
            </Item.Extra>
          </Item.Content>
        </Item>
      ));
    } else {
      return(
        <Dimmer active inverted>
          <Loader inverted>Yükleniyor</Loader>
        </Dimmer>
      );
    }
  }
}

export default GameListContainer = withTracker(props => {
  Tracker.autorun(() => {
    Meteor.subscribe('users');
    Meteor.subscribe('games');
  });

  const games = Games.find({}).fetch();

  return {
    games
  };
  })(GameList);
