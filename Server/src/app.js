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

class App {
    constructor(config, srcPath) {
        this.config = config
        // router.all('/graphql', this.authMiddleWare() , convert(graphqlHTTP({
        router.all('/graphql', convert(graphqlHTTP({
            schema: schema,
            graphiql: true,
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
            .use(json())
            .use(router.routes())
            .use(router.allowedMethods());
        this.koa.proxy = true
        this.koa.context.models = this.models()
        this.koa.context.redis = this.redis()
        this.koa.context.config = this.config
    }

    authMiddleWare() {
        return async (ctx, next) => {
            let token = ctx.headers["x-api-token"] || ctx.query.token
            if (token) {
                let user = null
                try{
                    user = jwt.verify(token, ctx.config.secret);
                }catch(e) {
                    console.log(e)
                }
                if (user) {
                    user = await ctx.models.findById(user.id)
                    ctx.user = user
                    await next()
                }
                ctx.statusCode = 400
                ctx.body  = {code: 4001, msg: "invalid token"}
                return  
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