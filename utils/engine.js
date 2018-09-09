const swig = require('swig');

exports.config = app => {
	app.engine('html', swig.renderFile);
	app.set('views', './views');
	app.set('view engine', 'html');

	// 开发时, 关闭缓存.
	swig.setDefaults({
		cache: false
	});
};