'use strict';
var _ = require('underscore');
var $ = require('jquery');

var scripts = {
  hello : "echo('Hello world!');",
  printf : "printf('php is number %d', '1');",
  loop : "for ($i = 1; $i <= 10; $i++) { \necho $i; \n}"
};

$(document).ready(function(){
  $('#eval').click(function(){
    var source = $('#source').val();
    if (source.substring(0, 6) !== '<?php '){
      source = '<?php ' + source + ' ?>';
    }
    var path = window.location.pathname;
    var options = {
      SERVER: {
        SCRIPT_FILENAME: path.substring(0, path.length - 1)
      },
      filesystem: new PHP.Adapters.XHRFileSystem()
    };

    var engine = new PHP(source, options);
    var output = engine.vm.OUTPUT_BUFFER;
    $('#output').html(output);
  });

  $('ul a').click(function(e){
    e.preventDefault();
    var source = scripts[$(this).attr('data-source')];
    if (source){ 
      $('#source').val(source);
    }
  });
});

