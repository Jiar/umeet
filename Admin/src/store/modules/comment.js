import { createComment, comment, comments } from '../../api/comment'
import * as types from '../mutation-types.js'

const state = {
    createdComment: null,
    comment: null,
    comments: []
}

const getters = {
    createdComment: state => state.createdComment,
    comment: state => state.comment,
    comments: state => state.comments
}

const mutations = {
    [types.COMMENT_CREATEDCOMMENT](state, {createdComment, error}) {
        if (error) {
            state.error = error;
        }
        state.createdComment = createdComment;
    },
    [types.COMMENT_COMMENT](state, {comment, error}) {
        if (error) {
            state.error = error;
        }
        state.comment = comment;
    },
    [types.COMMENT_COMMENTS](state, {comments, error}) {
        if (error) {
            state.error = error;
        }
        state.comments = comments;
    }
}

const actions = {
    createComment({commit}, {pid, postId, userId, content}) {
        let self = this;
        return new Promise((resolve) => {
            createComment(pid, postId, userId, content).then( result => {
                resolve(result.comment);
                commit(types.COMMENT_CREATEDCOMMENT, { createdComment: result.comment });
            }).catch(error => {
                resolve(error);
                commit(types.COMMENT_CREATEDCOMMENT, { error: error });
            });
        });
    },
    comment({commit}, {id}) {
        let self = this;
        return new Promise((resolve) => {
            comment(id).then( result => {
                resolve(result.comment);
                commit(types.COMMENT_COMMENT, { comment: result.comment });
            }).catch(error => {
                resolve(error);
                commit(types.COMMENT_COMMENT, { error: error });
            });
        });
    },
    comments({commit}, {page, order, limit}) {
        let self = this;
        return new Promise((resolve) => {
            comments(page, order, limit).then( result => {
                resolve(result.comment);
                commit(types.COMMENT_COMMENTS, { comments: result.comment });
            }).catch(error => {
                resolve(error);
                commit(types.COMMENT_COMMENTS, { error: error });
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
