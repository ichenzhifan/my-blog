const mongoose = require('mongoose');
const UserSchema = require('../schemas/users');

module.exports = mongoose.model('User', UserSchema);