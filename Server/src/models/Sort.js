export default (sequelize, Sequelize) => {
    let Sort = sequelize.define("Sort", {
        id: {
            type: Sequelize.BIGINT(12),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: "帖子分类id"
        },
        pid: {
            type: Sequelize.BIGINT(12),
            allowNull: false,
            defaultValue: 0,
            comment: "父分类id"
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            comment: "帖子分类标题"
        },
        description: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: "帖子分类描述"
        },
        createTime: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
            comment: "创建时间"
        }
    })
    return Sort
}
