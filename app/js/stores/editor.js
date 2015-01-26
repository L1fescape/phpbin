var EditorDispatcher = require('../dispatcher/editor');
var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');

var CHANGE_EVENT = 'change';
var _code = {
  source : '',
  result : ''
};

var CodeStore = _.extend({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  get: function() {
    return _code;
  }
});

CodeStore.dispatchToken = EditorDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {

    case 'showCode':
      _code = action.result;
      CodeStore.emitChange();
      break;

    default:
      // do nothing
  }

});

module.exports = CodeStore;
