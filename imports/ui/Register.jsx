import React, { Component } from 'react';
import { Button, Input, Card} from 'semantic-ui-react';
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
    }
  }
      

  render() {
    return (
      <div className='loginContainer'>
        <Card className="login">
          <Card.Content>
            <Input fluid value={this.state.username} onChange={this.updateUsername} placeholder='Kullanıcı Adı' /><br/>
            <Input fluid value={this.state.email} onChange={this.updateEmail} placeholder='E-Posta' /><br/>
            <Input fluid value={this.state.password} onChange={this.updatePassword} type='password' placeholder='Şifre' /><br/>
            <Button fluid onClick={() => this.register()} color='teal' floated='right' type='submit'>Kayıt Ol</Button>
          </Card.Content>
          <Card.Content extra>
            <a onClick={() => this.handleRoute('/login')}>Hesabın var mı ?</a>
          </Card.Content>
        </Card>
      </div>
    );
  }
}
