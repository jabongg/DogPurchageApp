var mongoose = require('mongoose');

module.exports = mongoose.model('Story', {
    poet: {
        type: String,
        default: ''
    },
	poem : String,
	like : Number
});