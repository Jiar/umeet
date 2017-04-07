import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} from 'graphql'

import { userType, tokenType } from "./type"
import validator from "validator"
import md5 from "md5"
import { UserError } from 'graphql-errors';
import permission from '../permission'

/**
 * 创建用户 
 */
let createUser = {
    type: userType,
    args: {
        email: {
            type: new GraphQLNonNull(GraphQLString)
        },
        password: {
            type: new GraphQLNonNull(GraphQLString)
        },
        name: {
            type: new GraphQLNonNull(GraphQLString) 
        }
    },
    async resolve(parentValue, {email, password, name}, ctx) {
        await permission(ctx, "createUser")
        if (!validator.isEmail(email)) {
            throw new UserError({
                code: 40010,
                msg: "email格式不正确"
            })
        }
        if (!validator.isLength(password, {min: 8})) {
            throw new UserError({
                code: 40011,
                msg: "password至少8位"
            })
        }
        let isExist = await ctx.models.User.findOne({
            where: {
                email: email
            }
        })
        if (isExist) {
            throw new UserError({
                code: "40012",
                msg: "该Email已存在"
            })
        }
        isExist = await ctx.models.User.findOne({
            where: {
                name: name
            }
        })
        if (isExist) {
            throw new UserError({
                code: "40013",
                msg: "该名字已存在"
            })
        }
        let ip = ctx.request.ip
        let ips = ip.split(':')
        if(ips.length > 0) {
            ip = ips[ips.length-1]
        }
        console.log(ips)
        console.log(ip)
        let user = await ctx.models.User.create({
            email: email,
            password: md5(password),
            name: name,
            nick: name,
            lastLoginIp: ip
        })
        return user
    }
}

/**
 * 用户登录
 */
let signin = {
    type: tokenType,
    args: {
        email: {
            type: new GraphQLNonNull(GraphQLString)
        },
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        password: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    async resolve(parentValue, {email, name, password}, ctx) {
        if (!email) {
            let user = await ctx.models.User.findOne({
                where: {
                    email: email
                }
            })
            if (!user) {
                throw new UserError({
                    code: 40001, 
                    msg: "邮箱不存在"
                })
            }
            password = md5(password)
            if (!user.checkPassword(password)) {
                throw new UserError({
                    code: 40003,
                    msg: "密码不正确"
                });
            }
            return user
        } else if(!name) {
            let user = await ctx.models.User.findOne({
                where: {
                    name: name
                }
            })
            if (!user) {
                throw new UserError({
                    code: 40002, 
                    msg: "用户名不存在"
                })
            }
            password = md5(password)
            if (!user.checkPassword(password)) {
                throw new UserError({
                    code: 40003,
                    msg: "密码不正确"
                })
            }
            return user
        } else {
            throw new UserError({
                code: 40004,
                msg: "邮箱和用户名至少输入一个"
            })
        }
    }
}

export default {
    createUser: createUser,
    signin: signin
}