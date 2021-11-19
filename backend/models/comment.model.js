module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comment", {
        commentId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        posterId: {
            type: Sequelize.INTEGER
        },
        commenterPseudo: {
            type: Sequelize.STRING
        },
        text: {
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

    return Comment;
};