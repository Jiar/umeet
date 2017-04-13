export default (sequelize, Sequelize) => {
    let Comment = sequelize.define("Comment", {
        id: {
            type: Sequelize.BIGINT(12),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: "评论id"
        },
        pid: {
            type: Sequelize.BIGINT(12),
            allowNull: false,
            defaultValue: 0,
            comment: "父评论id 即 回复的评论id"
        },
        // postId: {
        //     type: Sequelize.BIGINT(12),
        //     allowNull: false,
        //     comment: "帖子id",
        //     references: { 
        //         model: "Post", 
        //         key: "id"
        //     }
        // },
        // userId: {
        //     type: Sequelize.BIGINT(12),
        //     allowNull: false,
        //     comment: "用户id",
        //     references: { 
        //         model: "User", 
        //         key: "id"
        //     }
        // },
        content: {
            type: Sequelize.TEXT,
            allowNull: false,
            comment: "评论内容"
        },
        createTime: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
            comment: "创建时间"
        }
    }, {
        classMethods: {
            associate: function(models) {
                Comment.belongsTo(models.Post, {
                    as: "post"
                })
                Comment.belongsTo(models.User, {
                    as: "user"
                })
            }
        }
    })
    return Comment
}
