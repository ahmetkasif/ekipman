import React, { Component } from 'react';
import { List, Image, Segment, Divider, Header } from 'semantic-ui-react';

export default class Advertorial extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Segment className='advertorialContainer' raised color='violet'>
        <Header as='h3' dividing color='violet' content='Reklam Panosu'/>
          Buraya reklam verebilirsiniz.
      </Segment>
    );
  }
}
