import {
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} from 'graphql'

import { UserError } from 'graphql-errors'
import permission from '../permission'
import ERRORS from '../errors'
import { results as RESULTS, resultType } from '../results'
import { tabType } from './type'

let createTab = {
    type: tabType,
    description: '创建标签',
    args: {
        title: {
            type: new GraphQLNonNull(GraphQLString),
            description: '标题'
        },
        description: {
            type: new GraphQLNonNull(GraphQLString),
            description: '描述'
        }
    },
    async resolve(parentValue, {title, description}, ctx) {
        await permission(ctx, 'createTab');
        let isExist = await ctx.models.tab.findOne({
            where: {
                title: title
            }
        });
        if (isExist) {
            throw new UserError(ERRORS[401031]);
        }
        let tab = await ctx.models.tab.create({
            title: title,
            description: description
        });
        return tab;
    }
}

let tabAddNode = {
    type: resultType('tabAddNode'),
    description: '指定标签添加节点',
    args: {
        tabId: {
            type: new GraphQLNonNull(GraphQLInt),
            description: '标签编号'
        },
        nodeId: {
            type: new GraphQLNonNull(GraphQLInt),
            description: '节点编号'
        }
    },
    async resolve(parentValue, {tabId, nodeId}, ctx) {
        // await permission(ctx, 'tabAddNode');
        let tab = await ctx.models.tab.findById(tabId);
        if (!tab) {
            throw new UserError(ERRORS[401032]);
        }
        let node = await ctx.models.node.findById(nodeId);
        if (!node) {
            throw new UserError(ERRORS[401022]);
        }
        let result = tab.addNode(node);
        if (result) {
            return RESULTS[201001];
        } else {
            return RESULTS[201002];
        }
    }
}

let tabAddNodes = {
    type: resultType('tabAddNodes'),
    description: '指定标签批量添加节点',
    args: {
        tabId: {
            type: new GraphQLNonNull(GraphQLInt),
            description: '标签编号'
        },
        nodeIds: {
            type: new GraphQLNonNull(new GraphQLList(GraphQLInt)),
            description: '节点编号数组'
        }
    },
    async resolve(parentValue, {tabId, nodeIds}, ctx) {
        // await permission(ctx, 'tabAddNodes');
        let tab = await ctx.models.tab.findById(tabId);
        if (!tab) {
            throw new UserError(ERRORS[401032]);
        }
        let nodeArr = [];
        for (let index in nodeIds) {
            let nodeId = nodeIds[index];
            let node = await ctx.models.node.findById(nodeId);
            if (!node) {
                throw new UserError(ERRORS[401024]);
            }
            nodeArr.push(node)
        }
        for (let index in nodeArr) {
            let node = nodeArr[index];
            let result = tab.addNode(node);
            if (!result) {
                return RESULTS[201002];
            }
        }
        return RESULTS[201001];
    }
}

let tabRemoveNode = {
    type: resultType('tabRemoveNode'),
    description: '指定标签移除节点',
    args: {
        tabId: {
            type: new GraphQLNonNull(GraphQLInt),
            description: '标签编号'
        },
        nodeId: {
            type: new GraphQLNonNull(GraphQLInt),
            description: '节点编号'
        }
    },
    async resolve(parentValue, {tabId, nodeId}, ctx) {
        // await permission(ctx, 'tabRemoveNode');
        let tab = await ctx.models.tab.findById(tabId);
        if (!tab) {
            throw new UserError(ERRORS[401032]);
        }
        let node = await ctx.models.node.findById(nodeId);
        if (!node) {
            throw new UserError(ERRORS[401022]);
        }
        let result = tab.removeNode(node);
        if (result) {
            return RESULTS[201003];
        } else {
            return RESULTS[201004];
        }
    }
}

let tabRemoveNodes = {
    type: resultType('tabRemoveNodes'),
    description: '指定标签批量移除节点',
    args: {
        tabId: {
            type: new GraphQLNonNull(GraphQLInt),
            description: '标签编号'
        },
        nodeIds: {
            type: new GraphQLNonNull(new GraphQLList(GraphQLInt)),
            description: '节点编号数组'
        }
    },
    async resolve(parentValue, {tabId, nodeIds}, ctx) {
        // await permission(ctx, 'tabRemoveNodes');
        let tab = await ctx.models.tab.findById(tabId);
        if (!tab) {
            throw new UserError(ERRORS[401032]);
        }
        let nodeArr = [];
        for (let index in nodeIds) {
            let nodeId = nodeIds[index];
            let node = await ctx.models.node.findById(nodeId);
            if (!node) {
                throw new UserError(ERRORS[401024]);
            }
            nodeArr.push(node)
        }
        for (let index in nodeArr) {
            let node = nodeArr[index];
            let result = tab.removeNode(node);
            if (!result) {
                return RESULTS[201004];
            }
        }
        return RESULTS[201003];
    }
}

export default {
    createTab: createTab,
    tabAddNode: tabAddNode,
    tabAddNodes: tabAddNodes,
    tabRemoveNode: tabRemoveNode,
    tabRemoveNodes: tabRemoveNodes
}
