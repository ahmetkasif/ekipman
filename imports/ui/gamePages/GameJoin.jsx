import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Button, Form, Select, Checkbox, Segment, Header } from 'semantic-ui-react';
import Noty from 'noty';

class GameJoin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      op1: '',
      op2: '',
      op3: '',
      checkbox: false
    };

    this.joinGame = this.joinGame.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
  }

  componentDidMount(){
    if(this.props.game){
      this.setState({
        options: this.props.game.countries,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.game !== prevProps.game) {
      this.setState({
        options: this.props.game.countries,
      });
    }
   }

  handleChange1(event, data){
    this.setState({
      op1: data.value
    });
  }

  handleChange2(event, data){
    this.setState({
      op2: data.value
    });
  }

  handleChange3(event, data){
    this.setState({
      op3: data.value
    });
  }

  handleChecked(event, data){
    this.setState({
      checkbox: data.checked
    });
  }

  joinGame(gameID){
    if(this.state.op1.toString().length !== 0 &&
    this.state.op2.toString().length !== 0 &&
    this.state.op3.toString().length !== 0){
      if(this.state.checkbox){
        Meteor.call(
          'addPlayer',
          gameID,
          this.state.op1,
          this.state.op2,
          this.state.op3
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
        this.props.history.push('/games/' + gameID, {id: gameID});
      } else {
        new Noty({
          type: 'warning',
          layout: 'topRight',
          theme: 'sunset',
          text: 'Devam etmeden önce kuralları kabul etmelisin',
          timeout: 1000,
          progressBar: true,
          closeWith: ['click', 'button'],
          animation: {
            open: 'noty_effects_open',
            close: 'noty_effects_close'
          }
        }).show();
      }
    } else {
      new Noty({
        type: 'warning',
        layout: 'topRight',
        theme: 'sunset',
        text: 'Devam etmeden önce, 3 tercih yapmalısın',
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

  render() {
    return (
      <Segment className='page' raised color='teal'>
        <Header as='h3' dividing color='teal' content='Oyuna Katıl'/>
        <Form>
          <Form.Field control={Select} label='1. Tercih' options={this.state.options} onChange={this.handleChange1} value={this.state.op1} placeholder='1. Tercih' />
          <Form.Field control={Select} label='2. Tercih' options={this.state.options} onChange={this.handleChange2} value={this.state.op2} placeholder='2. Tercih' />
          <Form.Field control={Select} label='3. Tercih' options={this.state.options} onChange={this.handleChange3} value={this.state.op3} placeholder='3. Tercih' />
          <Form.Field control={Checkbox} label='Kuralları okudum, kabul ediyorum.' onChange={this.handleChecked} checked={this.state.checkbox} />
          <Form.Group inline floated='right'>
            <Form.Field control={Button} floated='right' onClick={() => this.props.history.push('/games/' + this.props.game._id, {id: this.props.game._id})}>İptal</Form.Field>
            <Form.Field primary control={Button} floated='right' onClick={() => this.joinGame(this.props.game._id)}>Gönder</Form.Field>
          </Form.Group>
        </Form>
      </Segment>
    );
  }
}

export default GameJoinContainer = withTracker(props => {
  Tracker.autorun(() => {
    Meteor.subscribe('game', props.match.params.gameId);
  });

  var game = Games.findOne({_id: props.match.params.gameId});
  var user = Meteor.users.findOne({username: props.match.params.username}, {profile: 1, username: 1, emails: 1});

  return{
    user,
    game
  };
})(GameJoin);

