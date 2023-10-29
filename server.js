const express = require('express');
const todoRoutes = require('./routes/todo_routes');
const mongoose = require('mongoose');

const app = express();
require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/todo', todoRoutes);

const uri = process.env.DB_URL;

mongoose
  .connect(uri)
  .then(() => {
    console.log('Connected');
    app.listen(process.env.PORT, () => {
      console.log('Server started on port 3000');
    });
  })
  .catch((err) => {
    console.log('error');
  });

app.get('/', (req, res) => {
  console.log(req.body);
  res.send('Welcome to ToDo');
});
