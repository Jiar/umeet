import {
    GraphQLObjectType,
    GraphQLSchema
} from 'graphql'

import user from './user'
import sort from './sort'
import post from './post'
import comment from './comment'

let queryFields = {}
let mutationFields = {}

Object.assign(queryFields, user.query)
Object.assign(queryFields, sort.query)
Object.assign(queryFields, post.query)
Object.assign(queryFields, comment.query)

Object.assign(mutationFields, user.mutation)
Object.assign(mutationFields, sort.mutation)
Object.assign(mutationFields, post.mutation)
Object.assign(mutationFields, comment.mutation)

export default new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Query",
        description: 'Functions to query',
        fields: queryFields
    }),
    mutation: new GraphQLObjectType({
        name: "Mutation",
        description: 'Functions to operation',
        fields: mutationFields
    })
})
