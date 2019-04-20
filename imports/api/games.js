import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Games = new Mongo.Collection('games');

if (Meteor.isServer) {
  Meteor.methods({
    newGame: function(name, description, rules, startDate, isCustom, type){
      var state = 0;
      var hostID = Meteor.userId();
      var eu4countries = [
        {key: 'tur', text: 'Osmanlılar', value: 'Osmanlılar'},
        {key: 'fra', text: 'Fransa', value: 'Fransa'},
        {key: 'hab', text: 'Avusturya', value: 'Avusturya'},
        {key: 'mus', text: 'Moskova', value: 'Moskova'},
        {key: 'cas', text: 'Kastilya', value: 'Kastilya'},
        {key: 'pol', text: 'Polonya', value: 'Polonya'},
        {key: 'por', text: 'Portekiz', value: 'Portekiz'},
        {key: 'swe', text: 'İsveç', value: 'İsveç'},
        {key: 'mam', text: 'Memlükler', value: 'Memlükler'},
        {key: 'eng', text: 'İngiltere', value: 'İngiltere'},
        {key: 'tim', text: 'Timur', value: 'Timur'},
        {key: 'hun', text: 'Macaristan', value: 'Macaristan'},
        {key: 'bra', text: 'Brandenburg', value: 'Brandenburg'},
        {key: 'mil', text: 'Milan', value: 'Milan'},
        {key: 'hol', text: 'Hollanda', value: 'Hollanda'},
        {key: 'bar', text: 'Berberi Devletler', value: 'Berberi Devletler'},
        {key: 'hre', text: 'Kutsal Roma İmp. Dükleri', value: 'Kutsal Roma İmp. Dükleri'},
        {key: 'ita', text: 'İtalyan Dükleri', value: 'İtalyan Dükleri'},
        {key: 'vij', text: 'Vijayanagar', value: 'Vijayanagar'},
        {key: 'del', text: 'Delhi', value: 'Delhi'},
        {key: 'ben', text: 'Bengal', value: 'Bengal'},
        {key: 'jau', text: 'Jaunpur', value: 'Jaunpur'},
        {key: 'jap', text: 'Japon Daimyolar', value: 'Japon Daimyolar'}
      ];

      var hoi4countries = [
        {key: 'tur', text: 'Türkiye', value: 'Türkiye'},
        {key: 'fra', text: 'Fransa', value: 'Fransa'},
        {key: 'ger', text: 'Almanya', value: 'Almanya'},
        {key: 'rus', text: 'Rusya', value: 'Rusya'},
        {key: 'esp', text: 'İspanya', value: 'İspanya'},
        {key: 'por', text: 'Portekiz', value: 'Portekiz'},
        {key: 'swe', text: 'İsveç', value: 'İsveç'},
        {key: 'gbr', text: 'İngiltere', value: 'İngiltere'},
        {key: 'hun', text: 'Macaristan', value: 'Macaristan'},
        {key: 'ita', text: 'İtalya', value: 'İtalya'},
        {key: 'usa', text: 'Amerika', value: 'Amerika'},
        {key: 'rom', text: 'Romanya', value: 'Romanya'},
        {key: 'bre', text: 'Brezilya', value: 'Brezilya'},
        {key: 'saf', text: 'Güney Afrika', value: 'Güney Afrika'},
        {key: 'ast', text: 'Avusturalya', value: 'Avusturalya'},
        {key: 'jap', text: 'Japonya', value: 'Japonya'},
        {key: 'can', text: 'Kanada', value: 'Kanada'},
      ];

      var civ6countries = [
        {key: 'tur', text: 'Osmanlı', value: 'Osmanlı'},
        {key: 'bab', text: 'Babil', value: 'Babil'},
        {key: 'hol', text: 'Hollanda', value: 'Hollanda'},
        {key: 'kor', text: 'Kore', value: 'Kore'},
        {key: 'fra', text: 'Fransa', value: 'Fransa'},
        {key: 'rus', text: 'Rusya', value: 'Rusya'}
      ];

      var ck2countries = [
        {key: 'and', text: 'Endülüs', value: 'Endülüs'},
        {key: 'byz', text: 'Bizans', value: 'Bizans'},
        {key: 'mon', text: 'Moğollar', value: 'Moğollar'},
      ];

      var countries;
      switch (type) {
        case 'eu4':
          countries = eu4countries;
          break;
        case 'hoi4':
          countries = hoi4countries;
          break;
        case 'civ6':
          countries = civ6countries;
          break;
        case 'ck2':
          countries = ck2countries;
          break;
      }
      Games.insert({
        hostID,
        name,
        description,
        rules,
        startDate,
        isCustom,
        state,
        type,
        countries
      });
    },
    updateGame: function(id, name, description, rules, startDate, type){
      Games.update(id, {
        $set: {
          name,
          description,
          rules,
          startDate,
          type
        }
      });
    },
    deleteGame: function(id){
      Games.remove(id);
    },
    changeState: function(id, newState) {
      Games.update({_id: id}, {
        $set: {
          state: newState
        }
      });
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
