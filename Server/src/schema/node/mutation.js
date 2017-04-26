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
import { nodeType } from './type'

let createNode = {
    type: nodeType,
    description: '创建节点',
    args: {
        pid: {
            type: GraphQLInt,
            description: '父节点编号'
        },
        tabId: {
            type: GraphQLInt,
            description: '标签编号'
        },
        title: {
            type: new GraphQLNonNull(GraphQLString),
            description: '标题'
        },
        pic: {
            type: GraphQLString,
            description: '图片路径'
        },
        description: {
            type: new GraphQLNonNull(GraphQLString),
            description: '描述'
        }
    },
    async resolve(parentValue, {pid, tabId, title, pic, description}, ctx) {
        // await permission(ctx, 'createNode');
        let isExist = await ctx.models.node.findOne({
            where: {
                title: title
            }
        });
        if (isExist) {
            throw new UserError(ERRORS[401021])
        }
        pid = pid || 0;
        if (pid != 0) {
            isExist = await ctx.models.node.findById(pid);
            if (!isExist) {
                throw new UserError(ERRORS[401023]);
            }
        }
        if (tabId) {
            isExist = await ctx.models.tab.findById(tabId);
            if (!isExist) {
                throw new UserError(ERRORS[401032]);
            }
        }
        let node = await ctx.models.node.create({
            pid: pid,
            tabId: tabId,
            title: title,
            pic: pic,
            description: description
        });
        return node;
    }
}

let nodeAddToTab = {
    type: resultType('nodeAddToTab'),
    description: '节点添加到指定标签',
    args: {
        nodeId: {
            type: new GraphQLNonNull(GraphQLInt),
            description: '节点编号'
        },
        tabId: {
            type: new GraphQLNonNull(GraphQLInt),
            description: '标签编号'
        }
    },
    async resolve(parentValue, {nodeId, tabId}, ctx) {
        // await permission(ctx, 'nodeAddToTab');
        let node = await ctx.models.node.findById(nodeId);
        if (!node) {
            throw new UserError(ERRORS[401022]);
        }
        let tab = await ctx.models.tab.findById(tabId);
        if (!tab) {
            throw new UserError(ERRORS[401032]);
        }
        let result = node.setTab(tab);
        if (result) {
            return RESULTS[201001];
        } else {
            return RESULTS[201002];
        }
    }
}

let nodeRemoveFromTab = {
    type: resultType('nodeRemoveFromTab'),
    description: '节点从标签中移除',
    args: {
        nodeId: {
            type: new GraphQLNonNull(GraphQLInt),
            description: '节点编号'
        }
    },
    async resolve(parentValue, {nodeId}, ctx) {
        // await permission(ctx, 'nodeRemoveFromTab');
        let node = await ctx.models.node.findById(nodeId);
        if (!node) {
            throw new UserError(ERRORS[401022]);
        }
        let result = node.setTab(null);
        if (result) {
            return RESULTS[201003];
        } else {
            return RESULTS[201004];
        }
    }
}

let nodeAddToParent = {
    type: resultType('nodeAddToParent'),
    description: '节点添加至指定父节点',
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLInt),
            description: '节点编号'
        },
        pid: {
            type: new GraphQLNonNull(GraphQLInt),
            description: '父节点编号'
        }
    },
    async resolve(parentValue, {id, pid}, ctx) {
        // await permission(ctx, 'nodeAddToParent');
        let node = await ctx.models.node.findById(id);
        if (!node) {
            throw new UserError(ERRORS[401022]);
        }
        let pNode = await ctx.models.node.findById(pid);
        if (!pNode) {
            throw new UserError(ERRORS[401023]);
        }
        let result = node.update({pid: pid});
        if (result) {
            return RESULTS[201001];
        } else {
            return RESULTS[201002];
        }
    }
}

let nodeRemoveFromParent = {
    type: resultType('nodeRemoveFromParent'),
    description: '节点从父节点移除，即：成为根节点',
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLInt),
            description: '节点编号'
        }
    },
    async resolve(parentValue, {id}, ctx) {
        // await permission(ctx, 'nodeRemoveFromParent');
        let node = await ctx.models.node.findById(id);
        if (!node) {
            throw new UserError(ERRORS[401022]);
        }
        let result = node.update({pid: 0});
        if (result) {
            return RESULTS[201003];
        } else {
            return RESULTS[201004];
        }
    }
}

let nodeAddSubNodes = {
    type: resultType('nodeAddSubNodes'),
    description: '节点批量添加子节点',
    args: {
        nodeId: {
            type: new GraphQLNonNull(GraphQLInt),
            description: '节点编号'
        },
        subNodeIds: {
            type: new GraphQLNonNull(new GraphQLList(GraphQLInt)),
            description: '子节点编号数组'
        }
    },
    async resolve(parentValue, {nodeId, subNodeIds}, ctx) {
        // await permission(ctx, 'nodeAddSubNodes');
        let node = await ctx.models.node.findById(nodeId);
        if (!node) {
            throw new UserError(ERRORS[401022]);
        }
        let subNodeArr = [];
        for (let index in subNodeIds) {
            let subNodeId = subNodeIds[index];
            let subNode = await ctx.models.node.findById(subNodeId);
            if (!subNode) {
                throw new UserError(ERRORS[401024]);
            }
            subNodeArr.push(subNode)
        }
        for (let index in subNodeArr) {
            let subNode = subNodeArr[index];
            let result = subNode.update({pid: nodeId});
            if (!result) {
                return RESULTS[201002];
            }
        }
        return RESULTS[201001];
    }
}

export default {
    createNode: createNode,
    nodeAddToTab: nodeAddToTab,
    nodeRemoveFromTab: nodeRemoveFromTab,
    nodeAddToParent: nodeAddToParent,
    nodeRemoveFromParent: nodeRemoveFromParent,
    nodeAddSubNodes: nodeAddSubNodes
}
