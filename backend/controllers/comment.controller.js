const db = require("../models");
const Comment = db.comment;

exports.commentPost = (req, res) => {
    // Validate request
    if (!req.body.text) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Tutorial
    const comment = {
        commentId: req.body.commentId,
        posterId: req.body.posterId,
        commenterPseudo: req.body.commenterPseudo,
        text: req.body.text
        
    };
  
    // Save Tutorial in the database
    Comment.create(comment)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      });
  };

exports.deleteCommentPost = (req, res) => {
    
  
  const id = req.params.id;

  Comment.destroy({
    where: { commentId: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Comment was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete comment with id=${id}. Maybe comment was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete comment with id=" + id + err
      });
    });
  
}


