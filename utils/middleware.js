const bodyParser = require('body-parser');
const cookies = require('cookies');
const userHelper = require('./query/user');

exports.config = app => {
	app.use(bodyParser.urlencoded({
		extended: true
	}));


	// 配置自定义属性.在req下挂载两个新的属性, 方便后期使用.
	app.use(function (req, res, next) {
		const query = req.query;

		const page = Number(query.page || 1);
		const size = Number(query.size || 0);

		req.page = page >= 1 ? page: 1;
		req.size = size;

		next();
	});

	// 设置cookie.
	app.use(function (req, res, next) {
		req.cookies = new cookies(req, res);

		if(req.cookies.get('userInfo')){
			try {
				req.userInfo = JSON.parse(req.cookies.get('userInfo'));

				userHelper.isAdmin(req.userInfo._id).then(isAdmin => {
					req.userInfo.isAdmin = isAdmin;
					next();
				});
			}catch (ex){
				next();
			}
		} else{
			next();
		}
	});
};
