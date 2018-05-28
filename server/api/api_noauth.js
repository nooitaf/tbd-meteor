var DOC_WIDTH = 75
var DOC_LEVELSPACES = 3

var addLine = function(txt, level) {
  var out = ""
  var intendWidth = level * DOC_LEVELSPACES
  var colWidth = DOC_WIDTH - intendWidth
  var wrappedText = s.wrap(txt, {
    width: colWidth
  })
  var lines = s.lines(wrappedText)
  for (var i in lines) {
    var t = lines[i]
    t = s.rpad(t, colWidth, " ")
    out = out + s.lpad(t, DOC_WIDTH, " ") + "\n"
  }
  return out
}
var addHeader = function(txt, marginTop, marginBottom) {
  // console.log(typeof marginTop)
  if (typeof marginTop != 'number') marginTop = 1
  if (typeof marginBottom != 'number') marginBottom = 2
  var mt = ""
  _.times(marginTop, function(){
    mt += "\n"
  })
  var mb = ""
  _.times(marginBottom, function(){
    mb += "\n"
  })
  return mt + s.lrpad(txt, DOC_WIDTH, " ") + mb + "\n"
}

var D = '20180706'
var DAY1 = {name:"Day 1",date:moment(D)}
var DAY2 = {name:"Day 2",date:moment(D).add(1,'day')}
var DAY3 = {name:"Day 3",date:moment(D).add(2,'days')}
var DAYS = [DAY1,DAY2,DAY3]

Meteor.methods({
  getFahrplan: function() {
    var out = "";
    out += addHeader(" ", 0, 0)
    out += addHeader("[TBD]", 0, 0)
    out += addHeader(" ", 0, 0)
    for (const day of DAYS){
      out += addHeader(day.name)
      out += addHeader('...')
      Tracks.find({},{sort:{order:1}}).forEach(function(track){
        Submissions.find({
          $and: [
            { track: { $ne: [null, false, '0'] } },
            { track: track._id },
            // { date_start: { $gte: day.date } },
            // { date_start: { $lt: moment(day.date).add(1,'day') } },
          ]
        }, {
          sort: {
            date_start: 1,
            minutes: 1
          }
        }).forEach(function(sub) {
          out += addHeader(sub.date_start)
          out += addHeader(sub.title)
          out += addLine(sub.text, 1)
          out += addLine('---')
        })
      })
    }
    return out
  }
})

Meteor.methods({
  getFahrplanJson: function(){
    var out = {}
    for (const day of DAYS){
      out[day.name] = []
      Tracks.find({},{sort:{order:1}}).forEach(function(track){
        var p = out[day.name]
        p[track.name] = []
        Submissions.find({
          $and: [
            { track: { $ne: [null, false, '0'] } },
            { track: track._id },
            // { date_start: { $gte: day.date } },
            // { date_start: { $lt: moment(day.date).add(1,'day') } },
          ]
        },{
          sort: {
            date_start: 1,
            minutes: 1
          }
        },{
          fields: {
            _id: -1,
            // owner: -1,
            // date_created: -1,
            // date_edited: -1,
            // track: -1,
            // day1:-1,
            // day2:-1,
            // day3:-1
          }
        }).forEach(function(sub) {
          p[track.name].push(sub)
        })
        p.push(p[track.name])

      })
    }
    return out
  }
})
