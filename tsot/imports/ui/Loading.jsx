import React, { Component } from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

export default class Loading extends Component {
  render() {
    return (
      <Dimmer active inverted>
        <Loader inverted>Yükleniyor</Loader>
      </Dimmer>
    );
  }
}
