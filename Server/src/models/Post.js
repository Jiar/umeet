export default (sequelize, dataType) => {
    let post = sequelize.define("post", {
        id: {
            type: dataType.BIGINT(12),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: "帖子id"
        },
        title: {
            type: dataType.STRING,
            allowNull: false,
            comment: "帖子标题"
        },
        type: {
            type: dataType.INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: "帖子内容类型 0:markdown 1:富文本"
        },
        content: {
            type: dataType.TEXT,
            allowNull: true,
            comment: "帖子内容"
        },
        createTime: {
            type: dataType.DATE,
            allowNull: false,
            defaultValue: dataType.NOW,
            comment: "创建时间"
        },
        isModified: {
            type: dataType.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            comment: "发帖后允许修改一次 false: 未修改 true: 已修改"
        }
    }, {
        classMethods: {
            associate: function(models) {
                post.hasMany(models.comment);
                post.belongsTo(models.sort);
                post.belongsTo(models.user);
            }
        }
    })
    return post
}
