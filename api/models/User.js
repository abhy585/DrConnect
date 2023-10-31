const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const UserSchema = new Schema({
  id: {type: String, required: true, min: 4, unique: true},
});

const UserModel = model('User', UserSchema);

module.exports = UserModel;