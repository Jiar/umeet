import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList
} from 'graphql'

import moment from 'moment'
import { topicType } from '../topic/type'
import { userType } from '../user/type'

let commentType = new GraphQLObjectType({
    name: 'comment',
    description: '评论',
    fields() {
        return {
            id: {
                type: GraphQLInt,
                description: '编号',
                resolve(comment) {
                    return comment.id;
                }
            },
            topic: {
                type: topicType,
                description: '所属主题',
                async resolve(comment) {
                    return await comment.getTopic();
                }
            },
            user: {
                type: userType,
                description: '所属用户',
                async resolve(comment) {
                    return await comment.getUser();
                }
            },
            content: {
                type: GraphQLString,
                description: '评论内容',
                resolve (comment) {
                    return comment.content;
                }
            },
            createTime: {
                type: GraphQLString,
                description: '创建时间',
                resolve (comment) {
                    return moment(comment.createTime).format('YYYY-MM-DD HH:mm:ss');
                }
            }
        }
    }
})

export  {
    commentType
}
