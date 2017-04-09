import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} from 'graphql'

import jwt from "jsonwebtoken"

let userType = new GraphQLObjectType({
    name: "user",
    description: "单个用户",
    fields() {
        return {
            id: {
              type: GraphQLInt,
              resolve(user) {
                return user.id
              }
            },
            name: {
                type: GraphQLString,
                resolve (user) {
                  return user.name
                }
            },
            nick: {
                type: GraphQLString,
                resolve (user) {
                  return user.nick
                }
            },
            email: {
                type: GraphQLString,
                resolve (user) {
                  return user.email
                }
            }
        }
    }
})

let tokenType = new GraphQLObjectType({
    name: "token",
    description: "登录后用户授权Token",
    fields() {
        return {
            token: {
                type: GraphQLString,
                resolve(user,args, ctx) {
                    return jwt.sign({
                        id: user.id,
                        email: user.email
                    }, ctx.config.secret)
                }
            }
        }
    }
})

export  {
    userType,
    tokenType
}