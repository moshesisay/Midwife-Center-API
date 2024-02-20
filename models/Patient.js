const mongoose = require('mongoose');
const User = require('./User');

const patientSchema = new mongoose.Schema({
  dateOfBirth: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
});


// Define a discriminator for the Patient model
module.exports = User.discriminator('Patient', patientSchema);