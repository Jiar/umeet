import { UserError } from 'graphql-errors';

let permission = async function(ctx, module) {
    return;
    if (!ctx.user) {
        throw new UserError({
            code: 40030,
            msg: "用户未登陆"
        });
    }
}

export default permission