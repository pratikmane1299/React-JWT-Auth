const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.pre('save', async function() {
  this.password = await this.hashPassword();
});

userSchema.methods.hashPassword = async function () {
  const saltRounds = 12;
  return bcrypt.hash(this.password, saltRounds);
}

module.exports = mongoose.model('User', userSchema);