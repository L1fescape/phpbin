var React = require('react');
var Header = require('./components/header');
var Editor = require('./components/editor');
var EditorActions = require('./actions/editor');
var SnippetAPIUtils = require('./utils/API');

window.React = React;

document.addEventListener('DOMContentLoaded', function(){
  React.render(
      <Header />,
      document.getElementById('header')
  );
  React.render(
      <Editor />,
      document.getElementById('editor')
  );

  // load up the current snippet, if there is one
  var snippetID = SnippetAPIUtils.getIDFromURL()
  SnippetAPIUtils.getSnippet(snippetID, function(data){
    data = JSON.parse(data);
    if (data.success){
      var content = data.results[0].content;
      EditorActions.evaluateCode(content);
    }
  });
});
