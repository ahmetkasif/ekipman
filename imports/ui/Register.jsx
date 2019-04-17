import React, { Component } from 'react';
import { Button, Input, Form, Segment, Header } from 'semantic-ui-react';
import Noty from 'noty';

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: ''
    };

    this.updateUsername = this.updateUsername.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.register = this.register.bind(this);
    this.handleRoute = this.handleRoute.bind(this);
  }

  updateUsername(event, data){
    this.setState({
      username: data.value
    });
  }

  updateEmail(event, data){
    this.setState({
      email: data.value
    });
  }

  updatePassword(event, data){
    this.setState({
      password: data.value
    });
  }

  handleRoute(targetRoute){
    if (targetRoute !== this.props.location.pathname) {
      this.props.history.push(targetRoute);
    }
  }

  register(){
    if (this.state.username.toString().length !== 0 & this.state.email.toString().length !== 0 & this.state.password.toString().length !== 0) {
      Accounts.createUser({
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        profile: {
        }
      }, (error) => {
        if (error) {
          new Noty({
            type: 'information',
            layout: 'topRight',
            theme: 'sunset',
            text: error.message.slice(0,-5),
            timeout: 1000,
            progressBar: true,
            closeWith: ['click', 'button'],
            animation: {
              open: 'noty_effects_open',
              close: 'noty_effects_close'
            }
          }).show();
        } else {
          this.props.history.push('/');
        }
      });
    } else {
      new Noty({
        type: 'warning',
        layout: 'topRight',
        theme: 'sunset',
        text: 'Lütfen formu doldurun',
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
      <Segment className='auth' raised color='teal'>
        <Header as='h3' dividing color='teal' content='Kayıt Ol'/>
        <Form>
          <Form.Field control={Input} label='Kullanıcı Adı' value={this.state.username} onChange={this.updateUsername} placeholder='Kullanıcı Adı' />
          <Form.Field control={Input} label='E-Posta' value={this.state.email} onChange={this.updateEmail} type='email' placeholder='E-Posta' />
          <Form.Field control={Input} label='Şifre' value={this.state.password} onChange={this.updatePassword} type='password' placeholder='Şifre' />
          <Form.Field control={Button} color='teal' fluid onClick={() => this.register()}>Kaydol</Form.Field>
        </Form>
        <Segment basic>
          <a onClick={() => this.handleRoute('/login')}>Hesabın var mı ?</a>
        </Segment>
      </Segment>
    );
  }
}
