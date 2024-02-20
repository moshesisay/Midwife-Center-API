const mongoose = require('mongoose');
const User = require('./User');

const doctorSchema = new mongoose.Schema({
  isAdmin: {
    type: Boolean,
    default: true,
  },
  specialization: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  qualification: {
    type: String,
    required: true
  },
});


// Define a discriminator for the Doctor model
module.exports = User.discriminator('Doctor', doctorSchema);