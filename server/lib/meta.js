import { Email } from 'meteor/email'
Meta = new Mongo.Collection('meta');
Meta.allow({
  insert: function(userId) {
    return userId && Meteor.users.findOne(userId).admin;
  },
  update: function(userId) {
    return userId && Meteor.users.findOne(userId).admin;
  },
  remove: function(userId) {
    return userId && Meteor.users.findOne(userId).admin;
  }
})
Meteor.publish("meta", function () {
  return Meta.find({meta:true},{limit:1});
});
Meteor.startup(function(){
  if (!Meta.findOne({meta:true})) {
    Meta.insert({meta:true});
    console.log('Meta created.');
  }
});
