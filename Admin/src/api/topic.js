import { client } from './index'

function createTopic(nodeId, userId, title, type, content) {
    let graphql = `
    {
        topic: createTopic(nodeId:${nodeId}, userId:${userId}, title:"${title}", type:${type}, content:"${content}") {
            id,
            node {
                id,
                pid,
                title,
                description,
                createTime
            },
            user {
                id,
                name,
                email,
                nick,
                motto,
                avatar,
                score,
                createTime,
                lastUpdateTime,
                lastLoginTime,
                lastLoginIp
            },
            title,
            type,
            content,
            createTime,
            isModified
        }
    }
    `
    return client.mutate(graphql)
}

function topic(id) {
    let graphql = `
    {
        topic: topic(id:${id}) {
            id,
            node {
                id,
                pid,
                title,
                description,
                createTime
            },
            user {
                id,
                name,
                email,
                nick,
                motto,
                avatar,
                score,
                createTime,
                lastUpdateTime,
                lastLoginTime,
                lastLoginIp
            },
            title,
            type,
            content,
            createTime,
            isModified
        }
    }
    `
    return client.query(graphql);
}

function topics(page, order, limit) {
    let graphql = `
    {
        topic: topics(page:${page}, order:"${order}", limit:${limit}) {
            rows {
                id,
                node {
                    id,
                    pid,
                    title,
                    description,
                    createTime
                },
                user {
                    id,
                    name,
                    email,
                    nick,
                    motto,
                    avatar,
                    score,
                    createTime,
                    lastUpdateTime,
                    lastLoginTime,
                    lastLoginIp
                },
                title,
                type,
                content,
                createTime,
                isModified
            },
            page,
            pages,
            count,
            limit
        }
    }
    `
    return client.query(graphql);
}

export {
    createTopic,
    topic,
    topics
}
