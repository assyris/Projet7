const db = require("../models");
const User = db.user;
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { signUpErrors } = require('../utils/errors.utils');
require('dotenv').config({path: './config/.env'});

module.exports.signUp = async (req, res) => {
  const {pseudo, email} = req.body;

  const nameRegex = /(.*[a-z]){3,30}/;
  const mailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
  const pwdRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

  try {
    if (nameRegex.test(req.body.pseudo) && mailRegex.test(req.body.email) && pwdRegex.test(req.body.password)) {
          bcrypt.hash(req.body.password, 10)
            .then(hash => {
              const user = User.build({
                pseudo,
                email,
                password: hash
              });
              user.save()
                .then((user) => {
                  if (user) {
                    return res.status(201).json({ message: 'new user created' })
                  }
                })
                .catch((error) => { res.status(401).json({ error }) });
            })
            .catch((error) => { res.status(500).json({ message: " erreur serveur " + error }) })
        }
  }
  catch(err) {
    const errors = signUpErrors(err);
    res.status(200).send({ errors })
  }
}

// exports.signUp = (req, res, next) => {
//   if (!req.body.pseudo || !req.body.email || !req.body.password) {
//     return res.status(400).json({ message: "one ore more paramaters empty" })
//   }
//   const nameRegex = /(.*[a-z]){3,30}/;
//   const mailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
//   const pwdRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

//   if (nameRegex.test(req.body.pseudo) && mailRegex.test(req.body.email) && pwdRegex.test(req.body.password)) {
//     bcrypt.hash(req.body.password, 10)
//       .then(hash => {
//         const user = User.build({
//           pseudo: req.body.pseudo,
//           email: req.body.email,
//           password: hash
//         });
//         user.save()
//           .then((user) => {
//             if (user) {
//               return res.status(201).json({ message: 'new user created' })
//             }
//           })
//           .catch((error) => { res.status(401).json({ error }) });
//       })
//       .catch((error) => { res.status(500).json({ message: " erreur serveur " + error }) })
//   } else {
//     res.status(400).json({ message: " incorrect parameters " })
//   }
// };

exports.signIn = (req, res, next) => {
  if ( !req.body.email || !req.body.password ) {
    return res.status(400).json({message: "one ore more paramaters empty"})
}
  User.findOne({
    where: {
      email: req.body.email
    }
    })       
  .then(user => {
    if (!user) {  
      return res.status(404).json({ message: 'email not found' }); 
    }
    console.log('user.password', user.password)
    console.log('req.body.password', req.body.password)
    bcrypt.compare(req.body.password, user.password)        
    .then(valid => {    
      if (!valid) {                                             
        return res.status(401).json({ message: "mot de passe non valide" });           
      } 
      res.status(200).json({
        message: "Connexion réussie",
        id: user.id,
        pseudo: user.pseudo,
        token: jwt.sign( { id: user.id }, process.env.RANDOM_TOKEN_SECRET, { expiresIn: '24h' } )
      })
    })
    .catch(error => res.status(500).json({ message: "bcrypt compare", error }));                             
    })
  .catch(error => res.status(500).json({ message: "find one", error }));                                 
};

module.exports.logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}
