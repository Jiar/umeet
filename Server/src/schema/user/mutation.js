import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} from 'graphql'

import { UserError } from 'graphql-errors'
import validator from 'validator'
import md5 from 'md5'
import permission from '../permission'
import ERRORS from '../errors'
import { userType, tokenType } from './type'

let signup = {
    type: userType,
    description: '用户注册',
    args: {
        name: {
            type: new GraphQLNonNull(GraphQLString),
            description: '用户名'
        },
        email: {
            type: new GraphQLNonNull(GraphQLString),
            description: '邮箱'
        },
        password: {
            type: new GraphQLNonNull(GraphQLString),
            description: '密码'
        }
    },
    async resolve(parentValue, {name, email, password}, ctx) {
        await permission(ctx, 'signup')
        if (email == null || email.length == 0) {
            throw new UserError(ERRORS[401001])
        }
        if (name == null || name.length == 0) {
            throw new UserError(ERRORS[401002])
        }
        if (!validator.isLength(password, {min: 8})) {
            throw new UserError(ERRORS[401003])
        }
        let isExist = await ctx.models.user.findOne({
            where: {
                name: name
            }
        })
        if (isExist) {
            throw new UserError(ERRORS[401004])
        }
        if (!validator.isEmail(email)) {
            throw new UserError(ERRORS[401005])
        }
        isExist = await ctx.models.user.findOne({
            where: {
                email: email
            }
        })
        if (isExist) {
            throw new UserError(ERRORS[401006])
        }
        let ip = ctx.request.ip
        let ips = ip.split(':')
        if(ips.length > 0) {
            ip = ips[ips.length-1]
        }
        let user = await ctx.models.user.create({
            email: email,
            password: md5(password),
            name: name,
            nick: name,
            lastLoginIp: ip
        })
        return user
    }
}

let signin = {
    type: tokenType,
    description: '登录',
    args: {
        account: {
            type: new GraphQLNonNull(GraphQLString),
            description: '账户：用户名或邮箱'
        },
        password: {
            type: new GraphQLNonNull(GraphQLString),
            description: '密码'
        }
    },
    async resolve(parentValue, {account, password}, ctx) {
        if (account == null || account.length == 0) {
            throw new UserError(ERRORS[401011])
        }
        if (!validator.isEmail(account)) {
            let user = await ctx.models.user.findOne({
                where: {
                    name: account
                }
            })
            if (!user) {
                throw new UserError(ERRORS[401012])
            }
            password = md5(password)
            console.log(password);
            if (!user.checkPassword(password)) {
                throw new UserError(ERRORS[401014])
            }
            return user
        } else {
            let user = await ctx.models.user.findOne({
                where: {
                    email: account
                }
            })
            if (!user) {
                throw new UserError(ERRORS[401013])
            }
            password = md5(password)
            if (!user.checkPassword(password)) {
                throw new UserError(ERRORS[401014])
            }
            return user
        }
    }
}

export default {
    signup: signup,
    signin: signin
}
