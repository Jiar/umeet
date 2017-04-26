import { client } from './index'

function createNode(pid, email, description) {
    let graphql = `
    {
        node: createNode(pid:${pid}, title:"${email}", description:"${description}") {
            id,
            pid,
            title,
            description,
            createTime
        }
    }
    `
    return client.mutate(graphql)
}

function node(id) {
    let graphql = `
    {
        node: node(id:${id}) {
            id,
            pid,
            title,
            description,
            createTime
        }
    }
    `
    return client.query(graphql);
}

function nodes(page, order, limit) {
    let graphql = `
    {
        node: nodes(page:${page}, order:"${order}", limit:${limit}) {
            rows {
                id,
                pid,
                title,
                description,
                createTime
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
    createNode,
    node,
    nodes
}
