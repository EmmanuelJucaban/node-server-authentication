const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.methods.comparePassword = function(candidatePassword, userPassword) {
  return bcrypt.compare(candidatePassword, userPassword).then((isMatch)  => {
    if(isMatch) {
      return true
    } else {
      return Promise.reject();
    }
  });
};

UserSchema.pre('save', async function(next) {
  const user = this;

  if(user.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
  } else {
    next();
  }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
