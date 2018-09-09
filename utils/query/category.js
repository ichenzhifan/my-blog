const Category = require('../../models/Categories');
const promise = require('../promise');
const contentHelper = require('./content');

const getAll = (page = 1, size = 0) => {
	const limit = size;
	const skip = (page -1) * limit;

	return promise.wrap((resolve, reject) => {
		Category.find()
			.populate('contents')
			.limit(limit)
			.skip(skip)
			.then(list => {
				contentHelper.getAll().then(contents => {
					const newList = list.map(item => {
						const count = contents.filter(m => {
							if(m.category && m.category._id){
								return m.category._id.toString() === item._id.toString();
							}

							return false;
						}).length;
						item.count = count;

						return item;
					});

					resolve(newList);
				}, () => resolve(list));
			})
			.catch(ex => reject());
	});
};

const count = opts => {
	return promise.wrap((resolve, reject) => {
		Category.countDocuments(opts).then((num) => {
			resolve(num);
		});
	});
};

const findById = (id) => {
	return promise.wrap((resolve, reject) => {
		Category.findById(id)
			.populate('contents')
			.then(item => resolve(item))
			.catch(ex => reject());
	});
};

module.exports = {
	getAll,
	count,
	findById
};