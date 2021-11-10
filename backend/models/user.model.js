module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      pseudo: {
        type: Sequelize.STRING,
        required: true,
      },
      email: {
        type: Sequelize.STRING,
        required: true,
      },
      password: {
        type: Sequelize.STRING,
        required: true,
      },
      picture: {
        type: Sequelize.STRING
      },
      bio: {
        type: Sequelize.STRING,
        max: 1024,
      },
      timestamps: {
        type: Sequelize.NUMBER
      }
    });
  
    return User;
  };