Tracks = new Mongo.Collection('tracks');
Tracks.allow({
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
Meteor.publish("tracks", function () {
  return Tracks.find({});
});
