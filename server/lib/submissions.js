Submissions = new Mongo.Collection('submissions');
Submissions.allow({
  insert: function(userId, fileObj) {
    if (userId && fileObj.owner && fileObj.owner === userId) {
      fileObj['date_created'] = new Date()
      fileObj['date_edited'] = new Date()
      return true;
    } else {
      return false;
    }
  },
  update: function(userId, fileObj) {
    if (userId) {
      if (fileObj.owner && fileObj.owner === userId) {
        fileObj['date_edited'] = new Date()
        return true;
      } else {
        if (Meteor.users.findOne(userId).admin) {
          fileObj['date_edited'] = new Date()
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
        Submissions.update({
          _id: fileObj._id
        }, {
          $set: {
            canceled: true
          }
        })
        return false;
      } else if (Meteor.users.findOne(userId).admin) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  },
  fetch: ['owner']
});

Meteor.publish("submissions", function() {
  var user = Meteor.users.findOne({ _id: this.userId })
  var hidden_tracks = _.pluck(Tracks.find({hidden:true}).fetch(),'_id')
  if (user && user.admin){
    return Submissions.find({})
  } else {
    return Submissions.find({$or:[{track:{$nin:hidden_tracks}},{owner:this.userId}]})
  }
});
