import Lokka from 'lokka';
import { Transport } from 'lokka-transport-http';

class Client {

    constructor() {
        this.transport = new Lokka({
            transport: new Transport('http://127.0.0.1:6050/graphql')
        });
    }

    get request() {
        let headers = {}
        let token = null
        if (localStorage.user) {
            let user = localStorage.user
            try {
                user = JSON.parse(user)
                token = user.token
            } catch (e) {
                console.log(e)
            }
        }
        if (token) {
            this.transport._transport._httpOptions.headers['x-api-token'] = token
        }
        return this.transport
    }

    query(query) {
        let that = this
        return new Promise((resolve, reject) => {
            that.request.query(query).then(res => {
                resolve(res)
            }).catch(e => {
                if (e.rawError) {
                    let error = e.rawError[0]
                    if (error) {
                        let messge = error.message
                        return reject(messge)
                    }
                }
                reject({
                    code: 500,
                    msg: '服务器异常'
                })
            })
        })
    }

    mutate(query) {
        let that = this;
        return new Promise((resolve, reject) => {
            that.request.mutate(query).then(res => {
                resolve(res)
            }).catch(e => {
                if (e.rawError) {
                    let error = e.rawError[0]
                    if (error) {
                        let messge = error.message
                        return reject(messge)
                    }
                }
                reject({
                    code: 500,
                    msg: '服务器异常'
                })
            })
        })
    }

}

let client = new Client()

export {
    client
}
