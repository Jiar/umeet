import {
    GraphQLObjectType,
    GraphQLSchema
} from 'graphql'

// import comment from './comment'
// import post from './post'
// import sort from './sort'
import user from './user'

let queryFields = {}
let mutationFields = {}

// Object.assign(queryFields, comment.query)
// Object.assign(queryFields, post.query)
// Object.assign(queryFields, sort.query)
Object.assign(queryFields, user.query)

// Object.assign(mutationFields, comment.mutation)
// Object.assign(mutationFields, post.mutation)
// Object.assign(mutationFields, sort.mutation)
Object.assign(mutationFields, user.mutation)

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