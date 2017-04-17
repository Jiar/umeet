import { client } from './index'

function createSort(pid, email, description) {
    let graphql = `
    {
        sort: createSort(pid:${pid}, title:"${email}", description:"${description}") {
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

function sort(id) {
    let graphql = `
    {
        sort: sort(id:${id}) {
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

function sorts(page, order, limit) {
    let graphql = `
    {
        sort: sorts(page:${page}, order:"${order}", limit:${limit}) {
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
    createSort,
    sort,
    sorts
}
