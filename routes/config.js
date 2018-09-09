const admin = require('./admin');
const appRoutes = require('./app');
const api = require('./api');

exports.config = app => {
	app.use('/admin', admin);
	app.use('/api', api);
	app.use('/', appRoutes);
};
