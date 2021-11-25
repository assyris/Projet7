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
    
  
    Comment.destroy({
      where: { id: req.query.commentId }
    })
    .then(() => res.status(200).json({ message: "Commentaire supprimé !" }))
    .catch(error => res.status(400).json({ error }))
  };


