import {
    GraphQLObjectType,
    GraphQLSchema
} from 'graphql'

import user from './user'
import node from './node'
import tab from './tab'
import topic from './topic'
import comment from './comment'

let queryFields = {}
let mutationFields = {}

Object.assign(queryFields, user.query)
Object.assign(queryFields, node.query)
Object.assign(queryFields, tab.query)
Object.assign(queryFields, topic.query)
Object.assign(queryFields, comment.query)

Object.assign(mutationFields, user.mutation)
Object.assign(mutationFields, node.mutation)
Object.assign(mutationFields, tab.mutation)
Object.assign(mutationFields, topic.mutation)
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
