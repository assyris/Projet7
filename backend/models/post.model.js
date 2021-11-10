module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("post", {
        message: {
            type: Sequelize.STRING
        },
        piscture: {
            type: Sequelize.STRING
        },
        video: {
            type: Sequelize.STRING
        },
        comments: {
            type: [
                {
                    commenterId: Sequelize.STRING,
                    commenterPseudo: Sequelize.STRING,
                    text: Sequelize.STRING,
                    timestamp: Sequelize.NUMBER,
                }
            ],
        },
        likers: {
            type: Sequelize.STRING
        }
    });

    return Post;
};