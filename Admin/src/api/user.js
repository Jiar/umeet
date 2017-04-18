import { client } from './index'
import md5 from 'md5'

function signup(name, email, password) {
    password = md5(password)
    let graphql = `
    {
        user: signup(name:"${name}", email:"${email}", password:"${password}") {
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
        }
    }
    `
    return client.mutate(graphql)
}

function signin(account, password) {
    password = md5(password)
    let graphql = `
    {
        user: signin(account:"${account}", password:"${password}") {
            token,
            id,
            name,
            email
        }
    }
    `
    return client.mutate(graphql);
}

function user(id) {
    let graphql = `
    {
        user: user(id:"${id}") {
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
        }
    }
    `
    return client.query(graphql)
}

function users(page, order, limit) {
    let graphql = `
    {
        user: users(page:${page}, order:"${order}", limit:${limit}) {
            rows {
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
            page,
            pages,
            count,
            limit
        }
    }
    `
    return client.query(graphql)
}

export {
    signup,
    signin,
    user,
    users
}
