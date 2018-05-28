// Global API configuration
//https://github.com/kahmali/meteor-restivus#response-data
var md = require('markdown-it')();
// full options list (defaults)
var md = require('markdown-it')({
  html: true, // Enable HTML tags in source
  xhtmlOut: false, // Use '/' to close single tags (<br />).
  // This is only for full CommonMark compatibility.
  breaks: false, // Convert '\n' in paragraphs into <br>
  langPrefix: 'language-', // CSS language prefix for fenced blocks. Can be
  // useful for external highlighters.
  linkify: false, // Autoconvert URL-like text to links

  // Enable some language-neutral replacement + quotes beautification
  typographer: false,

  // Double + single quotes replacement pairs, when typographer enabled,
  // and smartquotes on. Could be either a String or an Array.
  //
  // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
  // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
  quotes: '“”‘’',

  // Highlighter function. Should return escaped HTML,
  // or '' if the source string is not changed and should be escaped externaly.
  // If result starts with <pre... internal wrapper is skipped.
  // highlight: function (/*str, lang*/) { return ''; }
});

// NOJS
var Api_NoJS = new Restivus({
  useDefaultAuth: false,
  prettyJson: true,
  apiPath: 'noscript'
});
var HTMLHEAD = '<!doctype html><html><head><meta charset="utf-8"/><link rel="stylesheet" type="text/css" href="/noscript.css"><title>tbd-noscript</title></head><body><div class="main">'
Api_NoJS.addRoute('', {
  authRequired: false,
  defaultHeaders: ''
}, {
  get: function() {
    var out = ""
    out += HTMLHEAD
    out += md.render('---')
    out += md.render('<h1>/home</h1>')
    out += md.render('---')
    out += md.render(Meta.findOne().text_home) || ""
    out += md.render('---')
    out += md.render('<h1>/cfp</h1>')
    out += md.render('---')
    out += md.render(Meta.findOne().text_cfp) || ""
    out += md.render('---')
    out += md.render('<h1>/faq</h1>')
    out += md.render('---')
    out += md.render(Meta.findOne().text_faq) || ""
    out += md.render('---')
    out += "</div></body></html>"
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html'
      },
      body: out
    }
  }
});

Api_NoJS.addRoute('fahrplan.txt', {
  authRequired: false,
  defaultHeaders: ''
}, {
  get: function() {
    var out = ""
    out += Meteor.call('getFahrplan')
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html'
      },
      body: out
    }
  }
});

Api_NoJS.addRoute('fahrplan.json', {
  authRequired: false,
  defaultHeaders: ''
}, {
  get: function() {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html'
      },
      body: JSON.stringify(Meteor.call('getFahrplanJson'))
    }
  }
});

Api_NoJS.addRoute('docs/api', {
  authRequired: false,
  defaultHeaders: ''
}, {
  get: function() {
    var out = ""
    out += HTMLHEAD
    out += md.render('---')
    out += md.render('<h1>/api</h1>')
    out += md.render('---')
    out += md.render(Meta.findOne().text_api) || ""
    out += "</div></body></html>"
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html'
      },
      body: out
    }
  }
});
