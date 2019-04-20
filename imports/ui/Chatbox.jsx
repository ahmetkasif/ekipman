import React, { Component } from 'react';
import { List, Segment, Header, Input, Image } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';

var gravatar = require('gravatar');

class ChatBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: ''
        };

        this.updateMessage = this.updateMessage.bind(this);
        this.renderMessages = this.renderMessages.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    updateMessage(event, data){
        this.setState({
            message: data.value
        });
    }

    sendMessage(event){
        if(event.key === 'Enter'){
            Meteor.call(
                'newMessage',
                this.state.message
            );
            this.setState({
                message: ''
            });
        }
    }

    returnDate(date){
        var diff = (new Date().getTime() - date.getTime())/1000;
        if(diff < 60){
            return('Biraz önce');
        } else if(diff < 3600){
            return (Math.floor(diff / 60) + ' dk. önce');
        } else if(diff < 3600 * 24){
            return (Math.floor(diff / 3600) + ' saat önce');
        } else if(diff < 3600 * 24 * 7){
            return (Math.floor(diff / 3600 * 24) + ' gün önce');
        } else {
            return (date.toLocaleString().substring(0,9) + ' tarihinde');
        }
        
    }

    renderMessages() {
        if(this.props.messages && this.props.messages){
            return this.props.messages.map((message) => (
                <List.Item key={message._id}>
                    <Image avatar src={gravatar.url(message.email)} />
                    <List.Content>
                        <List.Header as='a'>{message.username}</List.Header>
                        <List.Description>
                            {message.message}<br/>
                            {this.returnDate(message.date)}
                        </List.Description>
                    </List.Content>
                </List.Item>
            ));
        } else {
            return(
                <Dimmer active inverted>
                    <Loader inverted>Yükleniyor</Loader>
                </Dimmer>
            );
        }
    }

    render(){
        return(
            <Segment className='chatBox' raised color='teal'>
                <Header as='h3' dividing color='teal' content='Sohbet'/>
                <List size={'large'}>
                    {this.renderMessages()}
                </List>
                <Input fluid value={this.state.message} onKeyPress={this.sendMessage} onChange={this.updateMessage} placeholder='Mesaj'/>
            </Segment>
        );
    }
}

export default ChatContainer = withTracker(props => {
    Tracker.autorun(() => {
      Meteor.subscribe('messages');
    });
  
    messages = Messages.find({}).fetch();
    
    return {
      messages
    };
  })(ChatBox);