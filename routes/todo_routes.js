const express = require('express');
const todoController = require('../controllers/todoController');

const router = express.Router();

router.get('/', todoController.getTodo);

router.post('/add', todoController.addTodo);

router.delete('/:id', todoController.deleteTodo);

router.put('/', todoController.updateTodo);

module.exports = router;
