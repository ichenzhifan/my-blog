const validator = require('../validate');
const math = require('../math');
const User = require('../../models/Users');
const userHelper = require('../query/user');
const categoryHelper = require('../query/category');
const contentHelper = require('../query/content');

const home = (req, res, next) => {
	res.render('admin/index', {
		userInfo: req.userInfo
	});
};

const users = (req, res, next) => {
	userHelper.count().then(total => {
		const pages = Math.ceil(total/req.size);

		userHelper.getAll(req.page, req.size).then(users => {
			res.render('admin/users', {
				userInfo: req.userInfo,
				users,
				page: req.page,
				size: req.size || 2,
				pages,
				total
			});
		});
	});
};

const categories = (req, res, next) => {
	categoryHelper.getAll().then(list => {
		res.render('admin/categories', {
			userInfo: req.userInfo,
			list
		});
	});
};

const addCategory = (req, res, next) => {
	res.render('admin/category_add', {
		userInfo: req.userInfo
	});
};

const editCategory = (req, res, next) => {
	const { id } = req.query;

	categoryHelper.findById(id).then(category => {
		res.render('admin/category_edit', {
			userInfo: req.userInfo,
			category
		});
	});
};


const contents = (req, res, next) => {
	contentHelper.getAll().then(list => {
		res.render('admin/contents', {
			userInfo: req.userInfo,
			list
		});
	});
};

const addContent = (req, res, next) => {
	categoryHelper.getAll().then(categories => {
		res.render('admin/content_add', {
			userInfo: req.userInfo,
			categories
		});
	});
};

const editContent = (req, res, next) => {
	const { id } = req.query;

	categoryHelper.getAll().then(categories => {
		contentHelper.findById(id).then(content => {
			res.render('admin/content_edit', {
				userInfo: req.userInfo,
				categories,
				content
			});
		});
	});
};

module.exports = {
	home,
	users,
	categories,
	addCategory,
	editCategory,
	contents,
	addContent,
	editContent
};