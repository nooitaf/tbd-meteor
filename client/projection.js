
Template.projectionItemsItem.events({
  'click .projection-button': function(){
    Orders.insert({owner:Meteor.userId(), order:this})
  },
  'click .projection-button-count': function(){
    var order = Orders.findOne({'order._id':this._id})
    if (order)
    Orders.remove({_id:order._id})
  }
})
Template.projectionItemsAdmin.events({
  'click button[name=add-projection-submit]': function(e,t){
    var name = t.find('input[name=add-projection-item]').value
    var max = parseInt(t.find('input[name=add-projection-max]').value) || 0
    if (name) Projection.insert({name:name, max:max})
  }
})
Template.projectionListItem.events({
  'click button[name=remove-projection-submit]': function(e,t){
    if(confirm('u sure?')) Projection.remove({_id:this._id})
  },
  'click button[name=update-projection-submit]': function(e,t){
    var name = t.find('input[name=projection-name]').value
    var max = parseInt(t.find('input[name=projection-max]').value)
    Projection.update({_id:this._id},{$set:{name:name, max:max}})
  }
})
UI.registerHelper('countProjections', function(pid){
    return Orders.find({owner:Meteor.userId(),'order._id': pid}).count() || "-"
})
UI.registerHelper('countProjectionsAll', function(pid){
    return Counts.get('p'+pid) || "-"
})
UI.registerHelper('projectionNameWithId', function(pid){
  var p = Projection.findOne({_id:pid})
  return p && p.name
})
UI.registerHelper('projections', function(){
  return Projection.find({},{sort:{name:1}})
})
UI.registerHelper('projectionIsMax', function(pid){
  var p = Projection.findOne({_id:pid})
  return p && p.isMax
})
