
const wrap = fn => {
	const promise = new Promise((resolve, reject) => {
		fn(resolve, reject);
	});

	return promise;
};

module.exports = {
	wrap
};