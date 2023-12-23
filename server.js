const express = require('express');
const todoRoutes = require('./routes/todo_routes');
const userRoutes = require('./routes/user_routes');
const projectRoutes = require('./routes/project_routes');
const mongoose = require('mongoose');

const app = express();
require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/todo', todoRoutes);
app.use('/user', userRoutes);
app.use('/project', projectRoutes);

const uri = process.env.DB_URL;

const port = process.env.PORT || 3000;

mongoose
  .connect(uri)
  .then(() => {
    console.log('Connected');
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((err) => {
    console.log('error');
  });

app.get('/', (req, res) => {
  console.log(req.body);
  res.send('Welcome to ToDo');
});
