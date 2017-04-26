export default (sequelize, dataType) => {
    let node = sequelize.define('node', {
        id: {
            type: dataType.BIGINT(12),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: '主题节点编号 从1开始'
        },
        pid: {
            type: dataType.BIGINT(12),
            allowNull: false,
            defaultValue: 0,
            comment: '父节点编号 默认为0 表示顶级节点'
        },
        title: {
            type: dataType.STRING,
            allowNull: false,
            comment: '主题节点标题'
        },
        pic: {
            type: dataType.STRING,
            allowNull: true,
            comment: '节点图像'
        },
        description: {
            type: dataType.STRING,
            allowNull: true,
            comment: '主题节点描述'
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
                // node 默认没有所属的tab
                node.belongsTo(models.tab);
                node.hasMany(models.topic);
            }
        }
    })
    return node
}
