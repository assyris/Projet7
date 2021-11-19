const db = require("../models");
const User = db.user;
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

// module.exports.signUp = async (req, res) => {
//   const {pseudo, email, password} = req.body

//   try {
//     const user = await UserModel.create({pseudo, email, password });
//     res.status(201).json({ user: user._id});
//   }
//   catch(err) {
//     const errors = signUpErrors(err);
//     res.status(200).send({ errors })
//   }
// }

exports.signUp = (req, res, next) => {
  if (!req.body.pseudo || !req.body.email || !req.body.password) {
    return res.status(400).json({ message: "one ore more paramaters empty" })
  }
  const nameRegex = /(.*[a-z]){3,30}/;
  const mailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
  const pwdRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

  if (nameRegex.test(req.body.pseudo) && mailRegex.test(req.body.email) && pwdRegex.test(req.body.password)) {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = User.build({
          pseudo: req.body.pseudo,
          email: req.body.email,
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
  } else {
    res.status(400).json({ message: " incorrect parameters " })
  }
};

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
    bcrypt.compare(req.body.password, user.password)        
    .then(valid => {    
      if (!valid) {                                             
        return res.status(401).json({ message: "mot de passe non valide" });           
      } 
      res.status(200).json({
        message: "Connexion réussie",
        id: user.id,
        token: jwt.sign( { id: user.id }, process.env.RANDOM_TOKEN_SECRET, { expiresIn: '24h' } )
      })
    })
    .catch(error => res.status(500).json({ error }));                             
    })
  .catch(error => res.status(500).json({ error }));                                 
};

// const User = require("../models/user.model");
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// exports.signup = (req, res, next) => {
//     bcrypt.hash(req.body.password, 10)
//         .then(hash => {
//             const user = new User({
//                 email: req.body.email,
//                 password: hash
//             });
//             user.save()
//                 .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
//                 .catch(error => res.status(400).json({ error }));
//         })
//         .catch(error => res.status(500).json({ error }));
// };

// exports.login = (req, res, next) => {
//     User.findOne({ email: req.body.email })
//         .then(user => {
//             if (!user) {
//                 return res.status(401).json({ error: 'Utilisateur non trouvé !' });
//             }
//             bcrypt.compare(req.body.password, user.password)
//                 .then(valid => {
//                     if (!valid) {
//                         return res.status(401).json({ error: 'Mot de passe incorrect !' });
//                     }
//                     res.status(200).json({
//                         userId: user._id,
//                         token: jwt.sign(
//                             { userId: user._id },
//                             process.env.RANDOM_TOKEN_SECRET,
//                             { expiresIn: '24h' }
//                         )
//                     });
//                 })
//                 .catch(error => res.status(500).json({ error }));
//         })
//         .catch(error => res.status(500).json({ error }));
// };

