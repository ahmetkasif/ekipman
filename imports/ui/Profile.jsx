import React, { Component, constructor } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Accounts } from 'meteor/accounts-base';
import { Image, Header, Label, Icon, Card, Button } from 'semantic-ui-react';

var gravatar = require('gravatar');

import Loading from './Loading.jsx';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.renderProfile = this.renderProfile.bind(this);
    this.renderPosts = this.renderPosts.bind(this);
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

  renderAuthorActions(post){
    if(post.authorId === Meteor.userId()){
      return(
        <Button color='teal' onClick={() => this.props.history.push('/editPost/' + post._id, {id: post._id})}>Düzenle</Button>
      );
    }
  }

  renderPosts(){
    if(this.props.posts != null){
      return this.props.posts.map((post) => (
        <Card key={post._id} className="postFrame">
          <Card.Content className="postFrameHeader" header={
            <Header as='h4' image>
              {post.authorMails ? this.renderAuthorPic(post.authorMails[0]) : null}
              <Header.Content>
                <Label color='red' horizontal style={{marginBottom: '0.15em'}}>{post.title}</Label>
                <Header.Subheader style={{cursor: 'pointer'}} onClick={() => this.props.history.push('/profile/' + post.authorName, {username: post.authorName})}><Label basic horizontal>{post.authorName}</Label></Header.Subheader>
              </Header.Content>
            </Header>
          }/>
          <Card.Content>
            {post.text}
          </Card.Content>
          <Card.Content extra>
            <Label horizontal as='a' color='green'>Yeni</Label>
            <Label horizontal as='a' color='red'>Teknoloji</Label>
            <Label horizontal as='a' color='teal'>Eğitim</Label>
          </Card.Content>
          <Card.Content extra>
            <div className='ui'>
              <Button color='olive' onClick={() => this.props.history.push('/postDetails/' + post._id, {id: post._id})}>İncele</Button>
              {this.renderAuthorActions(post)}
              <Button color='blue' disabled>Paylaş</Button>
            </div>
          </Card.Content>
        </Card>
      ));
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
          <Card.Content description={
            this.renderPosts()
          }/>
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
  posts = [];
  if(user != undefined){
    Tracker.autorun(() => {
      Meteor.subscribe('userPosts', user._id);
    });

    posts = Posts.find({}, {transform: function (post) {
      post.authorName = user.username;
      post.authorMails = user.emails;
      return post;
    }}).fetch();
  }

  return{
    user,
    posts
  };
})(Profile);
