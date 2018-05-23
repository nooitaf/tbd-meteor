// 13:34 <@realitygaps|m> chaos=main discord=selforganised confusion=workshops
// 13:34 <@realitygaps|m> aftermath is the performances and bureaucracy is the
//                        volunteer stuff+pancakes

Template.trackItemsAdmin.events({
  'click button[name=add-track-submit]': function(e,t){
    var name = t.find('input[name=add-track-item]').value
    var order = parseInt(t.find('input[name=add-track-order]').value) || 0
    var desc = t.find('textarea[name=add-track-desc]').value
    if (name) Tracks.insert({name:name, order:order, desc:desc})
  }
})
Template.trackListItem.events({
  'click button[name=remove-track-submit]': function(e,t){
    if(confirm('u sure to remove ' + this.name + ' ?')) Tracks.remove({_id:this._id})
  },
  'click button[name=update-track-submit]': function(e,t){
    var name = t.find('input[name=track-name]').value
    var order = parseInt(t.find('input[name=track-order]').value)
    var desc = t.find('textarea[name=track-desc]').value
    Tracks.update({_id:this._id},{$set:{name:name, order:order, desc:desc}})
  }
})
UI.registerHelper('trackNameWithId', function(pid){
  var p = Tracks.findOne({_id:pid})
  return p && p.name
})
UI.registerHelper('tracks', function(){
  return Tracks.find({},{sort:{order:1}})
})
UI.registerHelper('timetable', function(){
  var day = moment('20180706')
  var list = []
  for (var i = 0; i< 60/5*24*3; i++){
    list.push({text:day.format('dddd - HH:mm'), date:new Date(day)})
    day = day.add(5, 'minutes')
  }
  return list
})

Template.tracksEditor.events({
  'click .submission-edit-toggle': function(){
    if (Session.equals('tracks-edit-id',this._id)){
      Session.set('tracks-edit-id',false)
    } else {
      Session.set('tracks-edit-id',this._id)
    }
  }
})
Template.trackDateSelector.events({
  'change select[name=submission-date-start]': function(e,t){
    var date_start = t.find('select[name="submission-date-start"]').value || false
    if (date_start){
      date_start = new Date(date_start)
      Submissions.update(this._id,{$set:{date_start:date_start}})
    }
  }
})
Template.trackSelector.events({
  'change select[name=submission-track]': function(e,t){
    var trackid = t.find('select[name="submission-track"]').value || false
    if (trackid)
      Submissions.update(this._id,{$set:{track:trackid}})
  }
})
Template.trackSelectorNotime.events({
  'click input[type="checkbox"]+label':function(e,t){
    e.currentTarget.previousSibling.checked = !e.currentTarget.previousSibling.checked
    var notime = e.currentTarget.previousSibling.checked || false
    Submissions.update(this._id,{$set:{notime:notime}})
  }
})
Template.trackSelectorDays.events({
  'click input[type="checkbox"]+label':function(e,t){
    e.currentTarget.previousSibling.checked = !e.currentTarget.previousSibling.checked
    var day1 = t.find('input[name=day1]').checked || false
    var day2 = t.find('input[name=day2]').checked || false
    var day3 = t.find('input[name=day3]').checked || false
    Submissions.update(this._id,{$set:{
      day1:day1,
      day2:day2,
      day3:day3
    }})
  }
})

Template.tracksEditor.helpers({
  isOpen: function(){
    return Session.equals('tracks-edit-id',this._id)
  }
})

Template.adminDays.events({
  'click button[name=meta-days-1-submit]': function(e,t){
    var text = t.find('textarea[name=meta-days-1]').value || ""
    var meta = Meta.findOne()
    Meta.update({_id:meta._id},{$set:{text_day1:text}})
  },
  'click button[name=meta-days-2-submit]': function(e,t){
    var text = t.find('textarea[name=meta-days-2]').value || ""
    var meta = Meta.findOne()
    Meta.update({_id:meta._id},{$set:{text_day2:text}})
  },
  'click button[name=meta-days-3-submit]': function(e,t){
    var text = t.find('textarea[name=meta-days-3]').value || ""
    var meta = Meta.findOne()
    Meta.update({_id:meta._id},{$set:{text_day3:text}})
  }
})

UI.registerHelper('metaTextDay1', function(){
  return Meta.findOne().text_day1
})
UI.registerHelper('metaTextDay2', function(){
  return Meta.findOne().text_day2
})
UI.registerHelper('metaTextDay3', function(){
  return Meta.findOne().text_day3
})
UI.registerHelper('showInfo', function(subId){
  var openItems = Session.get('schedule-open-items') || []
  return _.contains(openItems,subId)
})

UI.registerHelper('dateIsDay1', function(d){
  return isDay1(d)
})
UI.registerHelper('dateIsDay2', function(d){
  return isDay2(d)
})
UI.registerHelper('dateIsDay3', function(d){
  return isDay3(d)
})

Template.toggleMinimal.events({
  'click .toggle-minimal-compress':function(){
    var openItems = Session.get('schedule-open-items') || []
    Session.set('schedule-open-items',[])
  },
  'click .toggle-minimal-expand':function(){
    var openItems = Session.get('schedule-open-items') || []
    Submissions.find({}).forEach(function(item){
      openItems.push(item._id)
    })
    Session.set('schedule-open-items',openItems)
  }
})

Template.daylisting.events({
  'click .daylisting':function(){
    // console.log(this._id)
    var openItems = Session.get('schedule-open-items') || []
    if (_.contains(openItems,this._id)){
      openItems = _.without(openItems,this._id)
    } else {
      openItems.push(this._id)
    }
    Session.set('schedule-open-items', openItems)
  }
})
