import {
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull
} from 'graphql'

import { UserError } from 'graphql-errors'
import permission from '../permission'
import ERRORS from '../error'
import { commentType } from './type'

/**
 * 创建评论
 */
let createComment = {
    type: commentType,
    args: {
        pid: {
            type: GraphQLInt
        },
        postId: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        userId: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        content: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    async resolve(parentValue, {pid, postId, userId, content}, ctx) {
        // await permission(ctx, 'createComment')
        pid = pid || 0
        if (pid != 0) {
            let isExist = await ctx.models.Comment.findOne({
                where: {
                    id: pid
                }
            })
            if (!isExist) {
                throw new UserError(ERRORS[401041])
            }
        }
        let comment = await ctx.models.Comment.create({
            pid: pid,
            postId: postId,
            userId: userId,
            content: content
        })
        return comment
    }
}

export default {
    createComment: createComment
}
