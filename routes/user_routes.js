const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/configureUser', userController.configureUser);

router.delete('/:id', userController.deleteUser);

module.exports = router;
