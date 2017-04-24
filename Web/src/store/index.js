import Vue from 'vue'
import Vuex from 'vuex'

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
    mutations
    // modules: {
    //     user,
    //     sort,
    //     post,
    //     comment
    // }
})
