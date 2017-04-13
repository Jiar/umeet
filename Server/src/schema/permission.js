import { UserError } from 'graphql-errors'
import ERRORS from './error'

let permission = async function ( ctx ) {
    if (ctx.session.user) {
        ctx.user = ctx.session.user
        return
    }
    let token = ctx.headers['x-api-token']
    if (token) {
        let user = null
        try {
            user = jwt.verify(token, ctx.config.secret)
        } catch (e) {
            console.log(e)
        }
        if (user) {
            user = await ctx.models.findById(user.id)
            ctx.user = user
        }
        ctx.statusCode = 500
        ctx.body = ERRORS[411001]
        return
    }
    if (!ctx.user) {
        throw new UserError(ERRORS[411002])
    }
    if (ctx.user.id != 1) {
        throw new UserError(ERRORS[411003])
    }
}

export default permission
