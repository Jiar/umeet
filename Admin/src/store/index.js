import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import node from './modules/node'
import topic from './modules/topic'
import comment from './modules/comment'

Vue.use(Vuex)

const state = {
    error: null
}

const getters = {
    error: state => state.error,
}

const mutations = {

}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    modules: {
        user,
        node,
        topic,
        comment
    }
})
