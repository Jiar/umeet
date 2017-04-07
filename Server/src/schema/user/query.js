import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} from 'graphql'

import { userType } from "./type"
import { pagination } from "../pagination"
import permission from '../permission'

let user =  {
    type: userType,
    args: {
        id: {
            description: "id of the user",
            type: GraphQLInt
        }
    },
    async resolve (parentValue, args, ctx) {
        permission(ctx, "user");
        return await ctx.models.User.findById(args.id)
    }
}

let users = {
    type: pagination(userType, "user"),
    args: {
        page: {
            type: GraphQLInt,
            description: "当前页码"
        },
        order: {
            type: GraphQLString,
            description: "排序"
        },
        limit: {
            type: GraphQLInt,
            description: "每页返回"
        }
    },
    async resolve (parentValue, { page, order, limit }, ctx) {
        permission(ctx, "users")
        limit = limit || 15;
        page = page || 1;
        let offset = (page - 1) * limit;
        let result = await ctx.models.User.findAndCountAll({
            order: order,
            limit: limit,
            offset: offset
        })
        let pages = parseFloat(result.count) / parseFloat(limit)
        if (pages > parseInt(pages)) {
            pages = parseInt(pages) + 1
        } else {
            pages = parseInt(pages)
        }
        result.limit = limit
        result.page = page
        result.pages = pages
        return result
    }
}

export default {
    user: user,
    users: users
}