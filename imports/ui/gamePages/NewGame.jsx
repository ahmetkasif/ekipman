import React, { Component } from 'react';
import { Button, Input, Form, TextArea, Card } from 'semantic-ui-react';
import Noty from 'noty';

export default class NewGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      rules: '',
      startDate: ''
    };

    this.updateName = this.updateName.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
    this.updateRules = this.updateRules.bind(this);
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

  updateStartDate(event, data){
   this.setState({
    startDate: data.value
   });
  }

  newGame(){
    Meteor.call(
      'newGame',
      this.state.name,
      this.state.description,
      this.state.rules,
      this.state.startDate,
      false,
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
  }

  render() {
    return (
      <Card>
        <Card.Content header={
          <Card.Header as='h4'>
            Yeni oyun oluştur
          </Card.Header>
        }/>
        <Card.Content>
          <Form>
            <Form.Field control={Input} label='Oyun İsmi' value={this.state.name} onChange={this.updateName} placeholder='İsim' />
            <Form.Field label='Açıklamalar' control={TextArea} rows='3' value={this.state.description} onChange={this.updateDescription} />
            <Form.Field label='Kurallar' control={TextArea} rows='3' value={this.state.rules} onChange={this.updateRules} />
            <Form.Field control={Input} type='date' label='Oyun Tarihi' placeholder='Tarih' value={this.state.startDate} onChange={this.updateStartDate} />
            <Form.Group inline floated='right'>
              <Form.Field control={Button} floated='right' onClick={() => this.props.history.push('/games')}>İptal</Form.Field>
              <Form.Field primary control={Button} floated='right' onClick={() => this.newGame()}>Gönder</Form.Field>
            </Form.Group>
          </Form>
        </Card.Content>
      </Card>
    );
  }
}
