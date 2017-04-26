import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList
} from 'graphql'

import moment from 'moment'
import { nodeType } from '../node/type'
import { userType } from '../user/type'
import { commentType } from '../comment/type'

let topicType = new GraphQLObjectType({
    name: 'topic',
    description: '主题',
    fields() {
        return {
            id: {
                type: GraphQLInt,
                description: '编号',
                resolve(topic) {
                    return topic.id;
                }
            },
            node: {
                type: nodeType,
                description: '所属节点',
                async resolve(topic) {
                    return await topic.getNode();
                }
            },
            user: {
                type: userType,
                description: '所属用户',
                async resolve(topic) {
                    return await topic.getUser();
                }
            },
            comments: {
                type: new GraphQLList(commentType),
                description: '拥有的评论列表',
                async resolve(topic) {
                    return await topic.getComments();
                }
            },
            title: {
                type: GraphQLString,
                description: '标题',
                resolve (topic) {
                    return topic.title;
                }
            },
            type: {
                type: GraphQLInt,
                description: '内容类型 0:markdown 1:富文本',
                resolve (topic) {
                    return topic.type;
                }
            },
            clickCount: {
                type: GraphQLInt,
                description: '点击次数',
                resolve (topic) {
                    return topic.clickCount;
                }
            },
            content: {
                type: GraphQLString,
                description: '内容',
                resolve (topic) {
                    return topic.content;
                }
            },
            createTime: {
                type: GraphQLString,
                description: '创建时间',
                resolve (topic) {
                    return moment(topic.createTime).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            isModified: {
                type: GraphQLBoolean,
                description: '发帖后允许修改一次 false: 未修改 true: 已修改',
                resolve (topic) {
                    return topic.isModified;
                }
            }
        }
    }
})

export  {
    topicType
}
