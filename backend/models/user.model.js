module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    pseudo: {
      type: Sequelize.STRING,
      required: true
    },
    email: {
      type: Sequelize.STRING,
      required: true
    },
    password: {
      type: Sequelize.STRING,
      required: true
    },
    picture: {
      type: Sequelize.STRING
    },
    bio: {
      type: Sequelize.STRING
    },
    timestamps: {
      type: Sequelize.DATE
    }
  },
    {
      freezeTableName: true,
      timestamps: false
    });

  return User;
};


//   const { Model } = require("sequelize")

// module.exports = (sequelize, DataTypes) => {
//     class User extends Model {}
//     User.init({
//       id: {
//         type: DataTypes.INTEGER, 
//         primaryKey: true
//       },
//         pseudo: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         email: {
//             type: DataTypes.STRING,
//             unique: true,
//             allowNull: false
//         },
//         password: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         picture: {
//           type: DataTypes.STRING
//         },
//         bio: {
//           type: DataTypes.STRING,
//         },
//         timestamps: {
//           type: DataTypes.DATE
//         }
//     }, 
//     {
//         sequelize,
//         modelName: "User"
//     })
//     return User
// }