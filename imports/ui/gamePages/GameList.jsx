import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Header, Label, Card, Button, Dimmer, Loader } from 'semantic-ui-react';

class GameList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderHostActions(game){
    if(game.hostID === Meteor.userId()){
      return(
        <Button className="mini" color='teal' onClick={() => this.props.history.push('/updateGame/' + game._id, {id: game._id})}>Düzenle</Button>
      );
    }
  }

  render(){
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
        <Dimmer active inverted>
          <Loader inverted>Yükleniyor</Loader>
        </Dimmer>
      );
    }
  }
}

export default GameListContainer = withTracker(props => {
    Meteor.subscribe('games');
    const games = Games.find().fetch();
  
    return{
      games
    };
  })(GameList);
