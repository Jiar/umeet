import KoaRouter from 'koa-router'

const router = KoaRouter()

/**
 * 获取所有帖子
 */
router.get('/', async(ctx, next) => {
    console.log('post/index')
    ctx.body = 'post/index'
})

export default router