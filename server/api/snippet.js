var Promise = require('bluebird');
var Snippet = require('../models/snippet');

module.exports = {
  create: function( info ){
    var defer = Promise.defer();

    if( !info.content ){
      return defer.reject('Please provide content.');
    }

    Snippet.create({ content: info.content }, function(err, snippet){
      if( err || !snippet ){
        defer.reject('Could not create snippet.');
      } else {
        defer.resolve(snippet);
      }
    });

    return defer.promise;
  },
  find: function( snippetID ){
    var defer = Promise.defer();

    // Check if the snippetId is valid
    if( !snippetID ){
      return defer.reject('You must provide an id.');
    }

    Snippet.findOne({ snippet_id: snippetID }, function(err, snippet){
      if( err || !snippet ){
        defer.reject('Could not find snippet.');
      } else {
        defer.resolve(snippet);
      }
    });

    return defer.promise;
  }
};
