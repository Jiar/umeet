import {
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull
} from 'graphql'

import { UserError } from 'graphql-errors'
import permission from '../permission'
import ERRORS from '../errors'
import { topicType } from './type'

let createTopic = {
    type: topicType,
    description: '创建主题',
    args: {
        nodeId: {
            type: new GraphQLNonNull(GraphQLInt),
            description: '节点编号'
        },
        userId: {
            type: new GraphQLNonNull(GraphQLInt),
            description: '用户编号'
        },
        title: {
            type: new GraphQLNonNull(GraphQLString),
            description: '标题'
        },
        type: {
            type: GraphQLInt,
            description: '主题内容类型 0:markdown 1:富文本'
        },
        content: {
            type: new GraphQLNonNull(GraphQLString),
            description: '内容'
        }
    },
    async resolve(parentValue, {nodeId, userId, title, type, content}, ctx) {
        await permission(ctx, 'createTopic');
        let topic = await ctx.models.topic.create({
            nodeId: nodeId,
            userId: userId,
            title: title,
            type: type || 0,
            content: content
        })
        return topic
    }
}

export default {
    createTopic: createTopic
}
