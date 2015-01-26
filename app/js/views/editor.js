var $ = require('jquery');
var Marionette = require('backbone.marionette');
var Radio = require('backbone.radio');
var _ = require('underscore');
var PHP = require('phpvm');
var template = require('../../templates/editor.handlebars');

var exampleChannel = Radio.channel('example');
var codeChannel = Radio.channel('code');

module.exports = Marionette.ItemView.extend({
  el: '#editor',
  template: template,
  initialize: function(){
    exampleChannel.comply('show:example', _.bind(function(model){
      var code = model.get('code');
      this.$('textarea').val(code);
    }, this));

    codeChannel.comply('eval:result', _.bind(this.evaluateCode, this));
    codeChannel.comply('save:result', _.bind(this.saveCode, this));

    // check if we should load a snippet
    // TODO this should be done in a router
    var pathname = window.location.pathname.split('/s/');
    if (pathname.length > 1){
      var snippetID = pathname[1].replace('/', '');
      $.ajax({
        url: '/api/snippet/' + snippetID
      }).done(_.bind(function(data){
        if (data.success){
          var content = data.results[0].content;
          this.$('textarea').val(content);
          codeChannel.command('eval:result');
        }
      }, this));
    }
  },
  evaluateCode: function(){
    var source = this.$('textarea').val();
    var path = window.location.pathname;
    var options = {
      cfgFile : '/cfg/php.ini',
      SERVER: {
        SCRIPT_FILENAME: path.substring(0, path.length - 1)
      }
    };
    var engine = new PHP(source, options);
    var output = engine.vm.OUTPUT_BUFFER;
    this.showResult(output);
  },
  saveCode: function(){
    var source = this.$('textarea').val();
    $.ajax({
      url: '/api/snippet/',
      type: 'POST',
      data: {
        content: source
      }
    }).done(function(data){
      if (data.success){
        var snippetID = data.results[0].snippet_id;
        window.location.pathname = '/s/' + snippetID;
      }
    });
  },
  showResult: function(result){
    this.$('#result').html(result);
  }
});

