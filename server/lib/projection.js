Projection = new Mongo.Collection('projection');
Projection.allow({
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
Meteor.publish("projection", function () {
  var self = this
  var user = Meteor.users.findOne({_id:self.userId})
  if (user && user.admin){
    Counts.publish(self, 'submissions', Submissions.find());
    Projection.find().forEach(function(p){
      Counts.publish(self, 'p'+p._id, Orders.find({'order._id':p._id}));
    })
    return Projection.find({});
  } else {
    Projection.find().forEach(function(p){
      Counts.publish(self, 'p'+p._id, Orders.find({'order._id':p._id, owner: self.userId}));
    })
    return Projection.find({});
  }
});
Meteor.methods({
  isMaxUpdate: function(){
    Projection.find().forEach(function(p){
      if (Orders.find({'order._id':p._id}).count() >= p.max) {
        Projection.update({_id:p._id},{$set:{isMax:true}})
      } else {
        Projection.update({_id:p._id},{$set:{isMax:false}})
      }
    })
  }
})
