import React, { Component } from 'react';
import { Button, Input, Form, TextArea, Segment, Header } from 'semantic-ui-react';
import Noty from 'noty';

const options = [
  { key: 'eu4', text: 'Europa Universalis 4', value: 'eu4' },
  { key: 'civ6', text: 'Civilization 6', value: 'civ6' },
  { key: 'hoi4', text: 'Hearts of Iron 4', value: 'hoi4' },
  { key: 'ck2', text: 'Hearts of Iron 4', value: 'ck2' },
  { key: 'coh2', text: 'Company of Heroes 2', value: 'coh2' }
]

export default class NewGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      rules: '',
      type: '',
      startDate: ''
    };

    this.updateName = this.updateName.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
    this.updateRules = this.updateRules.bind(this);
    this.updateType = this.updateType.bind(this);
    this.updateStartDate = this.updateStartDate.bind(this);
    this.newGame = this.newGame.bind(this);
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

  newGame(){
    if(this.state.name.toString().length !== 0 &&
    this.state.description.toString().length !== 0 &&
    this.state.rules.toString().length !== 0 &&
    this.state.startDate.toString().length !== 0 &&
    this.state.type.toString().length !== 0){
      Meteor.call(
        'newGame',
        this.state.name,
        this.state.description,
        this.state.rules,
        this.state.startDate,
        false,
        this.state.type
      );
      new Noty({
        type: 'information',
        layout: 'topRight',
        theme: 'sunset',
        text: 'Yeni oyun oluşturuldu',
        timeout: 1000,
        progressBar: true,
        closeWith: ['click', 'button'],
        animation: {
          open: 'noty_effects_open',
          close: 'noty_effects_close'
        }
      }).show();
      this.props.history.push('/games');
    } else {
      new Noty({
        type: 'warning',
        layout: 'topRight',
        theme: 'sunset',
        text: 'Lütfen formu doldurunuz',
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
        <Header as='h3' dividing color='teal' content='Yeni oyun oluştur'/>
        <Form>
          <Form.Field control={Input} label='Oyun İsmi' value={this.state.name} onChange={this.updateName} placeholder='İsim' />
          <Form.Field label='Açıklamalar' control={TextArea} rows='3' value={this.state.description} onChange={this.updateDescription} />
          <Form.Field label='Kurallar' control={TextArea} rows='3' value={this.state.rules} onChange={this.updateRules} />
          <Form.Select options={options} label='Oyun' placeholder='Oyun' value={this.state.type} onChange={this.updateType} />
          <Form.Field control={Input} type='date' label='Oyun Tarihi' placeholder='Tarih' value={this.state.startDate} onChange={this.updateStartDate} />
          <Form.Group inline floated='right'>
            <Form.Field control={Button} floated='right' onClick={() => this.props.history.push('/games')}>İptal Et</Form.Field>
            <Form.Field primary control={Button} floated='right' onClick={() => this.newGame()}>Oyun ekle</Form.Field>
          </Form.Group>
        </Form>
      </Segment>
    );
  }
}
