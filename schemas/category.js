const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	name: String,
	disable: {
		type: Boolean,
		default: false
	}
});

module.exports = schema;