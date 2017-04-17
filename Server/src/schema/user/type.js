import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} from 'graphql'

import jwt from 'jsonwebtoken'
import moment from 'moment'

let userType = new GraphQLObjectType({
    name: 'user',
    description: '单个用户',
    fields() {
        return {
            id: {
              type: GraphQLInt,
              resolve(user) {
                return user.id;
              }
            },
            name: {
                type: GraphQLString,
                resolve (user) {
                  return user.name;
                }
            },
            email: {
                type: GraphQLString,
                resolve (user) {
                  return user.email;
                }
            },
            nick: {
                type: GraphQLString,
                resolve (user) {
                  return user.nick;
                }
            },
            motto: {
                type: GraphQLString,
                resolve (user) {
                  return user.motto;
                }
            },
            avatar: {
                type: GraphQLString,
                resolve (user) {
                  return user.avatar;
                }
            },
            score: {
                type: GraphQLInt,
                resolve (user) {
                  return user.score;
                }
            },
            createTime: {
                type: GraphQLString,
                resolve (user) {
                  return moment(user.createTime).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            lastUpdateTime: {
                type: GraphQLString,
                resolve (user) {
                  return moment(user.lastUpdateTime).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            lastLoginTime: {
                type: GraphQLString,
                resolve (user) {
                  return moment(user.lastLoginTime).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            lastLoginIp: {
                type: GraphQLString,
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
                resolve(user, args, ctx) {
                    return user.id
                }
            },
            name: {
                type: GraphQLString,
                resolve(user, args, ctx) {
                    return user.name
                }
            },
            email: {
                type: GraphQLString,
                resolve(user, args, ctx) {
                    return user.email
                }
            }
        }
    }
})

export  {
    userType,
    tokenType
}
