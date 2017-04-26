import KoaRouter from 'koa-router'

const router = KoaRouter()

/**
 * 获取所有主题
 */
router.get('/', async(ctx, next) => {
    console.log('topic/index')
    ctx.body = 'topic/index'
})

export default router
