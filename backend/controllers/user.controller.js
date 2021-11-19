const db = require("../models");
const User = db.user;
const Post = db.post;
const Comment = db.comment;

module.exports.getAllUsers = async (req, res) => {
  User.findAll({
      where: {id: { [Op.gt]: 0 }} 
  })    
  .then( (found) => {
      res.status(200).json({ found }) 
  })
  .catch((error) => { 
      res.status(400).json({ error }) 
  })
}

module.exports.userInfo = (req, res) => {
  const userData = {}
  User.findOne({ where: { id: req.params.id }})
  .then(user => {
      userData.id = user.id
      userData.pseudo = user.pseudo
      userData.email = user.email
      userData.picture = user.picture
      userData.bio = user.bio
  })
  .then(() => {
      Post.count({ where: { id: req.params.id }})
      .then(total => { 
          userData.totalMessages = total
      })
  })  
  .then(() => {
      Comment.count({ where: { id: req.params.id }})
      .then( total => { 
          userData.totalComments = total
          res.status(200).json(userData)
      })
  })
  .catch(error => res.status(404).json({ error }))
}

  module.exports.updateUser = async (req, res) => {
    const id = req.params.id;

    User.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
  };

  module.exports.deleteUser = async (req, res) => {
    const id = req.params.id;

    User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
  };

  