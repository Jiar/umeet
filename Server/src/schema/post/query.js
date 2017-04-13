import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} from 'graphql'

import { postType } from './type'
import { pagination } from '../pagination'
import permission from '../permission'

let post = {
    type: postType,
    args: {
        id: {
            description: 'id of the post',
            type: GraphQLInt
        }
    },
    async resolve (parentValue, args, ctx) {
        permission(ctx, 'post')
        return await ctx.models.Sort.findById(args.id)
    }
}

let posts = {
    type: pagination(postType, 'post'),
    args: {
        page: {
            type: GraphQLInt,
            description: '当前页码'
        },
        order: {
            type: GraphQLString,
            description: '排序'
        },
        limit: {
            type: GraphQLInt,
            description: '每页返回数量'
        }
    },
    async resolve (parentValue, { page, order, limit }, ctx) {
        permission(ctx, 'posts')
        limit = limit || 15
        page = page || 1
        let offset = (page - 1) * limit
        let result = await ctx.models.Post.findAndCountAll({
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
    post: post,
    posts: posts
}
