import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Games = new Mongo.Collection('games');

if (Meteor.isServer) {
  Meteor.methods({
    /*
      state: 0 (not yet started), 1 (being played), 2 (finished)
    */
    newGame: function(name, description, rules, startDate, isCustom){
      var state = 0;
      var hostID = Meteor.userId();
      Games.insert({
        hostID,
        name,
        description,
        rules,
        startDate,
        isCustom,
        state
      });
    },
    updateGame: function(id, name, description, rules, startDate){
      Games.update(id, {
        $set: {
          name: name,
          description: description,
          rules: rules,
          startDate: startDate
        }
      });
    },
    deleteGame: function(id){
      Games.remove(id);
    },
    addPlayer: function(gameID, option1, option2, option3){
      player = {};
      player.id = Meteor.userId();
      player.name = Meteor.user().username;
      player.email = Meteor.user().emails[0].address
      player.option1 = option1;
      player.option2 = option2;
      player.option3 = option3;

      Games.update({_id: gameID}, {
        $push: { players: player }
      });
    },
    removePlayer: function(gameID){
      Games.update({_id: gameID}, {
        $pull: { players: { id: Meteor.userId() } }
      });
    }
  });

  Meteor.publish('games', function() {
    return Games.find();
  });

  Meteor.publish('game', function(id) {
    return Games.find({_id: id});
  });

  Meteor.publish('users', function() {
    let users = Meteor.users.find({}, { fields: { profile:1, username: 1, emails: 1 }});
    return users;
  });
  
  Meteor.publish('userProfile', function(username) {
    let user = Meteor.users.find({username: username}, { fields: { profile:1, username: 1, emails: 1 }});
    return user;
  });
}
