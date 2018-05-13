UI.registerHelper('isAdmin', function(){
  var user = Meteor.users.findOne({_id:Meteor.userId()})
  return user && user.admin
})
UI.registerHelper('isTrue', function(sessionVal){
  return Session.get(sessionVal)
})
UI.registerHelper('usernameWithId', function(id){
  if (Meteor.users.findOne({_id:id})) return Meteor.users.findOne({_id:id}).username || 'not found'
  if (People.findOne({_id:id})) return People.findOne({_id:id}).username || 'not found'
  return ''
})
UI.registerHelper('isEqual', function(a,b){
  return a === b
})
UI.registerHelper('isEqualDate', function(a,b){
  if (!moment.isDate(a) || !moment.isDate(b)) {
    return a === b
  }
  return moment(a).isSame(b)
})
UI.registerHelper('isChecked', function(val){
  return val ? 'checked' : ''
})
UI.registerHelper('contains', function(arr,val){
  return _.indexOf(arr,val) >= 0 ? true : false;
})
UI.registerHelper('niceDate', function(date){
  if (!moment.isDate(date)) return ''
  return moment(date).format('HH:mm')
})
UI.registerHelper('niceDateDay', function(date){
  if (!moment.isDate(date)) return ''
  return moment(date).format('dd')
})
UI.registerHelper('niceDuration', function(minutes){
  var duration = moment.duration(minutes,'minutes')
  var hours = duration.get('hours')
  var output = " "
  if (hours) {
    output += '' + hours + ':'
    minutes = minutes - hours * 60
  }
  if (minutes <= 9 && hours) {
    output += '0'
  }
  output += minutes
  return output
})
