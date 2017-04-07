// import Sort from './Sort'
// import User from './User'
// var Sort = require('./Sort')
// var User = require('./User')

export default (sequelize, Sequelize) => {
    let Post = sequelize.define("Post", {
        id: {
            type: Sequelize.BIGINT(12),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: "帖子id"
        },
        sortId: {
            type: Sequelize.BIGINT(12),
            allowNull: false,
            comment: "帖子分类id",
            references: { 
                model: "Sort", 
                key: "id"
            }
        },
        userId: {
            type: Sequelize.BIGINT(12),
            allowNull: false,
            comment: "用户id",
            references: { 
                model: "User", 
                key: "id"
            }
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            comment: "帖子标题"
        },
        type: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: "帖子内容类型 0:markdown 1:富文本"
        },
        content: {
            type: Sequelize.TEXT,
            allowNull: true,
            comment: "帖子内容"
        },
        createTime: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
            comment: "创建时间"
        },
        isModified: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: "发帖后允许修改一次 0: 未修改 1: 已修改"
        }
    })
    return Post
}