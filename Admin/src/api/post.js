import { client } from './index'

function createPost(sortId, userId, title, type, content) {
    let graphql = `
    {
        post: createPost(sortId:${sortId}, userId:${userId}, title:"${title}", type:${type}, content:"${content}") {
            id,
            sort {
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

function post(id) {
    let graphql = `
    {
        post: post(id:${id}) {
            id,
            sort {
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

function posts(page, order, limit) {
    let graphql = `
    {
        post: posts(page:${page}, order:"${order}", limit:${limit}) {
            rows {
                id,
                sort {
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
    createPost,
    post,
    posts
}
