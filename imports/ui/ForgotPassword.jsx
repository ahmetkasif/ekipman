import React, { Component } from 'react';
import { Card, Button, Input } from 'semantic-ui-react';
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
    Accounts.forgotPassword({ email: this.state.mail });
    new Noty({
      type: 'success',
      layout: 'topRight',
      theme: 'sunset',
      text: 'Doğrulama linki başarıyla yollandı, gelen kutunuzu kontrol edin.',
      timeout: 1000,
      progressBar: true,
      closeWith: ['click', 'button'],
      animation: {
        open: 'noty_effects_open',
        close: 'noty_effects_close'
      }
    }).show();
    this.props.history.push('/login');
  }

  render() {
    return (
      <Card>
        <Card.Content>
          <Input fluid value={this.state.mail} onChange={this.updateMail} placeholder='E-Posta' /><br/>
          <Button fluid onClick={() => this.handlePasswordReset()} color='teal' floated='right' type='submit'>Gönder</Button>
        </Card.Content>
        <Card.Content extra>
          <a onClick={() => this.handleRoute('/login')}>Hatırladın mı ?</a>
        </Card.Content>
      </Card>
    );
  }
}
