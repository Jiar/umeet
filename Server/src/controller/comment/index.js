import KoaRouter from 'koa-router'

const router = KoaRouter()

/**
 * 获取所有评论
 */
router.get('/', async(ctx, next) => {
    console.log('comment/index')
    ctx.body = 'comment/index'
})

export default router