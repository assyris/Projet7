const db = require("../models");
const Post = db.post;
const fs = require('fs');
// const { promisify } = require("util");
// const pipeline = promisify(require("stream").pipeline);
// const Op = db.Sequelize.Op;

exports.createPost = (req, res, next) => {
      let imagePost = "";

      if (req.file) { 
          imagePost = `${req.protocol}://${req.get("host")}/../client/public/uploads/posts/${req.file.filename}` 
      }
      const newPost = new Post(
          {
              message: req.body.message,
              picture: imagePost,
              video: req.body.video,
              user_id: req.body.user_id
          }
      )
      console.log(Post)
      newPost.save()
          .then(() => res.status(201).json({ message: "Publication réussie" }))
          .catch(error => res.status(400).json({ error }))
  };

// exports.createPost = async (req, res, next) => {
//   let fileName;

//   if (req.file !== null) {
//     try {
//       if (
//         req.file.detectedMimeType != "image/jpg" &&
//         req.file.detectedMimeType != "image/png" &&
//         req.file.detectedMimeType != "image/jpeg"
//       )
//         throw Error("invalid file");

//       if (req.file.size > 500000) throw Error("max size");
//     } catch (err) {
//       const errors = uploadErrors(err);
//       return res.status(201).json({ errors });
//     }
//     fileName = req.body.posterId + Date.now() + ".jpg";

//     await pipeline(
//       req.file.stream,
//       fs.createWriteStream(
//         `${__dirname}/../client/public/uploads/posts/${fileName}`
//       )
//     );
//   }

//   const newPost = Post.build({
//     posterId: req.body.posterId,
//     message: req.body.message,
//     picture: req.file !== null ? "./uploads/posts/" + fileName : "",
//     video: req.body.video
//   });

//   try {
//     const post = await newPost.save();
//     return res.status(201).json(post);
//   } catch (err) {
//     return res.status(400).send(err);
//   }
  
// };

exports.readPost = (req, res, next) => {
  const id = req.query.id;

  Post.findByPk(id)
    .then(data => {
      res.status(201).json(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving posts."
      });
    });
  
};

module.exports.updatePost = (req, res) => {
  const id = req.params.id;

  Post.update(req.body, {
    where: { posterId: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Post was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Post with id=${id}. Maybe Post was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Post with id=" + id
      });
    });
};


exports.deletePost = (req, res, next) => {
  const id = req.params.id;

  Post.destroy({
    where: { posterId: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Post was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Post with id=${id}. Maybe Post was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Post with id=" + id + err
      });
    });
  
}