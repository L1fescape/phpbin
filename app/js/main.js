'use strict';
require('./init');
var $ = require('jquery');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var Radio = require('backbone.radio');
var EditorView = require('./views/editor');
var HeaderView = require('./views/header');
var _ = require('underscore');

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

$(document).ready(function(){
  (new HeaderView({ examples: examples })).render();
  (new EditorView()).render();
});
