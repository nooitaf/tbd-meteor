
Meteor.setInterval(function(){
  var cfp = HTTP.get('https://raw.githubusercontent.com/albjeremias/tbdcfp/master/cfp.md')
  if (cfp && cfp.content) {
    var meta = Meta.findOne()
    Meta.update({_id:meta._id},{$set:{text_cfp:cfp.content}})
  }
}, 1000*60)
