Template.cfp.events({
  'click .edit-cfp': function(){
    Session.set('edit-cfp-active',true)
  },
  'click .edit-cfp-submit': function(e,t){
    var x = t.find('textarea[name=edit-cfp-text]') || ""
    var meta = Meta.findOne()
    Meta.update({_id:meta._id},{$set:{text_cfp:x.value}})
    Session.set('edit-cfp-active',false)
  }
})

UI.registerHelper('metaTextCfp', function(){
  return Meta.findOne().text_cfp
})
