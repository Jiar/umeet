import { createTab, tab, tabs } from '../../api/tab'
import * as types from '../mutation-types.js'

const state = {
    createdTab: null,
    tab: null,
    tabs: []
}

const getters = {
    createdTab: state => state.createdTab,
    tab: state => state.tab,
    tabs: state => state.tabs
}

const mutations = {
    [types.TAB_CREATEDTAB](state, {createdTab, error}) {
        if (error) {
            state.error = error;
        }
        state.createdTab = createdTab;
    },
    [types.TAB_TAB](state, {tab, error}) {
        if (error) {
            state.error = error;
        }
        state.tab = tab;
    },
    [types.TAB_TABS](state, {tabs, error}) {
        if (error) {
            state.error = error;
        }
        state.tabs = tabs;
    }
}

const actions = {
    createTab({commit}, {pid, email, description}) {
        let self = this;
        return new Promise((resolve) => {
            createTab(pid, email, description).then( result => {
                resolve(result.tab);
                commit(types.TAB_CREATEDTAB, { createdTab: result.tab });
            }).catch(error => {
                resolve(error);
                commit(types.TAB_CREATEDTAB, { error: error });
            });
        });
    },
    tab({commit}, {id}) {
        let self = this;
        return new Promise((resolve) => {
            tab(id).then( result => {
                resolve(result.tab);
                commit(types.TAB_TAB, { tab: result.tab });
            }).catch(error => {
                resolve(error);
                commit(types.TAB_TAB, { error: error });
            });
        });
    },
    tabs({commit}, {page, order, limit}) {
        let self = this;
        return new Promise((resolve) => {
            tabs(page, order, limit).then( result => {
                resolve(result.tab);
                commit(types.TAB_TABS, { tabs: result.tab });
            }).catch(error => {
                resolve(error);
                commit(types.TAB_TABS, { error: error });
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
