const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category'
	},

	title: {
		type: String,
		default: ''
	},

	description: {
		type: String,
		default: ''
	},

	content: {
		type: String,
		default: ''
	}
});

module.exports = schema;