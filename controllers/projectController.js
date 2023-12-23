const Project = require('../models/Project');
const Todo = require('../models/todo');
const { v4: uuidv4 } = require('uuid');

const addProject = (req, res) => {
  const project = new Project({
    _id: uuidv4(),
    userID: req.body.userID,
    title: req.body.title,
    tasks: {},
  });

  project
    .save()
    .then((result) => {
      res.status(200).json(result._id);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error adding Project');
    });
};

const getProjects = (req, res) => {
  const userID = req.params.id;
  Project.find({ userID: userID })
    .populate('tasks')
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error finding project');
    });
};

const deleteProject = (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(400).send('Id Not found');
  }

  Project.findByIdAndDelete(id).then((result) => {
    res.status(200).send(`${id} deleted Successfully`);
  });
};

const addTasktoProject = (req, res) => {
  const { projectID, userID, title } = req.body;

  Project.findById(projectID)
    .then((result) => {
      if (!result) {
        res.status(400).send('Project not found');
      }

      result.tasks.push({
        _id: uuidv4(),
        title: title,
        isCompleted: false,
        userID: userID,
      });
      result.save();
      res.status(200).send('Task saved');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error adding tasks');
    });
};

const updateInProject = (req, res) => {
  console.log('jere');
  const { projectID, taskID, taskStatus } = req.body;

  Project.findById({ _id: projectID })
    .then((result) => {
      if (!result) {
        res.status(400).send('Project not found');
      }

      result.tasks.forEach((element) => {
        if (element._id == taskID) {
          element.isCompleted = taskStatus;
        }
      });
      result.markModified('tasks');
      result.save();
      res.status(200).send('Task updated successfully');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error updating task');
    });
};

const removeTaskFromProject = (req, res) => {
  const { projectID, taskID } = req.body;

  Project.findById(projectID)
    .then((result) => {
      if (!result) {
        res.status(400).send('Project not found');
      }

      result.tasks.forEach((task, index) => {
        if (task._id == taskID) {
          result.tasks.splice(index, 1);
        }
      });
      result.markModified('tasks');
      result.save();
      res.status(200).send('Task deleted successfully');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error updating task');
    });
};

module.exports = {
  addProject,
  deleteProject,
  addTasktoProject,
  getProjects,
  updateInProject,
  removeTaskFromProject,
};

/* {
  id of project
  title 
  isCompleted
} */
