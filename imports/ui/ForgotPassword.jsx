import React, { Component } from 'react';
import { Button, Input, Segment, Form, Header } from 'semantic-ui-react';
import Noty from 'noty';

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mail: ''
    };

    this.updateMail = this.updateMail.bind(this);
    this.handlePasswordReset = this.handlePasswordReset.bind(this);
    this.handleRoute = this.handleRoute.bind(this);
  }

  updateMail(event, data){
    this.setState({
      mail: data.value
    });
  }

  handleRoute(targetRoute){
    if (targetRoute !== this.props.location.pathname) {
      this.props.history.push(targetRoute);
    }
  }

  handlePasswordReset(){
    if(this.state.mail.toString().length !== 0){
      Accounts.forgotPassword({ email: this.state.mail });
      new Noty({
        type: 'success',
        layout: 'topRight',
        theme: 'sunset',
        text: 'Doğrulama linki yollandı, gelen kutunuzu kontrol edin.',
        timeout: 1000,
        progressBar: true,
        closeWith: ['click', 'button'],
        animation: {
          open: 'noty_effects_open',
          close: 'noty_effects_close'
        }
      }).show();
      this.props.history.push('/login');
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
        <Header as='h3' dividing color='teal' content='Şifre Hatırlatma'/>
        <Form>
          <Form.Field control={Input} fluid label='E-Posta' value={this.state.mail} onChange={this.updateMail} placeholder='E-Posta' />
          <Form.Field control={Button} color='teal' fluid onClick={() => this.handlePasswordReset()}>Gönder</Form.Field>
        </Form>
        <Segment basic>
          <a onClick={() => this.handleRoute('/login')}>Hatırladın mı ?</a>
        </Segment>
      </Segment>
    );
  }
}
