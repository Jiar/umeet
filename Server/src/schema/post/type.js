import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList
} from 'graphql'

import moment from 'moment'
import { sortType } from '../sort/type'
import { userType } from '../user/type'
import { commentType } from '../comment/type'

let postType = new GraphQLObjectType({
    name: 'post',
    description: '单个帖子',
    fields() {
        return {
            id: {
                type: GraphQLInt,
                resolve(post) {
                    return post.id;
                }
            },
            sort: {
                type: sortType,
                async resolve(post) {
                    return await post.getSort();
                }
            },
            user: {
                type: userType,
                async resolve(post) {
                    return await post.getUser();
                }
            },
            comments: {
                type: new GraphQLList(commentType),
                async resolve(post) {
                    return await post.getComments();
                }
            },
            title: {
                type: GraphQLString,
                resolve (post) {
                    return post.title;
                }
            },
            type: {
                type: GraphQLInt,
                description: '帖子内容类型 0:markdown 1:富文本',
                resolve (post) {
                    return post.type;
                }
            },
            content: {
                type: GraphQLString,
                description: '帖子内容',
                resolve (post) {
                    return post.content;
                }
            },
            createTime: {
                type: GraphQLString,
                resolve (post) {
                    return moment(post.createTime).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            isModified: {
                type: GraphQLBoolean,
                description: '发帖后允许修改一次 false: 未修改 true: 已修改',
                resolve (post) {
                    return post.isModified;
                }
            }
        }
    }
})

export  {
    postType
}
