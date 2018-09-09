const express = require('express');
const router = express.Router();
const user = require('../utils/api/user');
const category = require('../utils/api/category');
const content = require('../utils/api/content');

let responseData;

// 定义标准的返回格式. 每个api的返回值的格式都是固定的.
router.use((req, res, next) => {
	responseData = {
		code: '',
		message: '',
		data: null
	};

	next();
});

router.get('/user', (req, res, next) => {
	res.send('user');
});

router.post('/user/register', (req, res, next) => {
	user.register(req, res, next, responseData);
});

router.post('/user/login', (req, res, next) => {
	user.login(req, res, next, responseData);
});

router.get('/user/logout', (req, res, next) => {
	user.logout(req, res, next, responseData);
});

router.post('/category/add', (req, res, next) => {
	category.add(req, res, next, responseData);
});

router.post('/category/edit', (req, res, next) => {
	category.edit(req, res, next, responseData);
});

router.get('/category/remove', (req, res, next) => {
	category.remove(req, res, next, responseData);
});

router.post('/content/add', (req, res, next) => {
	content.add(req, res, next, responseData);
});

router.post('/content/edit', (req, res, next) => {
	content.edit(req, res, next, responseData);
});

router.get('/content/remove', (req, res, next) => {
	content.remove(req, res, next, responseData);
});

module.exports = router;