Template.home.events({
  'click .edit-home': function(){
    Session.set('edit-home-active',true)
  },
  'click .edit-home-submit': function(e,t){
    var x = t.find('textarea[name=edit-home-text]') || ""
    var meta = Meta.findOne()
    Meta.update({_id:meta._id},{$set:{text_home:x.value}})
    Session.set('edit-home-active',false)
  }
})

UI.registerHelper('metaTextHome', function(){
  return Meta.findOne().text_home
})
