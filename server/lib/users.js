Meteor.publish("userData", function() {
  let admin = Meteor.users.findOne({'username':'admin'})
  if (this.userId === admin._id) {
    // console.log('admin');
    return Meteor.users.find({});
  } else {
    // console.log('not admin');
    return Meteor.users.find({_id:this.userId});
  }
});

Meteor.publish('people', function() {
  var subuserlist = Submissions.find({$or:[{track:{$ne:[null,false,'0']}}]},{fields:{owner:1}}).fetch()
  subuserlist = _.map(subuserlist,function(x){return x.owner})
  var userCursor = Meteor.users.find({_id:{$in:subuserlist}}, {
    fields: {
      username: 1
    }
  });
  // this automatically observes the cursor for changes,
  // publishes added/changed/removed messages to the 'people' collection,
  // and stops the observer when the subscription stops
  Mongo.Collection._publishCursor(userCursor, this, 'people');

  this.ready();
});

Meteor.startup(function(){
  console.log('Server started: ' + new Date());
  var adminEmail = "admin@example.com";
  var adminUser = Meteor.users.findOne({'emails.0.address':adminEmail});
  // console.log(adminUser);
  if (adminUser) {
    if (adminUser.admin) {
      // console.log(adminUser.username + ' is admin.');
      Roles.addUsersToRoles(adminUser._id, 'admin', Roles.GLOBAL_GROUP);
    } else {
      Meteor.users.update(adminUser._id, {$set:{admin:true}});
      Roles.addUsersToRoles(adminUser._id, 'admin', Roles.GLOBAL_GROUP);
      console.log('admin set');
    }
  } else {
    console.log('Admin with ' + adminEmail + ' does not exist.');
    var adminId = Accounts.createUser({
      username: "admin",
      email:adminEmail,
      password:"123456",
      admin:true
    })
    if (adminId) {
      Meteor.users.update({_id:adminId},{$set:{admin:true}})
      Roles.addUsersToRoles(adminId, 'admin', Roles.GLOBAL_GROUP);
    }
    console.log('Admin created.');
  }
});

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
Meteor.methods({
  updateEmail: function(email){
    check(email,String)
    if (!validateEmail(email)) throw new Meteor.Error(200,'That email address does not seem to have the right format.');
    // check(email,'/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i')
    var self = this
    var emails = Meteor.users.findOne(this.userId).emails || []
    _.each(emails,function(e){
      // console.log(e)
      Accounts.removeEmail(self.userId, e.address)
    })
    Accounts.addEmail(this.userId, email)
  }
})
