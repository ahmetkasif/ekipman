import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Item, Icon, Label, Card, Button, Dimmer, Loader } from 'semantic-ui-react';

class GameList extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.renderState = this.renderState.bind(this);
  }

  getHost(id){
    let user = Meteor.users.findOne({_id: id}, { fields: { username: 1 }});
    
    return(
      <p>Oyun Sahibi : {user.username}</p>
    ); 
  }

  renderState(state){
    if(state == 0){
      return(
        <p>Durum: Kayıtlar devam ediyor</p>
      );
    } else if(state == 1){
      return(
        <p>Durum: Kayıtlar kapandı. Oyun devam ediyor.</p>
      );
    } else if(state == 2){
      return(
        <p>Durum: Oyun tamamlandı.</p>
      );
    } else {
      return(
        <p>Durum: Bilinmiyor.</p>
      );
    }
  }


  render(){
    if(this.props.games){
      return this.props.games.map((game) => (
        <Item key={game._id}>
          <Item.Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
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
