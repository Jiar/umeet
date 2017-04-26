import KoaRouter from 'koa-router'

const router = KoaRouter()

/**
 * 获取所有标签
 */
router.get('/', async(ctx, next) => {
    console.log('tab/index')
    ctx.body = 'tab/index'
})

export default router
