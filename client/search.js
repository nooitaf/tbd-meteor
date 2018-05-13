Template.search.events({
  'keyup input': function(e,t){
    var query = String(t.find('input[name=searchInput]').value)
    Session.set('searchQuery',query)
  }
})

Template.search.helpers({
  items: function(){
    var mongoDbArr = [];
    var searchArray = Session.get('searchQuery').split(" ")
    searchArray.forEach(function(text) {
        mongoDbArr.push({title: new RegExp(text)});
        mongoDbArr.push({text: new RegExp(text,"im")});
    });
    var tracksArr = []
    var tracks = Tracks.find().fetch()
    tracks.forEach(function(track){
      tracksArr.push({track:track._id})
    })
    return Submissions.find({ $and:[{$or: mongoDbArr},{$or: tracksArr}] }, {sort:{notime:1,date_start:1}})
  }
})


Template.searchlisting.events({
  'click .searchlisting':function(){
    // console.log(this._id)
    var openItems = Session.get('search-open-items') || []
    if (_.contains(openItems,this._id)){
      openItems = _.without(openItems,this._id)
    } else {
      openItems.push(this._id)
    }
    Session.set('search-open-items', openItems)
  }
})
UI.registerHelper('showInfoSearch', function(subId){
  var openItems = Session.get('search-open-items') || []
  return _.contains(openItems,subId)
})
