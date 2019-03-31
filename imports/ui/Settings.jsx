import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Image, Header, Label, Icon, Card, Button, Form, Input } from 'semantic-ui-react';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Card className="profile">
        <Card.Content header={
          <div className="profileTop">
            <Header as='h4'>
              <Header.Content>
                Hesap Ayarları
              </Header.Content>
            </Header>
          </div>
        }/>
        <Card.Content>
          <Card>
            <Card.Content header={
              <div className="profileTop">
                <Header as='h4'>
                  <Header.Content>
                    Şifre Değiştir
                  </Header.Content>
                </Header>
              </div>
            }/>
            <Card.Content>
              <Form>
                <Form.Input fluid label='Mevcut Şifreniz' placeholder='Mevcut Şifreniz' />
                <Form.Input fluid label='Yeni Şifreniz' placeholder='Yeni Şifreniz' />
                <Form.Input fluid label='Yeni Şifreniz' placeholder='Yeni Şifreniz' />
                <Form.Button>Değiştir</Form.Button>
              </Form>
            </Card.Content>
          </Card>
        </Card.Content>
      </Card>
    );
  }
}


export default SettingsContainer = withTracker(props => {
  return{
  };
})(Settings);
