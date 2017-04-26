import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} from 'graphql'

import { userType } from './type'
import { pagination } from '../pagination'
import permission from '../permission'

let user =  {
    type: userType,
    description: '根据编号获取用户',
    args: {
        id: {
            type: GraphQLInt,
            description: '用户编号'
        }
    },
    async resolve (parentValue, args, ctx) {
        // await permission(ctx, 'user')
        return await ctx.models.user.findById(args.id)
    }
}

let users = {
    type: pagination(userType, 'user'),
    description: '用户列表分页查询',
    args: {
        page: {
            type: GraphQLInt,
            description: '当前页码'
        },
        order: {
            type: GraphQLString,
            description: '排序方式'
        },
        limit: {
            type: GraphQLInt,
            description: '每页返回数量'
        }
    },
    async resolve (parentValue, { page, order, limit }, ctx) {
        await permission(ctx, 'users')
        limit = limit || 15
        page = page || 1
        let offset = (page - 1) * limit
        let result = await ctx.models.user.findAndCountAll({
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
        console.log(eval(result));
        return result
    }
}

export default {
    user: user,
    users: users
}
