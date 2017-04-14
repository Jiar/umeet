import { signup, signin, user, users } from '../../api/user'
import * as types from '../mutation-types.js'

const state = {
    error: null,
    signinUser: null,
    signupUser: null,
    singleUser: null,
    users: []
}

const getters = {
    error: state => state.error,
    signinUser: state => state.signinUser,
    signupUser: state => state.signupUser,
    users: state => state.users
}

const mutations = {
    [types.USER_SIGNUP](state, {signupUser, error}) {
        if (error) {
            state.error = error;
        }
        state.signupUser = signupUser;
    },
    [types.USER_SIGNIN](state, {signinUser, error}) {
        if (error) {
            state.error = error;
        }
        state.signinUser = signinUser;
    },
    [types.USER_USER](state, {singleUser}) {
        if (error) {
            state.error = error;
        }
        state.singleUser = singleUser;
    },
    [types.USER_USERS](state, {users}) {
        if (error) {
            state.error = error;
        }
        state.users = users;
    }
}

const actions = {
    signup({commit}, {name, email, password}) {
        signup(name, email, password)
        .then(signup=>commit(types.USER_SIGNUP,{signup}))
    },
    signin({commit}, {account, password}) {
        let self = this;
        return new Promise((resolve) => {
            signin(account, password).then( result => {
                resolve(result.user);
                commit(types.USER_SIGNIN, { signinUser: result.user });
            }).catch(error => {
                resolve(error);
                commit(types.USER_SIGNIN, { error: error });
            });
        });
    },
    user({commit}, {id}) {
        user(id)
        .then(user=>commit(types.USER_USER,{user}))
    },
    users({commit}, {page, order, limit}) {
        users(page, order, limit)
        .then(users=>commit(types.USER_USERS,{users}))
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
