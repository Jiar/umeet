import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} from 'graphql'

import moment from 'moment'
import { tabType } from '../tab/type'
import { topicType } from '../topic/type'

let nodeType = new GraphQLObjectType({
    name: 'node',
    description: '节点',
    fields() {
        return {
            id: {
                type: GraphQLInt,
                description: '编号',
                resolve(node) {
                    return node.id;
                }
            },
            pid: {
                type: GraphQLInt,
                description: '父编号',
                resolve (node) {
                    return node.pid;
                }
            },
            tab: {
                type: tabType,
                description: '所属标签',
                async resolve(node) {
                    return await node.getTab();
                }
            },
            topics: {
                type: new GraphQLList(topicType),
                description: '拥有的主题列表',
                async resolve(node) {
                    return await node.getTopics();
                }
            },
            title: {
                type: GraphQLString,
                description: '标题',
                resolve (node) {
                    return node.title;
                }
            },
            pic: {
                type: GraphQLString,
                description: '图像',
                resolve (node) {
                  return node.pic;
                }
            },
            description: {
                type: GraphQLString,
                description: '描述',
                resolve (node) {
                    return node.description;
                }
            },
            createTime: {
                type: GraphQLString,
                description: '创建时间',
                resolve (node) {
                    return moment(node.createTime).format('YYYY-MM-DD HH:mm:ss');
                }
            }
        }
    }
})

export  {
    nodeType
}
