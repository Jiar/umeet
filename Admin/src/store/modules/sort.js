import { createSort, sort, sorts } from '../../api/sort'
import * as types from '../mutation-types.js'

const state = {
    createdSort: null,
    sort: null,
    sorts: []
}

const getters = {
    createdSort: state => state.createdSort,
    sort: state => state.sort,
    sorts: state => state.sorts
}

const mutations = {
    [types.SORT_CREATEDSORT](state, {createdSort, error}) {
        if (error) {
            state.error = error;
        }
        state.createdSort = createdSort;
    },
    [types.SORT_SORT](state, {sort, error}) {
        if (error) {
            state.error = error;
        }
        state.sort = sort;
    },
    [types.SORT_SORTS](state, {sorts, error}) {
        if (error) {
            state.error = error;
        }
        state.sorts = sorts;
    }
}

const actions = {
    createSort({commit}, {pid, email, description}) {
        let self = this;
        return new Promise((resolve) => {
            createSort(pid, email, description).then( result => {
                resolve(result.sort);
                commit(types.SORT_CREATEDSORT, { createdSort: result.sort });
            }).catch(error => {
                resolve(error);
                commit(types.SORT_CREATEDSORT, { error: error });
            });
        });
    },
    sort({commit}, {id}) {
        let self = this;
        return new Promise((resolve) => {
            sort(id).then( result => {
                resolve(result.sort);
                commit(types.SORT_SORT, { sort: result.sort });
            }).catch(error => {
                resolve(error);
                commit(types.SORT_SORT, { error: error });
            });
        });
    },
    sorts({commit}, {page, order, limit}) {
        let self = this;
        return new Promise((resolve) => {
            sorts(page, order, limit).then( result => {
                resolve(result.sort);
                commit(types.SORT_SORTS, { sorts: result.sort });
            }).catch(error => {
                resolve(error);
                commit(types.SORT_SORTS, { error: error });
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
