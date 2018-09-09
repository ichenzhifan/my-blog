const validator = require('../validate');
const math = require('../math');
const Content = require('../../models/Content');
const contentHelper = require('../query/content');

const add = (req, res, next, responseData) => {
	const {
		category,
		title,
		description,
		content
	} = req.body;

	if (validator.isEmpty(category) ||
		validator.isEmpty(title) ||
		validator.isEmpty(content)) {
		responseData.code = 1;
		responseData.message = 'Category, title and content fields are required';
		res.json(responseData);
		return;
	}

	new Content({
		category,
		title,
		description,
		content
	}).save().then(newContent => {
		responseData.code = 200;
		responseData.message = 'success';
		responseData.data = {
			id: newContent._id.toString(),
			category: newContent.category.toString(),
			title: newContent.title,
			description: newContent.description,
			content: newContent.content
		};

		res.json(responseData);
	});
};

const edit = (req, res, next, responseData) => {
	const {
		id,
		category,
		title,
		description,
		content
	} = req.body;

	if (validator.isEmpty(category) ||
		validator.isEmpty(title) ||
		validator.isEmpty(content)) {
		responseData.code = 1;
		responseData.message = 'Category, title and content fields are required';
		res.json(responseData);
		return;
	}

	Content.findByIdAndUpdate(id, {
		category,
		title,
		description,
		content
	}).then(item => {
		responseData.code = 200;
		responseData.message = 'success';
		responseData.data = {
			id,
			category,
			title,
			description,
			content
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

	Content.findByIdAndRemove(id).then(item => {
		if (item) {
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
	contentHelper.count().then(total => {
		const pages = Math.ceil(total/req.size);

		contentHelper.getAll(req.page, req.size).then(categories => {
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