export default (sequelize, dataType) => {
    let topic = sequelize.define('topic', {
        id: {
            type: dataType.BIGINT(12),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: '主题编号'
        },
        title: {
            type: dataType.STRING,
            allowNull: false,
            comment: '主题标题'
        },
        type: {
            type: dataType.INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: '主题内容类型 0:markdown 1:富文本'
        },
        clickCount: {
            type: dataType.INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: '点击次数'
        },
        content: {
            type: dataType.TEXT,
            allowNull: true,
            comment: '主题内容'
        },
        createTime: {
            type: dataType.DATE,
            allowNull: false,
            defaultValue: dataType.NOW,
            comment: '创建时间'
        },
        isModified: {
            type: dataType.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            comment: '发帖后允许修改一次 false: 未修改 true: 已修改'
        }
    }, {
        classMethods: {
            associate: function(models) {
                topic.belongsTo(models.node);
                topic.belongsTo(models.user);
                topic.hasMany(models.comment);
            }
        }
    })
    return topic
}
