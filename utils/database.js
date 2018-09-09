const mongoose = require('mongoose');

exports.config = (cb) => {
	const promise = new Promise((resolve, reject) => {
		mongoose.connect('mongodb://localhost:27017/blog', err => {
			if (err) {
				console.log('data connect failed');
				reject(err);
			} else {
				console.log('connect successful')
				resolve();
			}
		});
	});

	return promise;
};