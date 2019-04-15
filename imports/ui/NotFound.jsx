import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

export default class NotFound extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h3>Sayfa bulunamadı.</h3>
    );
  }
}
