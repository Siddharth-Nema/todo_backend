const Todo = require('../models/todo');

const addTodo = (req, res) => {
  console.log(req.body);
  const title = req.body.title;

  if (!title) {
    res.status(400).send('Title not found');
  }
  const isCompleted = req.body.isCompleted ?? false;

  const todo = new Todo({
    title: title,
    isCompleted: isCompleted,
  });
  todo
    .save()
    .then((result) => {
      console.log('Todo Added');
      res.status(200).send('Added');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error');
    });
};

const updateTodo = (req, res) => {
  const { id, status } = req.body;

  if (!id || !status) {
    res.status(400).send('Request data incomplete');
  }

  Todo.findByIdAndUpdate(id, {
    $set: {
      isCompleted: status,
    },
  })
    .then((result) => {
      res.status(200).send('todo updated');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error');
    });
};

const deleteTodo = (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(400).send('Id found');
  }

  Todo.findByIdAndDelete(id).then((result) => {
    res.status(200).send(`${id} deleted Successfully`);
  });
};

const getTodo = (req, res) => {
  Todo.find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error');
    });
};

module.exports = {
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo,
};
