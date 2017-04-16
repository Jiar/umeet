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
    [types.USER_USER](state, {singleUser, error}) {
        if (error) {
            state.error = error;
        }
        state.singleUser = singleUser;
    },
    [types.USER_USERS](state, {users, error}) {
        if (error) {
            state.error = error;
        }
        state.users = users;
    }
}

const actions = {
    signup({commit}, {name, email, password}) {
        let self = this;
        return new Promise((resolve) => {
            signup(name, email, password).then( result => {
                resolve(result.user);
                commit(types.USER_SIGNUP, { signupUser: result.user });
            }).catch(error => {
                resolve(error);
                commit(types.USER_SIGNUP, { error: error });
            });
        });
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
        let self = this;
        return new Promise((resolve) => {
            user(id).then( result => {
                resolve(result.user);
                commit(types.USER_USER, { user: result.user });
            }).catch(error => {
                resolve(error);
                commit(types.USER_USER, { error: error });
            });
        });
    },
    users({commit}, {page, order, limit}) {
        let self = this;
        return new Promise((resolve) => {
            users(page, order, limit).then( result => {
                console.log(eval(result));
                resolve(result.user);
                commit(types.USER_USERS, { users: result.user });
            }).catch(error => {
                resolve(error);
                commit(types.USER_USERS, { error: error });
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
