Template.api.events({
  'click .edit-api': function(){
    Session.set('edit-api-active',true)
  },
  'click .edit-api-submit': function(e,t){
    var x = t.find('textarea[name=edit-api-text]') || ""
    var meta = Meta.findOne()
    Meta.update({_id:meta._id},{$set:{text_api:x.value}})
    Session.set('edit-api-active',false)
  }
})

UI.registerHelper('metaTextApi', function(){
  return Meta.findOne().text_api
})
