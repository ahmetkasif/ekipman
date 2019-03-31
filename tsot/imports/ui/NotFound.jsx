import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

export default class NotFound extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h3>Sayfa bulunamadı.</h3>
        <Button
          className="ui primary button"
          content='Geri dön'
          onClick={() => this.props.history.goBack()}
        />
      </div>
    );
  }
}
