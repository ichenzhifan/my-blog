const User = require('../../models/Users');
const promise = require('../promise');

const isAdmin = (id) => {
	return promise.wrap((resolve, reject) => {
		User.findById(id, (err, userInfo = {}) => {
			if (err) {
				resolve(false)
			} else {
				resolve(!!userInfo.isAdmin);
			}
		});
	});
};

const getAll = (page = 1, size = 0) => {
	const limit = size;
	const skip = (page -1) * limit;

	return promise.wrap((resolve, reject) => {
		User.find().limit(limit).skip(skip).then(list => resolve(list)).catch(ex => reject());
	});
};

const count = opts => {
	return promise.wrap((resolve, reject) => {
		User.countDocuments(opts).then((num) => {
			resolve(num);
		});
	});
};

module.exports = {
	isAdmin,
	getAll,
	count
};