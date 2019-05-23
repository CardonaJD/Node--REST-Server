const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let validRoles = {
  values: ['ADMIN_ROLE', 'USER_ROLE'],
  message: '{VALUE} is not a valid role'
};

let Schema = mongoose.Schema;

let userSchem = new Schema({
  nombre: {
    type: String,
    required: [true, 'The name is required']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'The email is required']
  },
  password: {
    type: String,
    required: [true, 'The password is required']
  },
  img: {
    type: String,
    required: false
  },
  role: {
    type: String,
    default: 'USER_ROLE',
    enum: validRoles
  },
  estate: {
    type: Boolean,
    default: true
  },
  goole: {
    type: Boolean,
    default: false
  }
});

userSchem.methods.toJSON = function(){
  let usuario = this;
  let userObject = usuario.toObject();
  delete userObject.password;

  return userObject;
};

userSchem.plugin(uniqueValidator, {message:'{PATH} must be unique'});
module.exports = mongoose.model('User', userSchem);
