import KoaRouter from 'koa-router'

import user from './user'
import sort from './sort'
import post from './post'
import comment from './comment'

const router = KoaRouter()

router.use('/user', user.routes(), user.allowedMethods())
router.use('/sort', sort.routes(), sort.allowedMethods())
router.use('/post', post.routes(), post.allowedMethods())
router.use('/comment', comment.routes(), comment.allowedMethods())

router.get('/login', async(ctx, next) => {
    console.log('/login')
    ctx.body = '/login'
})

export default router
