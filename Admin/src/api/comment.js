import { client } from './index'

function createComment(pid, postId, userId, content) {
    let graphql = `
    {
        comment: createComment(pid:${pid}, postId:${postId}, userId:${userId}, content:"${content}") {
            id,
            pid,
            post {
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
            content,
            createTime
        }
    }
    `
    return client.mutate(graphql)
}

function comment(id) {
    let graphql = `
    {
        comment: comment(id:${id}) {
            id,
            pid,
            post {
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
            content,
            createTime
        }
    }
    `
    return client.query(graphql);
}

function comments(page, order, limit) {
    let graphql = `
    {
        comment: comments(page:${page}, order:"${order}", limit:${limit}) {
            rows {
                id,
                pid,
                post {
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
                content,
                createTime
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
    createComment,
    comment,
    comments
}
