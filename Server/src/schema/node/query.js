import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} from 'graphql'

import { nodeType } from './type'
import { pagination } from '../pagination'
import permission from '../permission'

let node =  {
    type: nodeType,
    description: '根据编号获取节点',
    args: {
        id: {
            type: GraphQLInt,
            description: '节点编号'
        }
    },
    async resolve (parentValue, args, ctx) {
        // await permission(ctx, 'node');
        return await ctx.models.node.findById(args.id);
    }
}

let nodes = {
    type: pagination(nodeType, 'node'),
    description: '节点列表分页查询',
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
        // await permission(ctx, 'nodes');
        limit = limit || 15;
        page = page || 1;
        let offset = (page - 1) * limit;
        let result = await ctx.models.node.findAndCountAll({
            order: order,
            limit: limit,
            offset: offset
        });
        let pages = parseFloat(result.count) / parseFloat(limit);
        if (pages > parseInt(pages)) {
            pages = parseInt(pages) + 1;
        } else {
            pages = parseInt(pages);
        }
        result.limit = limit;
        result.page = page;
        result.pages = pages;
        return result;
    }
}

export default {
    node: node,
    nodes: nodes
}
