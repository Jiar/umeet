export default (sequelize, dataType) => {
    let sort = sequelize.define("sort", {
        id: {
            type: dataType.BIGINT(12),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: "帖子分类id"
        },
        pid: {
            type: dataType.BIGINT(12),
            allowNull: false,
            defaultValue: 0,
            comment: "父分类id"
        },
        title: {
            type: dataType.STRING,
            allowNull: false,
            comment: "帖子分类标题"
        },
        description: {
            type: dataType.STRING,
            allowNull: true,
            comment: "帖子分类描述"
        },
        createTime: {
            type: dataType.DATE,
            allowNull: false,
            defaultValue: dataType.NOW,
            comment: "创建时间"
        }
    })
    return sort
}
