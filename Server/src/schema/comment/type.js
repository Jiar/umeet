import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList
} from 'graphql'

import moment from 'moment'
import { postType } from '../post/type'
import { userType } from '../user/type'

let commentType = new GraphQLObjectType({
    name: 'comment',
    description: '单个评论',
    fields() {
        return {
            id: {
                type: GraphQLInt,
                resolve(comment) {
                    return comment.id;
                }
            },
            pid: {
                type: GraphQLInt,
                resolve(comment) {
                    return comment.pid;
                }
            },
            post: {
                type: postType,
                async resolve(comment) {
                    return await comment.getPost();
                }
            },
            user: {
                type: userType,
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
