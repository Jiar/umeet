import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLString
} from 'graphql'

let results = {
    // 系统
    // 200000: {
    //     code: 200000,
    //     msg: ''
    // },
    200001: {
        error: false,
        code: 200001,
        msg: '操作成功'
    },
    200002: {
        error: true,
        code: 200002,
        msg: '操作失败'
    },
    201001: {
        error: false,
        code: 201001,
        msg: '添加成功'
    },
    201002: {
        error: true,
        code: 201002,
        msg: '添加失败'
    },
    201003: {
        error: false,
        code: 201003,
        msg: '移除成功'
    },
    201004: {
        error: true,
        code: 201004,
        msg: '移除失败'
    }
};

let resultType = function (name) {
    return new GraphQLObjectType({
        name: name + '_operation',
        description: '操作事件结果',
        fields: () => ({
            error: { type: GraphQLBoolean },
            code: { type: GraphQLInt },
            msg: { type: GraphQLString }
        })
    })
}

export {
    results,
    resultType
}
