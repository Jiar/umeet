import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} from 'graphql'

export function pagination(itemType, name) {

    return new GraphQLObjectType({
        name: name + "_pagination",
        description: "page info",
        fields: () => ({
            rows: { type: new GraphQLList(itemType) },
            page: { type: GraphQLInt },
            pages: { type: GraphQLInt },
            count: { type: GraphQLInt },
            limit: { type: GraphQLInt }
        })
    });

}