'use strict';
var _ = require('underscore');
var $ = require('jquery');
var PHP = require('phpvm');

var scripts = {
  hello : "<?php echo('Hello world!'); ?>",
  printf : "<?php printf('php is number %d', '1'); ?>",
  loop : "<?php for ($i = 1; $i <= 10; $i++) { \necho $i; \n} ?>"
};

$(document).ready(function(){
  $('#eval').click(function(){
    var source = $('#source').val();
    var path = window.location.pathname;
    var options = {
      root : '/',
      SERVER: {
        SCRIPT_FILENAME: path.substring(0, path.length - 1)
      }
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

  $('#save').click(function(){
    var source = $('#source').val();
    console.log(source);
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
  });
  
  
  // check if we should load a snippet
  var pathname = window.location.pathname.split('/s/');
  if (pathname.length > 1){
    var snippetID = pathname[1].replace('/', '');
    $.ajax({
      url: '/api/snippet/' + snippetID
    }).done(function(data){
      if (data.success){
        var content = data.results[0].content;
        $('#source').val(content);
        $('#eval').click();
      }
    });
  }
});

