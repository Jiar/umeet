import {
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull
} from 'graphql'

import { UserError } from 'graphql-errors'
import permission from '../permission'
import ERRORS from '../error'
import { sortType } from './type'

/**
 * 创建分类
 */
let createSort = {
    type: sortType,
    args: {
        pid: {
            type: GraphQLInt
        },
        title: {
            type: new GraphQLNonNull(GraphQLString)
        },
        description: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    async resolve(parentValue, {pid, title, description}, ctx) {
        // await permission(ctx, 'createSort')
        let isExist = await ctx.models.Sort.findOne({
            where: {
                title: title
            }
        })
        if (isExist) {
            throw new UserError(ERRORS[401021])
        }
        pid = pid == null ? 0 : pid
        if (pid != 0) {
            isExist = await ctx.models.Sort.findOne({
                where: {
                    id: pid
                }
            })
            if (!isExist) {
                throw new UserError(ERRORS[401022])
            }
        }
        let sort = await ctx.models.Sort.create({
            pid: pid,
            title: title,
            description: description
        })
        return sort
    }
}

export default {
    createSort: createSort
}