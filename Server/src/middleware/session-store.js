import Redis from 'ioredis'
import session from 'koa-session2'
import Store from 'koa-session2/libs/store'

class RedisStore extends Store {

    constructor() {
        super()
        this.redis = new Redis()
    }

    async get(sid) {
        let data = await this.redis.get(`SESSION:${sid}`)
        return JSON.parse(data)
    }

    async set(session, { sid = this.getID(24), maxAge = 1000000 } = {}) {
        try {
            await this.redis.set(`SESSION:${sid}`, JSON.stringify(session), 'EX', maxAge / 1000)
        } catch (e) {
            console.log(e)
        }
        return sid
    }

    async destroy(sid) {
        return await this.redis.del(`SESSION:${sid}`)
    }

}

export default session({
    store: new RedisStore()
})
