const validator = require('../validate');
const math = require('../math');
const User = require('../../models/Users');

const login = (req, res, next, responseData) => {
	const {username, password} = req.body;

	if (validator.isEmpty(username)) {
		responseData.code = 1;
		responseData.message = 'the username is empty';
		res.json(responseData);
		return;
	}

	if (validator.isEmpty(password)) {
		responseData.code = 2;
		responseData.message = 'password is empty';
		res.json(responseData);
		return;
	}

	User.findOne({
		username,
		password
	}).then(userInfo => {
		if (userInfo) {
			responseData.code = 200;
			responseData.message = 'success';
			responseData.data = {
				id: userInfo.id,
				username: userInfo.username
			};

			req.cookies.set('userInfo', JSON.stringify({
				_id: userInfo._id,
				username: userInfo.username
			}));
			res.json(responseData);
			return
		}

		responseData.code = 3;
		responseData.message = 'username or password is incorrect';
		res.json(responseData);
	});
};

const logout = (req, res, next, responseData) => {
	responseData.code = 200;
	responseData.message = 'success';
	responseData.data = null;

	req.cookies.set('userInfo', '');
	res.json(responseData);
};

const register = (req, res, next, responseData) => {
	const {username, password, repassword} = req.body;

	if (validator.isEmpty(username)) {
		responseData.code = 1;
		responseData.message = 'the username is empty';
		res.json(responseData);
		return;
	}

	if (validator.isEmpty(password) || !validator.isEqual(password, repassword)) {
		responseData.code = 2;
		responseData.message = 'password is empty or the twice is not equal';
		res.json(responseData);
		return;
	}

	User.findOne({
		username
	}).then(userInfo => {
		if (userInfo) {
			responseData.code = 3;
			responseData.message = 'the user is registed';
			res.json(responseData);
			return
		}

		const user = new User({
			username,
			password
		});

		return user.save();
	}).then(newUserInfo => {
		responseData.code = 200;
		responseData.message = 'success';
		responseData.data = {
			id: newUserInfo._id,
			username: newUserInfo.username
		};

		req.cookies.set('userInfo', JSON.stringify({
			_id: newUserInfo._id,
			username: newUserInfo.username
		}));
		res.json(responseData);
	});
};

module.exports = {
	register,
	login,
	logout
};