module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comment", {
        commentId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        posterId: {
            type: Sequelize.INTEGER,
            foreignKey: 'fk_comment_post',
            defaultValue: null
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