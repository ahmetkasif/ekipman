import React, { Component } from 'react';
import { Tab, Card } from 'semantic-ui-react';

const panes = [
    { menuItem: 'EU4 Tarihi', render: () =>
    <Card>
        <Card.Content>
            <Card.Header>Europa Universalis 4 Tarihi Oyun Kuralları</Card.Header>
            <Card.Description>Hazırlanıyor..</Card.Description>
        </Card.Content>
    </Card>
    }, { menuItem: 'EU4 Özel', render: () =>
    <Card>
        <Card.Content>
            <Card.Header>Europa Universalis 4 Özel Oyun Kuralları</Card.Header>
            <Card.Description>Hazırlanıyor..</Card.Description>
        </Card.Content>
    </Card>
    }, { menuItem: 'HOI4', render: () =>
    <Card>
        <Card.Content>
            <Card.Header>Hearts of Iron 4 Oyun Kuralları</Card.Header>
            <Card.Description>Hazırlanıyor..</Card.Description>
        </Card.Content>
    </Card>
    }, { menuItem: 'CIV6', render: () =>
    <Card>
        <Card.Content>
            <Card.Header>Civilization 6 Oyun Kuralları</Card.Header>
            <Card.Description>Hazırlanıyor..</Card.Description>
        </Card.Content>
    </Card>
    }
]

export default class Rules extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Card>
        <Card.Content header={
          <Card.Header as='h4'>
            Oyun Kuralları
          </Card.Header>
        }/>
        <Card.Content>
            <Tab panes={panes}/>
        </Card.Content>
      </Card>
    );
  }
}
