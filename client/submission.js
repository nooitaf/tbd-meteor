
Template.submissionItemsItem.events({
  'click .submission-edit-toggle': function(e){
    if (Session.equals('submission-edit-id',this._id)){
      Session.set('submission-edit-id',false)
    } else {
      Session.set('submission-edit-id',this._id)
    }
    setTimeout(function () {
      $('html,body').animate({
        scrollTop: $(e.target).offset().top - $(document.body).offset().top + $(document.body).scrollTop() - 30
      },300);
    }, 100);

  }
})

Template.submissionItemsItem.helpers({
  isOpen: function(){
    return Session.equals('submission-edit-id',this._id)
  }
})

Template.submissions.events({
  'click .edit-submissions': function(){
    Session.set('edit-submissions-active',true)
  },
  'click .edit-submissions-submit': function(e,t){
    var x = t.find('textarea[name=edit-submissions-text]') || ""
    var meta = Meta.findOne()
    Meta.update({_id:meta._id},{$set:{text_submissions:x.value}})
    Session.set('edit-submissions-active',false)
  }
})

UI.registerHelper('metaTextSubmissions', function(){
  return Meta.findOne().text_submissions
})

Template.submissionItem.events({
  'click .submission-open-toggle': function(e){
    if (Session.equals('submission-open-id',this._id)){
      Session.set('submission-open-id',false)
    } else {
      Session.set('submission-open-id',this._id)
    }
    setTimeout(function () {
      $('html,body').animate({
        scrollTop: $(e.target).offset().top - $(document.body).offset().top + $(document.body).scrollTop() - 30
      },300);
    }, 100);
  }
})

Template.submissionItem.helpers({
  isOpenSubmission:function(){
      return Session.equals('submission-open-id',this._id)
  }
})


UI.registerHelper('submissionTypes', function(){
  return ['---','lecture','(lightning)talk','workshop','installation','project','performance','pancakes','$somethingawesome','other']
})
UI.registerHelper('submissionMinutes', function(){
  return [
    5,10,15,20,30,45,60,90,120,180,240,300,360,420,480,540,600
  ]
})
UI.registerHelper('countSubmissionsUser', function(pid){
    return Submissions.find({}).count() || "-"
})
UI.registerHelper('countSubmissionsAll', function(){
  return Submissions.find().count() || "-"
})
UI.registerHelper('submissions', function(){
  return Submissions.find({},{sort:{date_created:-1}})
})
UI.registerHelper('submissionsByDateStart', function(){
  return Submissions.find({},{sort:{date_start:1}})
})
UI.registerHelper('submissionsWithoutTrackId', function(){
  return Submissions.find({track:{$in:[null,false,'0']}},{sort:{date_start:1}}).fetch() || false
})
UI.registerHelper('submissionsCanceled', function(){
  return Submissions.find({canceled:true})
})
UI.registerHelper('submissionsByDateStartWithTrackId', function(trackid){
  return Submissions.find({track:trackid},{sort:{date_start:1}})
})
UI.registerHelper('submissionsWithUserId', function(uid){
  return Submissions.find({owner:uid},{sort:{date_created:-1}})
})
UI.registerHelper('submissionsWithCurrentUserId', function(){
  return Submissions.find({owner:Meteor.userId()},{sort:{date_created:-1}})
})

Template.timeslotSelector.events({
  'click .timeslot-chooser':function(e,t){
    var target = $(e.target)
    if(target.hasClass('selected')) {
      target.removeClass('selected')
    } else {
      target.addClass('selected')
    }
  },
  'click .timeslot-chooser-all':function(e,t){
    var tds = t.findAll('td')
    _.each(tds, function(td){
      var target = $(td)
      if(!target.hasClass('selected')) {
        target.addClass('selected')
      }
    })
  },
  'click .timeslot-chooser-none':function(e,t){
    var tds = t.findAll('td')
    _.each(tds, function(td){
      var target = $(td)
      if(target.hasClass('selected')) {
        target.removeClass('selected')
      }
    })
  }
})

Template.submissionEdit.events({
  'click .submission-submit': function(e,t){
    var slots = []
    var slotsSelected = t.findAll('td[class=selected]')
    _.each(slotsSelected, function(slot){
      var slotVal = $(slot).attr('data-slot')
      if(slotVal >= 1) {
        slots.push(parseInt(slotVal))
      }
    })
    var type = t.find('select[name=submission-type]').value || false
    var title = t.find('input[name=submission-title]').value || false
    var text = t.find('textarea[name=submission-text]').value || false
    var minutes = t.find('select[name=submission-minutes]').value || false
    if (type && title && text && slots.length) {
      var item = {
        type: type,
        title: title,
        text: text,
        slots: _.uniq(slots),
        minutes: parseInt(minutes),
        owner: this.owner || Meteor.userId()
      }
      Submissions.update(this._id, {$set:item})
      Session.set('submission-edit-id',false)
    } else {
      alert('Please fill out type, title and text.')
    }
  },
  'click .submission-delete': function(){
    if(confirm('are you sure you want to remove the submission: "'+this.title+'"? ')) {
      Submissions.remove(this._id)
    }
  }
})
Template.submissionItemAdd.events({
  'click .submission-show-form': function(e,t){
    t.find('.row-second').style.display = 'block';
    t.find('.submission-show-form').style.display = 'none';
    setTimeout(function () {
      $('html,body').animate({
        scrollTop: $('#AddSubmission').offset().top - $(document.body).offset().top + $(document.body).scrollTop() - 30
      },300);
    }, 100);
  },
  'click .submission-submit': function(e,t){
    var slots = []
    var slotsSelected = t.findAll('td[class=selected]')
    _.each(slotsSelected, function(slot){
      var slotVal = $(slot).attr('data-slot')
      if(slotVal >= 1) {
        slots.push(parseInt(slotVal))
      }
    })
    var type = t.find('select[name=submission-type]').value || false
    var title = t.find('input[name=submission-title]').value || false
    var text = t.find('textarea[name=submission-text]').value || false
    var minutes = t.find('select[name=submission-minutes]').value || false
    if (type && title && text && slots.length) {
      var item = {
        type: type,
        title: title,
        text: text,
        minutes: parseInt(minutes),
        slots: _.uniq(slots),
        owner: Meteor.userId()
      }
      Submissions.insert(item, function(err,res){
        if (err) throw new Meteor.Error(err)
        if (res) {
          t.find('.row-second').style.display = 'none';
          t.find('.submission-show-form').style.display = 'block';
          t.find('select[name=submission-type]').value = '---';
          t.find('select[name=submission-minutes]').value = '5';
          t.find('input[name=submission-title]').value = '';
          t.find('textarea[name=submission-text]').value = '';
          _.each(t.findAll('td'), function(td){
            var target = $(td)
            if(target.hasClass('selected')) {
              target.removeClass('selected')
            }
          })
        }
      })
    } else {
      alert('Please fill out type, title, description and choose at least one slot.')
    }
  },
  'click .submission-cancel': function(e,t){
    t.find('.row-second').style.display = 'none';
    t.find('.submission-show-form').style.display = 'block';
  }
})
