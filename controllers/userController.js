const User = require('../models/User');

const addUser = (req, res) => {
  const { name, email, phone, fcmToken } = req.body;

  const user = new User({
    name: name,
    email: email,
    phone: phone,
    fcmToken: fcmToken,
  });

  user
    .save()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error adding user');
    });
};

const configureUser = (req, res) => {
  const { name, email, phone, fcmToken } = req.body;

  User.find({ fcmToken: fcmToken }).then((result) => {
    console.log(result);
    if (result.length == 0) {
      const user = new User({
        name: name,
        email: email,
        phone: phone,
        fcmToken: fcmToken,
      });

      user
        .save()
        .then((response) => {
          console.log(response);
          res.status(200).json(response);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send('Error adding user');
        });
    } else {
      res.send('User exists');
    }
  });
};

const deleteUser = (req, res) => {
  const id = req.params.id;

  User.findByIdAndDelete(id)
    .then((result) => {
      res.status(200).send('User deleted Successfully');
    })
    .catch((err) => {
      res.status(500).send('Error deleting User');
    });
};

module.exports = {
  addUser,
  deleteUser,
  configureUser,
};
