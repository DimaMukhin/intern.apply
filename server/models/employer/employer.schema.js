const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employerSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = employerSchema;
