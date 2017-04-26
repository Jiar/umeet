import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} from 'graphql'

import moment from 'moment'
import { nodeType } from '../node/type'

let tabType = new GraphQLObjectType({
    name: 'tab',
    description: '标签',
    fields() {
        return {
            id: {
                type: GraphQLInt,
                description: '编号',
                resolve(tab) {
                    return tab.id;
                }
            },
            nodes: {
                type: new GraphQLList(nodeType),
                description: '拥有的节点列表',
                async resolve(tab) {
                    return await tab.getNodes();
                }
            },
            title: {
                type: GraphQLString,
                description: '标题',
                resolve (tab) {
                    return tab.title;
                }
            },
            description: {
                type: GraphQLString,
                description: '描述',
                resolve (tab) {
                    return tab.description;
                }
            },
            createTime: {
                type: GraphQLString,
                description: '创建时间',
                resolve (tab) {
                    return moment(tab.createTime).format('YYYY-MM-DD HH:mm:ss');
                }
            }
        }
    }
})

export {
    tabType
}
