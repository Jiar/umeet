import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import sort from './modules/sort'
import post from './modules/post'
import comment from './modules/comment'

Vue.use(Vuex)

const state = {
  
}

const mutations = {

}

export default new Vuex.Store({
    state,
    mutations,
    modules: {
        user,
        sort,
        post,
        comment
    }
})
