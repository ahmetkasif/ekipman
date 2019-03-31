import React, { Component } from 'react';
import { Button, Input, Form, TextArea } from 'semantic-ui-react';
import Noty from 'noty';

export default class NewGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      rules: '',
      startDate: ''
    };

    this.updateName = this.updateName.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
    this.updateRules = this.updateRules.bind(this);
    this.updateStartDate = this.updateStartDate.bind(this);
    this.newGame = this.newGame.bind(this);
  }

  updateName(event, data){
    this.setState({
      name: data.value
    });
  }

  updateDescription(event, data){
   this.setState({
    description: data.value
   });
  }

  updateRules(event, data){
    this.setState({
      rules: data.value
    });
  }

  updateStartDate(event, data){
   this.setState({
    startDate: data.value
   });
  }

  newGame(){
    Meteor.call(
      'newGame',
      this.state.name,
      this.state.description,
      this.state.rules,
      this.state.startDate,
      false,
    );
    new Noty({
      type: 'information',
      layout: 'topRight',
      theme: 'sunset',
      text: 'Yeni oyun oluşturuldu',
      timeout: 1000,
      progressBar: true,
      closeWith: ['click', 'button'],
      animation: {
        open: 'noty_effects_open',
        close: 'noty_effects_close'
      }
    }).show();
    this.props.history.push('/games');
  }

  render() {
    return (
      <div className="newPost">
        <h3 className="newPostHeader">Yeni oyun oluştur</h3>
        <div className="newPostContent">
          <Input
            label='Oyun İsmi'
            size='small'
            placeholder="İsim giriniz.."
            value={this.state.name}
            type="text"
            onChange={this.updateName}
            className='each'
          />
          <Form className="each">
            <TextArea
              size='large'
              placeholder="Kısa Açıklama"
              type="text"
              value={this.state.description}
              onChange={this.updateDescription}
              className="each"
            />
          </Form>
          <Form className="each">
            <TextArea
              size='large'
              placeholder="Kurallar"
              type="text"
              value={this.state.rules}
              onChange={this.updateRules}
              className="each"
            />
          </Form>
          <Input
            label='Oyun Tarihi'
            size='small'
            placeholder="Başlık giriniz.."
            value={this.state.startDate}
            type="text"
            onChange={this.updateStartDate}
            className='each'
          />
        </div>
        <div>
          <Button
            size="medium"
            color="red"
            content="İptal"
            onClick={() => this.props.history.push('/games')}
          />
          <Button
            size="medium"
            color="teal"
            content="Gönder"
            onClick={() => this.newGame()}
          />
        </div>
      </div>
    );
  }
}
