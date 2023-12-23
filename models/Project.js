const mongoose = require('mongoose');
const Todo = require('./todo');

const projectSchema = new mongoose.Schema({
  _id: String,
  userID: String,
  title: String,
  tasks: [],
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
