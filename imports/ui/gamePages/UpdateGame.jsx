import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Button, Input, Form, TextArea, Segment, Header, Dimmer, Loader } from 'semantic-ui-react';
import Noty from 'noty';

const options = [
  { key: 'eu4', text: 'Europa Universalis 4', value: 'eu4' },
  { key: 'civ6', text: 'Civilization 6', value: 'civ6' },
  { key: 'hoi4', text: 'Hearts of Iron 4', value: 'hoi4' },
  { key: 'ck2', text: 'Hearts of Iron 4', value: 'ck2' },
  { key: 'coh2', text: 'Company of Heroes 2', value: 'coh2' }
]

class UpdateGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      rules: '',
      startDate: '',
      type: ''
    };

    this.updateName = this.updateName.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
    this.updateRules = this.updateRules.bind(this);
    this.updateType = this.updateType.bind(this);
    this.updateStartDate = this.updateStartDate.bind(this);
    this.updateGame = this.updateGame.bind(this);
  }

  componentDidMount(){
    if(this.props.game){
      this.setState({
        name: this.props.game.name,
        description: this.props.game.description,
        rules: this.props.game.rules,
        startDate: this.props.game.startDate,
        type: this.props.game.type
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.game !== prevProps.game) {
      this.setState({
        name: this.props.game.name,
        description: this.props.game.description,
        rules: this.props.game.rules,
        startDate: this.props.game.startDate,
        type: this.props.game.type
      });
    }
   }

  updateName(event, data){
    this.setState({
      name: data.value
    });
  }

  updateDescription(event, data){
   this.setState({
    description: data.value
   });
  }

  updateRules(event, data){
    this.setState({
      rules: data.value
    });
  }

  updateType(event, data){
    this.setState({
      type: data.value
    });
  }

  updateStartDate(event, data){
   this.setState({
    startDate: data.value
   });
  }

  updateGame(){
    Meteor.call(
      'updateGame',
      this.props.game._id,
      this.state.name,
      this.state.description,
      this.state.rules,
      this.state.startDate,
      this.state.type
    );
    new Noty({
      type: 'information',
      layout: 'topRight',
      theme: 'sunset',
      text: 'Oyun bilgisi başarıyla güncellendi.',
      timeout: 1000,
      progressBar: true,
      closeWith: ['click', 'button'],
      animation: {
        open: 'noty_effects_open',
        close: 'noty_effects_close'
      }
    }).show();
    this.props.history.push('/games/' + this.props.game._id, {id: this.props.game._id});
  }

  render() {
    if(this.props.game){
      return (
        <Segment className='page' raised color='teal'>
          <Header as='h3' dividing color='teal' content='Oyunu Güncelle'/>
          <Form>
            <Form.Field control={Input} label='Oyun İsmi' value={this.state.name} onChange={this.updateName} placeholder='İsim' />
            <Form.Field label='Açıklamalar' control={TextArea} rows='3' value={this.state.description} onChange={this.updateDescription} />
            <Form.Field label='Kurallar' control={TextArea} rows='3' value={this.state.rules} onChange={this.updateRules} />
            <Form.Select options={options} label='Oyun' placeholder='Oyun' value={this.state.type} onChange={this.updateType} />
            <Form.Field control={Input} type='date' label='Oyun Tarihi' placeholder='Tarih' value={this.state.startDate} onChange={this.updateStartDate} />
            <Form.Group inline floated='right'>
              <Form.Field control={Button} floated='right' onClick={() => this.props.history.push('/games/' + this.props.game._id, {id: this.props.game._id})}>İptal Et</Form.Field>
              <Form.Field primary control={Button} floated='right' onClick={() => this.updateGame()}>Düzenle</Form.Field>
            </Form.Group>
          </Form>
        </Segment>
      );
    } else {
      return(
        <Dimmer active inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
      );
    }
  }
}

export default UpdateGameContainer = withTracker(props => {
  Tracker.autorun(() => {
    Meteor.subscribe('games');
  });

  const game = Games.findOne({_id: props.match.params.gameId});

  return{
    game
  };
})(UpdateGame);
