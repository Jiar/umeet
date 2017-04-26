import KoaRouter from 'koa-router'

import user from './user'
import node from './node'
import tab from './tab'
import topic from './topic'
import comment from './comment'

const router = KoaRouter()

router.use('/user', user.routes(), user.allowedMethods())
router.use('/node', node.routes(), node.allowedMethods())
router.use('/tab', tab.routes(), tab.allowedMethods())
router.use('/topic', topic.routes(), topic.allowedMethods())
router.use('/comment', comment.routes(), comment.allowedMethods())

router.get('/login', async(ctx, next) => {
    console.log('/login')
    ctx.body = '/login'
})

export default router
