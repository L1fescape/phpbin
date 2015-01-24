var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/phpbin');

module.exports = mongoose;
