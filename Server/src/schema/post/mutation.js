import {
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull
} from 'graphql'

import { UserError } from 'graphql-errors'
import permission from '../permission'
import ERRORS from '../errors'
import { postType } from './type'

/**
 * 创建帖子
 */
let createPost = {
    type: postType,
    args: {
        sortId: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        userId: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        title: {
            type: new GraphQLNonNull(GraphQLString)
        },
        type: {
            type: GraphQLInt
        },
        content: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    async resolve(parentValue, {sortId, userId, title, type, content}, ctx) {
        await permission(ctx, 'createPost');
        let sort = await ctx.models.post.create({
            sortId: sortId,
            userId: userId,
            title: title,
            type: type || 0,
            content: content
        })
        return sort
    }
}

export default {
    createPost: createPost
}
