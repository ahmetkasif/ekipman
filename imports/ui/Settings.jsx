import React, { Component } from 'react';
import { Header, Segment, Form, Button, Divider } from 'semantic-ui-react';
import Noty from 'noty';

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPass: '',
      newPass: '',
      newPass2: ''
    };

    this.updateoldPass = this.updateoldPass.bind(this);
    this.updatenewPass = this.updatenewPass.bind(this);
    this.updatenewPass2 = this.updatenewPass2.bind(this);
    this.updatePass = this.updatePass.bind(this);
  }

  updateoldPass(event, data) {
    this.setState({
      oldPass: data.value
    });
  }

  updatenewPass(event, data) {
    this.setState({
      newPass: data.value
    });
  }

  updatenewPass2(event, data) {
    this.setState({
      newPass2: data.value
    });
  }

  updatePass(){
    if(this.state.oldPass.toString().length !== 0 && this.state.newPass.toString().length !== 0 && this.state.newPass === this.state.newPass2) {
      Accounts.changePassword(this.state.oldPass, this.state.newPass, function(error) {
        if(error !== undefined && error.reason === "Incorrect password") {
          new Noty({
            type: 'warning',
            layout: 'topRight',
            theme: 'sunset',
            text: 'Mevcut şifreyi yanlış girdiniz',
            timeout: 1000,
            progressBar: true,
            closeWith: ['click', 'button'],
            animation: {
              open: 'noty_effects_open',
              close: 'noty_effects_close'
            }
          }).show();
        } else {
          this.setState({
            oldPass: '',
            newPass: '',
            newPass2: ''
          });
          new Noty({
            type: 'success',
            layout: 'topRight',
            theme: 'sunset',
            text: 'Şifre başarıyla değiştirildi',
            timeout: 1000,
            progressBar: true,
            closeWith: ['click', 'button'],
            animation: {
              open: 'noty_effects_open',
              close: 'noty_effects_close'
            }
          }).show();
        }
      });
    } else {
      new Noty({
        type: 'warning',
        layout: 'topRight',
        theme: 'sunset',
        text: 'Tüm alanlar doldurulmalıdır',
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
        <Header as='h3' dividing color='yellow' content='Hesap Ayarları'/>
          Hazırlanıyor..
        <Divider/>
        <Header as='h3' dividing color='teal' content='Şifreyi Değiştir'/>
        <Form>
          <Form.Input fluid label='Mevcut Şifreniz' placeholder='Şifre' type='password' onChange={this.updateoldPass} value={this.state.oldPass}/>
          <Form.Input fluid label='Yeni Şifreniz' placeholder='Şifre' type='password' onChange={this.updatenewPass} value={this.state.newPass}/>
          <Form.Input fluid label='Yeni Şifreniz (Tekrar)' placeholder='Şifre' type='password' onChange={this.updatenewPass2} value={this.state.newPass2}/>
          <Form.Group inline floated='right'>
            <Form.Field primary control={Button} color='teal' floated='right' onClick={() => this.updatePass()}>Şifreyi Değiştir</Form.Field>
          </Form.Group>
        </Form>
      </Segment>
    );
  }
}
