'use strict';
require('./init');
var $ = require('jquery');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var Radio = require('backbone.radio');
var EditorView = require('./views/editor');
var _ = require('underscore');
var exampleChannel = Radio.channel('example');

var examples = new Backbone.Collection([{
  id: 'hello',
  code: '<?php echo("Hello world!"); ?>'
},{
  id: 'printf',
  code: '<?php printf("php is number %d", "1"); ?>'
},{
  id: 'loop',
  code: '<?php for ($i = 1; $i <= 10; $i++) { \necho $i; \n} ?>'
}]);

var ExampleLink = Marionette.ItemView.extend({
  tagName: "li",
  template: _.template("<a href='#' data-example='<%-id%>'><%-id%></a>"),
  events: {
    'click': 'showExample'
  },
  showExample: function(e){
    e.preventDefault();
    var exampleID = this.$('a').attr('data-example');
    var code = examples.find({id: exampleID});
    exampleChannel.command('show:example', code);
  }
});

var ExampleView = Marionette.CollectionView.extend({
  tagName: 'ul',
  el: '#examples',
  childView: ExampleLink
});

$(document).ready(function(){
  (new ExampleView({
    collection: examples
  })).render();
  (new EditorView()).render();
});
