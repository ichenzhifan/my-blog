exports.isEmpty = value => {
	return value === '';
};

exports.isEqual = (v1, v2) => {
	return v1 === v2;
};

exports.isNumber = value => {
	return !isNaN(value);
};

exports.isDate = value => {
	try {
		const v = new Date(value);
		return true;
	} catch (ex) {
		return false;
	}
};