const mongoose = require('mongoose');
const employerSchema = require('./employer.schema');

const employerModel = mongoose.model('Employer', employerSchema, 'Employer');

employerModel.createEmployer = (employer) => {
  return employerModel.create(employer);
};

employerModel.findAllEmployers = () => {
  return employerModel.find();
};

module.exports = employerModel;
