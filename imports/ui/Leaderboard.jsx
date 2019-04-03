import React, { Component } from 'react';
import { Tab, Image, Header, Table, Card } from 'semantic-ui-react';

const panes = [
  { menuItem: 'EU4', render: () => <Table basic='very' >
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell>Kullanıcı Adı</Table.HeaderCell>
      <Table.HeaderCell>Maç Sayısı</Table.HeaderCell>
      <Table.HeaderCell>Puan</Table.HeaderCell>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    <Table.Row>
      <Table.Cell>
        <Header as='h4' image>
          <Image src='https://react.semantic-ui.com/images/avatar/small/lena.png' rounded size='mini' />
          <Header.Content>
            <p>WesternFront</p>
          </Header.Content>
        </Header>
      </Table.Cell>
      <Table.Cell collapsing>12</Table.Cell>
      <Table.Cell collapsing>225</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>
        <Header as='h4' image>
          <Image src='https://react.semantic-ui.com/images/avatar/small/matthew.png' rounded size='mini' />
          <Header.Content>
            Lygrim
          </Header.Content>
        </Header>
      </Table.Cell>
      <Table.Cell>15</Table.Cell>
      <Table.Cell>150</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>
        <Header as='h4' image>
          <Image src='https://react.semantic-ui.com/images/avatar/small/lindsay.png' rounded size='mini' />
          <Header.Content>
            Alucard
          </Header.Content>
        </Header>
      </Table.Cell>
      <Table.Cell>20</Table.Cell>
      <Table.Cell>120</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>
        <Header as='h4' image>
          <Image src='https://react.semantic-ui.com/images/avatar/small/mark.png' rounded size='mini' />
          <Header.Content>
            Steafun
          </Header.Content>
        </Header>
      </Table.Cell>
      <Table.Cell>10</Table.Cell>
      <Table.Cell>110</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table> },
  { menuItem: 'COH2', render: () => <Table basic='very' >
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell>Kullanıcı Adı</Table.HeaderCell>
      <Table.HeaderCell>Maç Sayısı</Table.HeaderCell>
      <Table.HeaderCell>Puan</Table.HeaderCell>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    <Table.Row>
      <Table.Cell>
        <Header as='h4' image>
          <Image src='https://react.semantic-ui.com/images/avatar/small/lena.png' rounded size='mini' />
          <Header.Content>
            Lygrim
          </Header.Content>
        </Header>
      </Table.Cell>
      <Table.Cell collapsing>12</Table.Cell>
      <Table.Cell collapsing>225</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>
        <Header as='h4' image>
          <Image src='https://react.semantic-ui.com/images/avatar/small/matthew.png' rounded size='mini' />
          <Header.Content>
            Devlet
          </Header.Content>
        </Header>
      </Table.Cell>
      <Table.Cell>15</Table.Cell>
      <Table.Cell>150</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>
        <Header as='h4' image>
          <Image src='https://react.semantic-ui.com/images/avatar/small/lindsay.png' rounded size='mini' />
          <Header.Content>
            Alucard
          </Header.Content>
        </Header>
      </Table.Cell>
      <Table.Cell>20</Table.Cell>
      <Table.Cell>120</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>
        <Header as='h4' image>
          <Image src='https://react.semantic-ui.com/images/avatar/small/mark.png' rounded size='mini' />
          <Header.Content>
            Naked
          </Header.Content>
        </Header>
      </Table.Cell>
      <Table.Cell>10</Table.Cell>
      <Table.Cell>110</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table> },
  { menuItem: 'CIV6', render: () => <Table basic='very' >
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell>Kullanıcı Adı</Table.HeaderCell>
      <Table.HeaderCell>Maç Sayısı</Table.HeaderCell>
      <Table.HeaderCell>Puan</Table.HeaderCell>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    <Table.Row>
      <Table.Cell>
        <Header as='h4' image>
          <Image src='https://react.semantic-ui.com/images/avatar/small/lena.png' rounded size='mini' />
          <Header.Content>
            Ayva
          </Header.Content>
        </Header>
      </Table.Cell>
      <Table.Cell collapsing>45</Table.Cell>
      <Table.Cell collapsing>530</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>
        <Header as='h4' image>
          <Image src='https://react.semantic-ui.com/images/avatar/small/matthew.png' rounded size='mini' />
          <Header.Content>
            HaciOyunda
          </Header.Content>
        </Header>
      </Table.Cell>
      <Table.Cell>35</Table.Cell>
      <Table.Cell>350</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>
        <Header as='h4' image>
          <Image src='https://react.semantic-ui.com/images/avatar/small/lindsay.png' rounded size='mini' />
          <Header.Content>
            Sirinolmayanpanda
          </Header.Content>
        </Header>
      </Table.Cell>
      <Table.Cell>75</Table.Cell>
      <Table.Cell>220</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>
        <Header as='h4' image>
          <Image src='https://react.semantic-ui.com/images/avatar/small/mark.png' rounded size='mini' />
          <Header.Content>
            Guderian
          </Header.Content>
        </Header>
      </Table.Cell>
      <Table.Cell>5</Table.Cell>
      <Table.Cell>50</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table> },
]

export default class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0
    };
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ 
      activeIndex: newIndex
    });
  }

  render() {
    const { activeIndex } = this.state
    return (
      <Card className="profile">
        <Card.Content header={
          <div className="profileTop">
            <Header as='h4'>
              <Header.Content>
                Liderler Tablosu
              </Header.Content>
            </Header>
          </div>
        }/>
        <Card.Content>
          <Tab panes={panes}/>
        </Card.Content>
      </Card>
    );
  }
}
