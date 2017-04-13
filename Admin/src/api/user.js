import { client } from './index'
import md5 from 'md5'

function signin(account, password) {
    password = md5(password)
    let mutationQuery = `
    {
        user: signin(account:"${account}", password:"${password}"){
            token,
            id,
            name,
            email
        }
    }
    `
    return client.mutate(mutationQuery)
}

export {
    signin
}
