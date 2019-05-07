import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Image, Header, Dimmer, Loader, Segment, Container, Button } from 'semantic-ui-react';

var gravatar = require('gravatar');

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.renderProfile = this.renderProfile.bind(this);
  }

  renderProfile(){
    if(this.props.user){
      return(
        <Segment className='page' raised color='teal'>
          <Header as='h4' dividing color='teal' image>
            <Image avatar src={gravatar.url(this.props.user.emails[0].address)} />
            <Header.Content>
              {this.props.user.username}
              <Header.Subheader>{this.props.user.emails[0].address}</Header.Subheader>
            </Header.Content>
          </Header>
          <Container>
            Steam bağlantısı kurulmadı, profile erişilemiyor.
          </Container>
        </Segment>
      );
    } else {
      return(
        <Dimmer active inverted>
          <Loader inverted>Yükleniyor</Loader>
        </Dimmer>
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
