import React, { Component } from 'react';
import { Header, Segment, Form, Button } from 'semantic-ui-react';

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.updatePass = this.updatePass.bind(this);
  }

  updatePass(){

  }

  render() {
    return (
      <Segment className='auth' raised color='teal'>
        <Header as='h3' dividing color='teal' content='Şifre Değiştir'/>
        <Form>
          <Form.Input fluid label='Mevcut Şifreniz' placeholder='Mevcut Şifreniz' />
          <Form.Input fluid label='Yeni Şifreniz' placeholder='Yeni Şifreniz' />
          <Form.Input fluid label='Yeni Şifreniz' placeholder='Yeni Şifreniz' />
          <Form.Group inline floated='right'>
            <Form.Field control={Button} floated='right' onClick={() => this.props.history.goBack()}>İptal Et</Form.Field>
            <Form.Field primary control={Button} floated='right' onClick={() => this.updatePass()}>Değiştir</Form.Field>
          </Form.Group>
        </Form>
      </Segment>
    );
  }
}
