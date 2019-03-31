import React, { Component, constructor } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Image, Header, Label, Icon, Card, Button } from 'semantic-ui-react';

var gravatar = require('gravatar');

import Loading from './Loading.jsx';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.renderProfile = this.renderProfile.bind(this);
  }

  renderAuthorPic(mail){
    if(mail){
      return(
        <Image src={gravatar.url(mail.address)} />
      );
    } else {
      return(
        <Loading/>
      );
    }
  }

  renderProfile(){
    if(this.props.user){
      return(
        <Card className="card">
          <Card.Content className="cardHeader" header={
            <Header as='h4' image>
              <Image src={gravatar.url(this.props.user.emails[0].address)} />
              <Header.Content>
                {this.props.user.username}
                <Header.Subheader>{this.props.user.emails[0].address}</Header.Subheader>
              </Header.Content>
            </Header>
          }/>
          <Card.Content>
            <b>Bio: </b>Placeholder text.
            <b>Some information about author: </b>Placeholder text.
          </Card.Content>
        </Card>
      );
    } else {
      return(
        <Loading/>
      );
    }
  }

  render() {
    return(
      <div>
        {this.renderProfile()}
      </div>
    );
  }
}

export default ProfileContainer = withTracker(props => {
  Tracker.autorun(() => {
    Meteor.subscribe('userProfile', props.match.params.username);
  });

  var user = Meteor.users.findOne({username: props.match.params.username}, {profile: 1, username: 1, emails: 1});

  return{
    user
  };
})(Profile);
