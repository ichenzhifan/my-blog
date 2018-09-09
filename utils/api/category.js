const validator = require('../validate');
const math = require('../math');
const Category = require('../../models/Categories');
const categoryHelper = require('../query/category');

const add = (req, res, next, responseData) => {
	const {name} = req.body;

	if (validator.isEmpty(name)) {
		responseData.code = 1;
		responseData.message = 'the name is empty';
		res.json(responseData);
		return;
	}

	Category.findOne({
		name
	}).then(category => {
		if (category) {
			responseData.code = 3;
			responseData.message = 'the name is added';
			res.json(responseData);
			return
		}

		return new Category({
			name
		}).save();
	}).then(newCategory => {
		responseData.code = 200;
		responseData.message = 'success';
		responseData.data = {
			id: newCategory._id,
			name: newCategory.name
		};

		res.json(responseData);
	});
};

const edit = (req, res, next, responseData) => {
	const {name, id} = req.body;

	if (validator.isEmpty(name)) {
		responseData.code = 1;
		responseData.message = 'the name is empty';
		res.json(responseData);
		return;
	}

	Category.findByIdAndUpdate(id, {
		name
	}).then(category => {
		responseData.code = 200;
		responseData.message = 'success';
		responseData.data = {
			id: category._id,
			name: category.name
		};

		res.json(responseData);
	});
};

const remove = (req, res, next, responseData) => {
	const {id} = req.query;

	if (validator.isEmpty(id)) {
		responseData.code = 1;
		responseData.message = 'the id is empty';
		res.json(responseData);
		return;
	}

	Category.findByIdAndRemove(id).then(category => {
		if (category) {
			responseData.code = 200;
			responseData.message = 'success';
			res.json(responseData);
			return;
		}

		responseData.code = 2;
		responseData.message = `remove failed, id: ${id} is not found in db`;
		res.json(responseData);
	});
};

const list = (req, res, next, responseData) => {
	categoryHelper.count().then(total => {
		const pages = Math.ceil(total/req.size);

		categoryHelper.getAll(req.page, req.size).then(categories => {
			responseData.code = 200;
			responseData.message = 'success';
			responseData.data = categories;
			res.json(responseData);
		});
	});
};


module.exports = {
	add,
	remove,
	edit,
	list
};