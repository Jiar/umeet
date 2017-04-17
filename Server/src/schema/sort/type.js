import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} from 'graphql'

import moment from 'moment'

let sortType = new GraphQLObjectType({
    name: 'sort',
    description: '单个分类',
    fields() {
        return {
            id: {
                type: GraphQLInt,
                resolve(sort) {
                    return sort.id;
                }
            },
            pid: {
                type: GraphQLInt,
                resolve (sort) {
                    return sort.pid;
                }
            },
            title: {
                type: GraphQLString,
                resolve (sort) {
                    return sort.title;
                }
            },
            description: {
                type: GraphQLString,
                resolve (sort) {
                    return sort.description;
                }
            },
            createTime: {
                type: GraphQLString,
                resolve (sort) {
                    return moment(sort.createTime).format('YYYY-MM-DD HH:mm:ss');
                }
            }
        }
    }
})

export  {
    sortType
}