import { UserError } from 'graphql-errors'
import jwt from 'jsonwebtoken'
import ERRORS from './errors'

let permission = async function (ctx) {
    if (ctx.session.user) {
        ctx.user = ctx.session.user;
        return;
    }
    let token = ctx.headers['x-api-token']
    if (!token) {
        throw new UserError(ERRORS[411002]);
    }
    let user = null;
    try {
        user = jwt.verify(token, ctx.config.secret);
    } catch (e) {
       throw new UserError(ERRORS[411001]);
    }
    console.log(user)
    user = await ctx.models.user.findById(user.id);
    if (!user) {
        throw new UserError(ERRORS[411001]);
    }
    ctx.user = user;
    if (!ctx.user) {
        throw new UserError(ERRORS[411002]);
    }
    if (ctx.user.id != 1) {
        throw new UserError(ERRORS[411003]);
    }
}

export default permission
