import Koa from 'koa'
import KoaRouter from 'koa-router'
import Redis from 'ioredis'
import Models from './models'
import graphqlHTTP from 'koa-graphql'
import convert from 'koa-convert'
import schema from './schema'
import router from './controller'
import jwt from "jsonwebtoken"
import json from 'koa-json'
import bodyParser from 'koa-bodyparser'
// import SessionStore from './middleware/session-store'
import cors from 'koa2-cors'

class App {
    constructor(config, srcPath) {
        this.config = config
        router.all('/graphql', convert(graphqlHTTP({
            schema: schema,
            graphiql: this.config.debug,
            formatError(error) {
                console.log(error)
                return {
                    code: error.code,
                    message: error.message,
                    locations: error.locations,
                    path: error.path
                }
            }
        })))
        this.koa = new Koa()
            .use(cors({
                credentials: true,
                allowMethods: ['GET', 'POST', 'DELETE']
            }))
            .use(json())
            .use(bodyParser())
            // .use(SessionStore)
            .use(this.localError())
            .use(router.routes())
            .use(router.allowedMethods());
        this.koa.proxy = true
        this.koa.context.models = this.models()
        this.koa.context.redis = this.redis()
        this.koa.context.config = this.config
    }

    localError() {
        return async (ctx, next) => {
            if (ctx.session.error) {
                ctx.state.error = ctx.session.error
                delete ctx.session.error
            }
            await next()
        }
    }

    redis() {
        return new Redis(this.config.redis)
    }

    models() {
        return new Models(this.config.mysql)
    }

}

module.exports = App
