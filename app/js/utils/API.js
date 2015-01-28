var qwest = require('qwest');

module.exports = {
  getIDFromURL: function(url){
    var snippetID = null;
    url = url || window.location.pathname;
    url = url.split('/s/');
    if (url.length > 1){
      snippetID = url[1].replace('/', '');
    }
    return snippetID;
  },

  getSnippet: function(id, cb) {
    if (!id){
      return;
    }
    var url = '/api/snippet/' + id;
    qwest.get(url).then(cb);
  },

  saveSnippet: function(source) {
    var url = '/api/snippet/';
    qwest.post(url, {
      content: source
    }).then(function(data){
      data = JSON.parse(data);
      if (data.success){
        var snippetID = data.results[0].snippet_id;
        window.location.pathname = '/s/' + snippetID;
      }
    });
  }
};
