var Marionette = require('backbone.marionette');
var Radio = require('backbone.radio');
var _ = require('underscore');
var exampleChannel = Radio.channel('example');

module.exports = Marionette.ItemView.extend({
  tagName: "li",
  template: _.template("<a href='#' data-example='<%-id%>'><%-id%></a>"),
  events: {
    'click': 'showExample'
  },
  showExample: function(e){
    e.preventDefault();
    exampleChannel.command('show:example', this.model);
  }
});
