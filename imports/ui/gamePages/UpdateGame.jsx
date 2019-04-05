import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Button, Input, Form, TextArea, Dimmer, Loader } from 'semantic-ui-react';
import Noty from 'noty';

class UpdateGame extends Component {
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
    this.updateGame = this.updateGame.bind(this);
  }

  componentDidMount(){
    if(this.props.game){
      this.setState({
        name: this.props.game.name,
        description: this.props.game.description,
        rules: this.props.game.rules,
        startDate: this.props.game.startDate
      });
    }
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

  updateGame(){
    Meteor.call(
      'updateGame',
      this.props.game._id,
      this.state.name,
      this.state.description,
      this.state.rules,
      this.state.startDate      
    );
    new Noty({
      type: 'information',
      layout: 'topRight',
      theme: 'sunset',
      text: 'Oyun bilgisi başarıyla güncellendi.',
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
    if(this.props.game){
      return (
        <div className="newPost">
          <h3 className="newPostHeader">Oyun duyurusunu güncelle</h3>
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
              className="mini"
              color="red"
              content="İptal"
              onClick={() => this.props.history.push('/games/' + this.props.game._id, {id: this.props.game._id})}
            />
            <Button
              size="medium"
              className="mini"
              color="teal"
              content="Güncelle"
              onClick={() => this.updateGame()}
            />
          </div>
        </div>
      );
    } else {
      return(
        <Dimmer active inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
      );
    }
  }
}

export default UpdateGameContainer = withTracker(props => {
  Tracker.autorun(() => {
    Meteor.subscribe('games');
  });

  const game = Games.findOne({_id: props.match.params.gameId});

  return{
    game
  };
})(UpdateGame);
