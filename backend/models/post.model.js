module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("post", {
        posterId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        message: {
            type: Sequelize.STRING
        },
        picture: {
            type: Sequelize.STRING
        },
        video: {
            type: Sequelize.STRING
        },
        timestamps: {
            type: Sequelize.DATE
        },
        users_id: {
            type: Sequelize.INTEGER
        }
    },
        {
            freezeTableName: true,
            timestamps: false
        })
    return Post
}

// const { Model } = require("sequelize")

// module.exports = (sequelize, DataTypes) => {
//     class Post extends Model { }
//     Post.init({
//         posterId: {
//             type: DataTypes.INTEGER,
//             autoIncrement: true, 
//             primaryKey: true
//         },
//         message: {
//             type: DataTypes.STRING
//         },
//         picture: {
//             type: DataTypes.STRING
//         },
//         video: {
//             type: DataTypes.STRING
//         },
//         timestamps: {
//             type: DataTypes.DATE
//         },
//         users_id: {
//             type: DataTypes.INTEGER
//         }
//     },
//         {
//             sequelize,
//             modelName: "Post"
//         })
//     return Post
// }

