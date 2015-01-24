var Q = require('q');
var Snippet = require('../models/snippet');

module.exports = {
  create: function( info ){
    var defer = Q.defer();

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
    var defer = Q.defer();

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
