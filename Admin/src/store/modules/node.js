import { createNode, node, nodes } from '../../api/node'
import * as types from '../mutation-types.js'

const state = {
    createdNode: null,
    node: null,
    nodes: []
}

const getters = {
    createdNode: state => state.createdNode,
    node: state => state.node,
    nodes: state => state.nodes
}

const mutations = {
    [types.NODE_CREATEDNODE](state, {createdNode, error}) {
        if (error) {
            state.error = error;
        }
        state.createdNode = createdNode;
    },
    [types.NODE_NODE](state, {node, error}) {
        if (error) {
            state.error = error;
        }
        state.node = node;
    },
    [types.NODE_NODES](state, {nodes, error}) {
        if (error) {
            state.error = error;
        }
        state.nodes = nodes;
    }
}

const actions = {
    createNode({commit}, {pid, email, description}) {
        let self = this;
        return new Promise((resolve) => {
            createNode(pid, email, description).then( result => {
                resolve(result.node);
                commit(types.NODE_CREATEDNODE, { createdNode: result.node });
            }).catch(error => {
                resolve(error);
                commit(types.NODE_CREATEDNODE, { error: error });
            });
        });
    },
    node({commit}, {id}) {
        let self = this;
        return new Promise((resolve) => {
            node(id).then( result => {
                resolve(result.node);
                commit(types.NODE_NODE, { node: result.node });
            }).catch(error => {
                resolve(error);
                commit(types.NODE_NODE, { error: error });
            });
        });
    },
    nodes({commit}, {page, order, limit}) {
        let self = this;
        return new Promise((resolve) => {
            nodes(page, order, limit).then( result => {
                resolve(result.node);
                commit(types.NODE_NODES, { nodes: result.node });
            }).catch(error => {
                resolve(error);
                commit(types.NODE_NODES, { error: error });
            });
        });
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
