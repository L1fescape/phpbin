var db = require('../db');
var Schema = db.Schema;
var hash = require('mongoose-hash');

// Define the schema
var SnippetSchema = new Schema({
  snippet_id: String,
  content: String
});

SnippetSchema.plugin(hash, {
  field: 'snippet_id',
  size: 6
});

module.exports = db.model('Snippet', SnippetSchema);
