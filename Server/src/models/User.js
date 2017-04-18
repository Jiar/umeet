import bcrypt from 'bcrypt-nodejs'

export default (sequelize, dataType) => {
    let user = sequelize.define("user", {
        id: {
            type: dataType.BIGINT(12),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: "用户id"
        },
        name: {
            type: dataType.STRING,
            allowNull: false,
            comment: "名字"
        },
        email: {
            type: dataType.STRING,
            allowNull: false,
            comment: "邮箱"
        },
        password: {
            type: dataType.STRING,
            allowNull: false,
            comment: "密码"
        },
        nick: {
            type: dataType.STRING,
            allowNull: false,
            comment: "昵称"
        },
        motto: {
            type: dataType.STRING,
            allowNull: true,
            comment: "座右铭"
        },
        avatar: {
            type: dataType.STRING,
            allowNull: true,
            comment: "头像"
        },
        score: {
            type: dataType.BIGINT(12),
            allowNull: true,
            defaultValue: 200,
            comment: "积分"
        },
        createTime: {
            type: dataType.DATE,
            allowNull: false,
            defaultValue: dataType.NOW,
            comment: "创建时间"
        },
        lastUpdateTime: {
            type: dataType.DATE,
            allowNull: false,
            defaultValue: dataType.NOW,
            comment: "上一次修改信息时间"
        },
        lastLoginTime: {
            type: dataType.DATE,
            allowNull: false,
            defaultValue: dataType.NOW,
            comment: "上一次登录时间"
        },
        lastLoginIp: {
            type: dataType.STRING,
            allowNull: false,
            comment: "上一次登录ip"
        }
    }, {
        instanceMethods: {
            checkPassword(password) {
                return bcrypt.compareSync(password, this.password)
            }
        },
        setterMethods: {
            password(password) {
                password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
                // password = bcrypt.hashSync(password, this.getDataValue('name'))
                // password = bcrypt.hashSync(password, 'SaltSaltSaltSaltSalt');
                this.setDataValue('password', password);
            }
        }
    })
    return user
}
