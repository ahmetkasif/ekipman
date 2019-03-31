import React, { Component } from 'react';
import { Image, Header, Label, Icon, Card, Button } from 'semantic-ui-react';

export default class About extends Component {
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
                Hakkında
              </Header.Content>
            </Header>
          </div>
        }/>
        <Card.Content>
          Türk Strateji Oyuncuları Topluluğu (TSOT) resmi web uygulamasıdır.
          Sorularınız, görüşleriniz ve hata bildirimi için, <b>noreply@tsotapp.com</b> adresine e-posta ile ulaşabilirsiniz.<br/>
          <img className="ui medium centered rounded image" src='/logo.png' />
        </Card.Content>
      </Card>
    );
  }
}
