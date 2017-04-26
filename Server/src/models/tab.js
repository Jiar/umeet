export default (sequelize, dataType) => {
    let tab = sequelize.define('tab', {
        id: {
            type: dataType.BIGINT(12),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: '标签编号 编号从1开始'
        },
        title: {
            type: dataType.STRING,
            allowNull: false,
            comment: '标签标题'
        },
        description: {
            type: dataType.STRING,
            allowNull: true,
            comment: '标签描述'
        },
        createTime: {
            type: dataType.DATE,
            allowNull: false,
            defaultValue: dataType.NOW,
            comment: '创建时间'
        }
    }, {
        classMethods: {
            associate: function(models) {
                tab.hasMany(models.node);
            }
        }
    })
    return tab
}
