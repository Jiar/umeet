export default (sequelize, dataType) => {
    let comment = sequelize.define("comment", {
        id: {
            type: dataType.BIGINT(12),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: "评论id"
        },
        pid: {
            type: dataType.BIGINT(12),
            allowNull: false,
            defaultValue: 0,
            comment: "父评论id 即 回复的评论id"
        },
        content: {
            type: dataType.TEXT,
            allowNull: false,
            comment: "评论内容"
        },
        createTime: {
            type: dataType.DATE,
            allowNull: false,
            defaultValue: dataType.NOW,
            comment: "创建时间"
        }
    }, {
        classMethods: {
            associate: function(models) {
                comment.belongsTo(models.post);
                comment.belongsTo(models.user);
            }
        }
    })
    return comment
}
