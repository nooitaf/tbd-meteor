UI.registerHelper('metaTextNotification', function(){
  return Meta.findOne() && Meta.findOne().text_notification
})
Template.notification.helpers({
  connected: function() {
    return Meteor.status().connected;
  }
});
