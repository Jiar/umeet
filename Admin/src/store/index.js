import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import sort from './modules/sort'
import post from './modules/post'
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

// export interface StoreOptions<S> {
//   state?: S;
//   getters?: GetterTree<S, S>;
//   actions?: ActionTree<S, S>;
//   mutations?: MutationTree<S>;
//   modules?: ModuleTree<S>;
//   plugins?: Plugin<S>[];
//   strict?: boolean;
// }

export default new Vuex.Store({
    state,
    getters,
    mutations,
    modules: {
        user,
        sort,
        post,
        comment
    }
})
