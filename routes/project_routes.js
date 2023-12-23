const express = require('express');
const projectController = require('../controllers/projectController');

const router = express.Router();

router.get('/:id', projectController.getProjects);

router.post('/add', projectController.addProject);

router.delete('/:id', projectController.deleteProject);

router.post('/addToProject', projectController.addTasktoProject);

router.post('/updateInProject', projectController.updateInProject);

router.post('/removeTaskFromProject', projectController.removeTaskFromProject);

module.exports = router;
