const express = require('express');
const router = express.Router();
const admin = require('../utils/api/admin');

/***
 * 权限判断.
 */
router.use((req, res, next) => {
	if(!req.userInfo.isAdmin){
		res.render('admin/denied.html');
		return;
	}
	next();
});

router.get('/', (req, res, next) => {
	admin.home(req, res, next);
});

router.get('/user', (req, res, next) => {
	admin.users(req, res, next);
});

router.get('/category', (req, res, next) => {
	admin.categories(req, res, next);
});

router.get('/category/add', (req, res, next) => {
	admin.addCategory(req, res, next);
});

router.get('/category/edit', (req, res, next) => {
	admin.editCategory(req, res, next);
});

router.get('/content', (req, res, next) => {
	admin.contents(req, res, next);
});

router.get('/content/add', (req, res, next) => {
	admin.addContent(req, res, next);
});

router.get('/content/edit', (req, res, next) => {
	admin.editContent(req, res, next);
});

module.exports = router;