Template.faq.events({
  'click .edit-faq': function(){
    Session.set('edit-faq-active',true)
  },
  'click .edit-faq-submit': function(e,t){
    var x = t.find('textarea[name=edit-faq-text]') || ""
    var meta = Meta.findOne()
    Meta.update({_id:meta._id},{$set:{text_faq:x.value}})
    Session.set('edit-faq-active',false)
  }
})

UI.registerHelper('metaTextFaq', function(){
  return Meta.findOne().text_faq
})
