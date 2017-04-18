import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} from 'graphql'

import { sortType } from './type'
import { pagination } from '../pagination'
import permission from '../permission'

let sort =  {
    type: sortType,
    args: {
        id: {
            description: 'id of the sort',
            type: GraphQLInt
        }
    },
    async resolve (parentValue, args, ctx) {
        await permission(ctx, 'sort');
        return await ctx.models.sort.findById(args.id)
    }
}

let sorts = {
    type: pagination(sortType, 'sort'),
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
        await permission(ctx, 'sorts');
        limit = limit || 15
        page = page || 1
        let offset = (page - 1) * limit
        let result = await ctx.models.sort.findAndCountAll({
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
    sort: sort,
    sorts: sorts
}
