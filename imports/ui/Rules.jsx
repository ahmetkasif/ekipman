import React, { Component } from 'react';
import { Tab, Card, Segment, Header } from 'semantic-ui-react';

const panes = [
    { menuItem: 'EU4 Tarihi', render: () =>
    <Segment className='page' raised color='teal'>
      <Header as='h3' dividing color='teal' content='Europa Universalis 4 Tarihi Oyun Kuralları'/>
      Hazırlanıyor..
    </Segment>
    }, { menuItem: 'EU4 Özel', render: () =>
    <Segment className='page' raised color='teal'>
      <Header as='h3' dividing color='teal' content='Europa Universalis 4 Özel Oyun Kuralları'/>
      Hazırlanıyor..
    </Segment>
    }, { menuItem: 'HOI4', render: () =>
    <Segment className='page' raised color='teal'>
      <Header as='h3' dividing color='teal' content='Hearts of Iron 4 Tarihi Oyun Kuralları'/>
      Hazırlanıyor..
    </Segment>
    }, { menuItem: 'CIV6', render: () =>
    <Segment className='page' raised color='teal'>
      <Header as='h3' dividing color='teal' content='Civilization 6 Oyun Kuralları'/>
      Hazırlanıyor..
    </Segment>
    }
]

export default class Rules extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Segment className='page' raised color='teal'>
        <Header as='h3' dividing color='teal' content='Oyun Kuralları'/>
        <Tab menu={{ secondary: true, pointing: true }} panes={panes}/>
      </Segment>
    );
  }
}
