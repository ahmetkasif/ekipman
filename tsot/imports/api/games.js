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
    }
  });

  Meteor.publish('games', function() {
    return Games.find();
  });
}
