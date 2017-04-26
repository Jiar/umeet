import { createTopic, topic, topics } from '../../api/topic'
import * as types from '../mutation-types.js'

const state = {
    createdTopic: null,
    topic: null,
    topics: []
}

const getters = {
    createdTopic: state => state.createdTopic,
    topic: state => state.topic,
    topics: state => state.topics
}

const mutations = {
    [types.TOPIC_CREATEDTOPIC](state, {createdTopic, error}) {
        if (error) {
            state.error = error;
        }
        state.createdTopic = createdTopic;
    },
    [types.TOPIC_TOPIC](state, {topic, error}) {
        if (error) {
            state.error = error;
        }
        state.topic = topic;
    },
    [types.TOPIC_TOPICS](state, {topics, error}) {
        if (error) {
            state.error = error;
        }
        state.topics = topics;
    }
}

const actions = {
    createTopic({commit}, {pid, email, description}) {
        let self = this;
        return new Promise((resolve) => {
            createTopic(pid, email, description).then( result => {
                resolve(result.topic);
                commit(types.TOPIC_CREATEDTOPIC, { createdTopic: result.topic });
            }).catch(error => {
                resolve(error);
                commit(types.TOPIC_CREATEDTOPIC, { error: error });
            });
        });
    },
    topic({commit}, {id}) {
        let self = this;
        return new Promise((resolve) => {
            topic(id).then( result => {
                resolve(result.topic);
                commit(types.TOPIC_TOPIC, { topic: result.topic });
            }).catch(error => {
                resolve(error);
                commit(types.TOPIC_TOPIC, { error: error });
            });
        });
    },
    topics({commit}, {page, order, limit}) {
        let self = this;
        return new Promise((resolve) => {
            topics(page, order, limit).then( result => {
                resolve(result.topic);
                commit(types.TOPIC_TOPICS, { topics: result.topic });
            }).catch(error => {
                resolve(error);
                commit(types.TOPIC_TOPICS, { error: error });
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
