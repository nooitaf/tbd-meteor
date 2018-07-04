Template.adminUserlisting.helpers({
  users: function(){
    return Meteor.users.find({},{sort:{username:1}})
  },
  submissionCountWithUserId: function(uid){
    return Submissions.find({owner:uid}).count();
  },
  ordersOfUserWithId: function(uid){
    return Orders.find({owner:uid}, {sort:{'order.name':1}})
  }
})

Template.exportView.helpers({
  users: function(){
    return Meteor.users.find({},{sort:{username:1}})
  },
  ordersOfUserWithId: function(uid){
    return Orders.find({owner:uid}, {sort:{'order.name':1}})
  },
  csvify: function(txt){
    return '"' + txt.replace(/"/g,'""') + '"'
  }
})
UI.registerHelper('userEmail', function(uid){
  var emails = Meteor.users.findOne(uid).emails
  if (emails && emails.length && emails[0].address) {
    return emails[0].address
  } else {
    return "NOEMAIL"
  }
})
