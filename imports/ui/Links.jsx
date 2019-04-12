import React, { Component } from 'react';
import { Step, Header, List, Card } from 'semantic-ui-react';

export default class Links extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
        <Step>
            <Card className="profile">
                <Card.Content header={
                    <Card.Header as='h4'>
                        İndirme Linkleri
                    </Card.Header>
                }/>
                <Card.Content>
                <List bulleted size={'large'}>
                    <List.Item>
                        Hazırlanıyor..
                    </List.Item>
                </List>
                </Card.Content>
            </Card>
            <Card className="profile">
                <Card.Content header={
                <div className="profileTop">
                    <Header as='h4'>
                    <Header.Content>
                    HOI4 Orjinal Oyunda DLC Aktivasyonu
                    </Header.Content>
                    </Header>
                </div>
                }/>
                <Card.Content>
                <List bulleted size={'large'}>
                    <List.Item>
                        Hazırlanıyor..
                    </List.Item>
                </List>
                </Card.Content>
            </Card>
            <Card className="profile">
                <Card.Content header={
                <div className="profileTop">
                    <Header as='h4'>
                    <Header.Content>
                    Stellaris Orjinal Oyunda DLC Aktivasyonu
                    </Header.Content>
                    </Header>
                </div>
                }/>
                <Card.Content>
                <List bulleted size={'large'}>
                    <List.Item>
                        Hazırlanıyor..
                    </List.Item>
                </List>
                </Card.Content>
            </Card>
            <Card className="profile">
                <Card.Content header={
                <div className="profileTop">
                    <Header as='h4'>
                    <Header.Content>
                    HOI4 ... Modu
                    </Header.Content>
                    </Header>
                </div>
                }/>
                <Card.Content>
                <List bulleted size={'large'}>
                    <List.Item>
                        Hazırlanıyor..
                    </List.Item>
                </List>
                </Card.Content>
            </Card>
        </Step>
    );
  }
}
