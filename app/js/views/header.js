var $ = require('jquery');
var Marionette = require('backbone.marionette');
var Radio = require('backbone.radio');
var _ = require('underscore');
var PHP = require('phpvm');
var template = require('../../templates/header.handlebars');
var ExampleLink = require('./example-link');

var exampleChannel = Radio.channel('example');
var codeChannel = Radio.channel('code');

var ExampleView = Marionette.CollectionView.extend({
  tagName: 'ul',
  childView: ExampleLink
});

module.exports = Marionette.ItemView.extend({
  el: '#header',
  template: template,
  events : {
    'click #eval' : 'clickEval',
    'click #save' : 'clickSave'
  },
  initialize: function(options){
    this.examples = options.examples;
  },
  onRender: function(){
    this.$('#examples').append(new ExampleView({
      collection: this.examples
    }).render().$el);
  },
  clickEval: function(e){
    e.preventDefault();
    codeChannel.command('eval:result');
  },
  clickSave: function(e){
    e.preventDefault();
    codeChannel.command('save:result');
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

