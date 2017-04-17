import { createPost, post, posts } from '../../api/post'
import * as types from '../mutation-types.js'

const state = {
    createdPost: null,
    post: null,
    posts: []
}

const getters = {
    createdPost: state => state.createdPost,
    post: state => state.post,
    posts: state => state.posts
}

const mutations = {
    [types.POST_CREATEDPOST](state, {createdPost, error}) {
        if (error) {
            state.error = error;
        }
        state.createdPost = createdPost;
    },
    [types.POST_POST](state, {post, error}) {
        if (error) {
            state.error = error;
        }
        state.post = post;
    },
    [types.POST_POSTS](state, {posts, error}) {
        if (error) {
            state.error = error;
        }
        state.posts = posts;
    }
}

const actions = {
    createPost({commit}, {pid, email, description}) {
        let self = this;
        return new Promise((resolve) => {
            createPost(pid, email, description).then( result => {
                resolve(result.post);
                commit(types.POST_CREATEDPOST, { createdPost: result.post });
            }).catch(error => {
                resolve(error);
                commit(types.POST_CREATEDPOST, { error: error });
            });
        });
    },
    post({commit}, {id}) {
        let self = this;
        return new Promise((resolve) => {
            post(id).then( result => {
                resolve(result.post);
                commit(types.POST_POST, { post: result.post });
            }).catch(error => {
                resolve(error);
                commit(types.POST_POST, { error: error });
            });
        });
    },
    posts({commit}, {page, order, limit}) {
        let self = this;
        return new Promise((resolve) => {
            posts(page, order, limit).then( result => {
                resolve(result.post);
                commit(types.POST_POSTS, { posts: result.post });
            }).catch(error => {
                resolve(error);
                commit(types.POST_POSTS, { error: error });
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
