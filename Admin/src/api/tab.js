import { client } from './index'

function createTab(pid, email, description) {
    let graphql = `
    {
        tab: createTab(pid:${pid}, title:"${email}", description:"${description}") {
            id,
            title,
            description,
            createTime
        }
    }
    `
    return client.mutate(graphql)
}

function tab(id) {
    let graphql = `
    {
        tab: tab(id:${id}) {
            id,
            title,
            description,
            createTime
        }
    }
    `
    return client.query(graphql);
}

function tabs(page, order, limit) {
    let graphql = `
    {
        tab: tabs(page:${page}, order:"${order}", limit:${limit}) {
            rows {
                id,
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
    createTab,
    tab,
    tabs
}
