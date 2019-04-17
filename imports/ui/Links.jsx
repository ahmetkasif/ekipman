import React, { Component } from 'react';
import { Header, List, Segment } from 'semantic-ui-react';

export default class Links extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
        <Segment className='page' raised color='teal'>
            <Header as='h3' dividing color='teal' content='S.S.S'/>
            <Segment className='page' raised color='teal'>
                <Header as='h3' dividing color='teal' content='EU4 Orjinal Oyunda DLC Aktivasyonu Nasıl Yapılır ?'/>
                <List bulleted size={'large'}>
                    <List.Item>
                        Hazırlanıyor..
                    </List.Item>
                </List>
            </Segment>
            <Segment className='page' raised color='teal'>
                <Header as='h3' dividing color='teal' content='HOI4 Orjinal Oyunda DLC Aktivasyonu Nasıl Yapılır ?'/>
                <List bulleted size={'large'}>
                    <List.Item>
                        Hazırlanıyor..
                    </List.Item>
                </List>
            </Segment>
            <Segment className='page' raised color='teal'>
                <Header as='h3' dividing color='teal' content='Stellaris Orjinal Oyunda DLC Aktivasyonu Nasıl Yapılır ?'/>
                <List bulleted size={'large'}>
                    <List.Item>
                        Hazırlanıyor..
                    </List.Item>
                </List>
            </Segment>
            <Segment className='page' raised color='teal'>
                <Header as='h3' dividing color='teal' content='CIV6 Orjinal Oyunda DLC Aktivasyonu Nasıl Yapılır ?'/>
                <List bulleted size={'large'}>
                    <List.Item>
                        Hazırlanıyor..
                    </List.Item>
                </List>
            </Segment>
        </Segment>
    );
  }
}
