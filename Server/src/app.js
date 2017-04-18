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
import SessionStore from './middleware/session-store'
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
        })));
        this.koa = new Koa();
        this.koa.use(cors({
                credentials: true,
                allowMethods: ['GET', 'POST', 'DELETE']
            }));
        this.koa.use(json());
        this.koa.use(bodyParser());
        this.koa.use(SessionStore);
        this.koa.use(this.localError());
        // this.koa.use(this.interceptorGraphql());
        this.koa.use(router.routes());
        this.koa.use(router.allowedMethods());
        this.koa.proxy = true;

        this.koa.context.models = this.models();
        this.koa.context.redis = this.redis();
        this.koa.context.config = this.config;
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

    interceptorGraphql() {
        return async (ctx, next) => {
            if (ctx.request.path == '/graphql') {
                if (ctx.request.header['x-api-token']) {
                    return;
                }
            }
            await router.redirect('/login');
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
