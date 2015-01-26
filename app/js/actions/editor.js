var EditorDispatcher = require('../dispatcher/editor');
var EditorStore = require('../stores/editor');
var SnippetAPIUtils = require('../utils/API');
var PHP = require('phpvm');

var EditorActions = {
  evaluateCode: function(source){
    var path = window.location.pathname;
    var options = {
      cfgFile : '/cfg/php.ini',
      SERVER: {
        SCRIPT_FILENAME: path.substring(0, path.length - 1)
      }
    };
    var engine = new PHP(source, options);
    var output = engine.vm.OUTPUT_BUFFER;
    this.showCode({
      source: source,
      result: output
    });
  },

  showCode: function(result){
    EditorDispatcher.handleViewAction({
      type: 'showCode',
      result: result
    });
  },

  saveCode: function(){
    var source = EditorStore.get().source;
    SnippetAPIUtils.saveSnippet(source);
  }
};

module.exports = EditorActions;
