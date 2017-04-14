import bcrypt from 'bcrypt-nodejs'

export default (sequelize, Sequelize) => {
    let User = sequelize.define("User", {
        id: {
            type: Sequelize.BIGINT(12),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: "用户id"
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            comment: "名字"
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            comment: "邮箱"
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            comment: "密码"
        },
        nick: {
            type: Sequelize.STRING,
            allowNull: false,
            comment: "昵称"
        },
        motto: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: "座右铭"
        },
        avatar: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: "头像"
        },
        score: {
            type: Sequelize.BIGINT(12),
            allowNull: true,
            defaultValue: 200,
            comment: "积分"
        },
        createTime: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
            comment: "创建时间"
        },
        lastUpdateTime: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
            comment: "上一次修改信息时间"
        },
        lastLoginTime: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
            comment: "上一次登录时间"
        },
        lastLoginIp: {
            type: Sequelize.STRING,
            allowNull: false,
            comment: "上一次登录ip"
        }
    }, {
        instanceMethods: {
            // checkPassword(password) {
            //     return bcrypt.compareSync(password, this.password)
            // }
        },
        setterMethods: {
            // password(password) {
            //     password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
            //     this.setDataValue("password", password)
            // }
        }
    })
    return User
}
