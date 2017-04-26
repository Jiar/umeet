import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} from 'graphql'

import { tabType } from './type'
import { pagination } from '../pagination'
import permission from '../permission'

let tab =  {
    type: tabType,
    description: '根据编号获取标签',
    args: {
        id: {
            type: GraphQLInt,
            description: '标签编号'
        }
    },
    async resolve (parentValue, args, ctx) {
        // await permission(ctx, 'tab');
        return await ctx.models.tab.findById(args.id);
    }
}

let tabs = {
    type: pagination(tabType, 'tab'),
    description: '标签列表分页查询',
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
        // await permission(ctx, 'tabs');
        limit = limit || 15;
        page = page || 1;
        let offset = (page - 1) * limit;
        let result = await ctx.models.tab.findAndCountAll({
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

let homeTabs = {
    type: new GraphQLObjectType({
        name: 'homeTabs',
        description: '首页显示的所有标签',
        fields: () => ({
            rows: { 
                type: new GraphQLList(tabType),
                description: '标签数组'
            },
            count: { 
                type: GraphQLInt,
                description: '标签数量'
            },
        })
    }),
    description: '获取首页显示的所有标签',
    args: {},
    async resolve (parentValue, args, ctx) {
        let result = await ctx.models.tab.findAndCountAll();
        return result;
    }
}

export default {
    tab: tab,
    tabs: tabs,
    homeTabs: homeTabs
}
