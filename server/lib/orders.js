Orders = new Mongo.Collection('orders');
Orders.allow({
  insert: function(userId, fileObj) {
    if (userId && fileObj.owner && fileObj.owner === userId){
      var count = Orders.find({'order._id':fileObj.order._id}).count()
      var max = Projection.findOne(fileObj.order._id).max
      if (count >= max) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  },
  update: function(userId, fileObj) {
    if (userId) {
      if (fileObj.owner && fileObj.owner === userId){
        var count = Orders.find({'order._id':fileObj.order._id}).count()
        var max = Projection.findOne(fileObj.order._id).max
        if (count >= max) {
          return false;
        } else {
          return true;
        }
      } else {
        if (Meteor.users.findOne(userId).admin) {
          return true;
        } else {
          return false;
        }
      }
    } else {
      return false;
    }
  },
  remove: function(userId, fileObj) {
    if (userId) {
      if (fileObj.owner === userId) {
        return true;
      } else {
        if (Meteor.users.findOne(userId).admin) {
          return true;
        } else {
          return false;
        }
      }
    } else {
      return false;
    }
  },
  fetch: ['owner']
});

Meteor.startup(function(){
  const handle = Orders.find({}).observeChanges({
    added: function(){
      Meteor.call('isMaxUpdate')
    },
    changed: function(){
      Meteor.call('isMaxUpdate')
    },
    removed: function(){
      Meteor.call('isMaxUpdate')
    }
  })
})


Meteor.publish("orders", function () {
  var user = Meteor.users.findOne({_id:this.userId})
  if (user && user.admin){
    return Orders.find({})
  } else {
    return Orders.find({owner:this.userId})
  }
});
