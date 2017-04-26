import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} from 'graphql'

import jwt from 'jsonwebtoken'
import moment from 'moment'
import { topicType } from '../topic/type'
import { commentType } from '../comment/type'

let userType = new GraphQLObjectType({
    name: 'user',
    description: '用户',
    fields() {
        return {
            id: {
              type: GraphQLInt,
              description: '编号',
              resolve(user) {
                return user.id;
              }
            },
            name: {
                type: GraphQLString,
                description: '用户名',
                resolve (user) {
                  return user.name;
                }
            },
            email: {
                type: GraphQLString,
                description: '邮箱',
                resolve (user) {
                  return user.email;
                }
            },
            nick: {
                type: GraphQLString,
                description: '昵称',
                resolve (user) {
                  return user.nick;
                }
            },
            motto: {
                type: GraphQLString,
                description: '座右铭',
                resolve (user) {
                  return user.motto;
                }
            },
            avatar: {
                type: GraphQLString,
                description: '头像',
                resolve (user) {
                  return user.avatar;
                }
            },
            score: {
                type: GraphQLInt,
                description: '积分',
                resolve (user) {
                  return user.score;
                }
            },
            topics: {
                type: new GraphQLList(topicType),
                description: '主题列表',
                async resolve(user) {
                    return await user.getTopics();
                }
            },
            comments: {
                type: new GraphQLList(commentType),
                description: '评论列表',
                async resolve(user) {
                    return await user.getComments();
                }
            },
            createTime: {
                type: GraphQLString,
                description: '创建时间',
                resolve (user) {
                  return moment(user.createTime).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            lastUpdateTime: {
                type: GraphQLString,
                description: '上一次修改信息时间',
                resolve (user) {
                  return moment(user.lastUpdateTime).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            lastLoginTime: {
                type: GraphQLString,
                description: '上一次登录时间',
                resolve (user) {
                  return moment(user.lastLoginTime).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            lastLoginIp: {
                type: GraphQLString,
                description: '上一次登录ip',
                resolve (user) {
                  return moment(user.lastLoginIp).format('YYYY-MM-DD HH:mm:ss');
                }
            }
        }
    }
})

let tokenType = new GraphQLObjectType({
    name: 'token',
    description: '登录后用户授权Token',
    fields() {
        return {
            token: {
                type: GraphQLString,
                description: 'token',
                resolve(user, args, ctx) {
                    return jwt.sign({
                        id: user.id,
                        email: user.email,
                        name: user.name
                    }, ctx.config.secret)
                }
            },
            id: {
                type: GraphQLInt,
                description: '用户编号',
                resolve(user, args, ctx) {
                    return user.id
                }
            },
            name: {
                description: '用户名字',
                type: GraphQLString,
                resolve(user, args, ctx) {
                    return user.name
                }
            },
            email: {
                type: GraphQLString,
                description: '用户邮箱',
                resolve(user, args, ctx) {
                    return user.email
                }
            },
            avatar: {
                type: GraphQLString,
                description: '用户头像',
                resolve(user, args, ctx) {
                    return user.avatar
                }
            }
        }
    }
})

export  {
    userType,
    tokenType
}
