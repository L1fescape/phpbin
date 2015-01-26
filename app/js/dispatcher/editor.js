var Dispatcher = require('flux').Dispatcher;
var _ = require('underscore');

module.exports = _.extend(new Dispatcher(), {
  handleViewAction: function(action) {
    var payload = {
      action: action
    };
    this.dispatch(payload);
  }
});
