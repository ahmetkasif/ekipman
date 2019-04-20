import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Messages = new Mongo.Collection('messages');


if (Meteor.isServer) {
    Meteor.methods({
        newMessage: function(message){
            Messages.insert({
                userId: Meteor.userId(),
                username: Meteor.user().username,
                email: Meteor.user().emails[0].address,
                message,
                date: new Date(),
            });
        },
        deleteMessage: function(userId){
            Messages.remove(userId);
        }
    });

    Meteor.publish('messages', function() {
        return Messages.find({}, {sort: { date: -1 }, limit: 10});
    });
}