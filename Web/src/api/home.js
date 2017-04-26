import { client } from './index'

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
    sorts
}
