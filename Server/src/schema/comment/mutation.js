import {
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull
} from 'graphql'

import { UserError } from 'graphql-errors'
import permission from '../permission'
import ERRORS from '../errors'
import { commentType } from './type'

let createComment = {
    type: commentType,
    description: '创建评论',
    args: {
        topicId: {
            type: new GraphQLNonNull(GraphQLInt),
            description: '主题编号'
        },
        userId: {
            type: new GraphQLNonNull(GraphQLInt),
            description: '用户编号'
        },
        content: {
            type: new GraphQLNonNull(GraphQLString),
            description: '评论内容'
        }
    },
    async resolve(parentValue, {topicId, userId, content}, ctx) {
        await permission(ctx, 'createComment')
        let comment = await ctx.models.comment.create({
            pid: pid,
            topicId: topicId,
            userId: userId,
            content: content
        })
        return comment
    }
}

export default {
    createComment: createComment
}
