const Content = require('../../models/Content');
const promise = require('../promise');

const getAll = (page = 1, size = 0) => {
	const limit = size;
	const skip = (page -1) * limit;

	return promise.wrap((resolve, reject) => {
		Content.find()
			.populate('category')
			.limit(limit)
			.skip(skip)
			.then(list => resolve(list))
			.catch(ex => reject());
	});
};

const count = opts => {
	return promise.wrap((resolve, reject) => {
		Content.countDocuments(opts).then((num) => {
			resolve(num);
		});
	});
};

const findById = (id) => {
	return promise.wrap((resolve, reject) => {
		Content.findById(id)
			.populate('category')
			.then(item => resolve(item)).catch(ex => reject());
	});
};

module.exports = {
	getAll,
	count,
	findById
};