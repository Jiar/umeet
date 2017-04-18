import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} from 'graphql'

import { commentType } from './type'
import { pagination } from '../pagination'
import permission from '../permission'

let comment =  {
    type: commentType,
    args: {
        id: {
            description: 'id of the comment',
            type: GraphQLInt
        }
    },
    async resolve (parentValue, args, ctx) {
        await permission(ctx, 'comment');
        return await ctx.models.comment.findById(args.id)
    }
}

let comments = {
    type: pagination(commentType, 'comment'),
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
        await permission(ctx, 'comments');
        limit = limit || 15
        page = page || 1
        let offset = (page - 1) * limit
        let result = await ctx.models.comment.findAndCountAll({
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
    comment: comment,
    comments: comments
}
