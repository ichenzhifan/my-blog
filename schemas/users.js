const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	username: String,
	password: String,

	isAdmin: {
		type: Boolean,
		default: false
	}
});

module.exports = schema;