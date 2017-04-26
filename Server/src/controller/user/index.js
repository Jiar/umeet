import KoaRouter from 'koa-router'

const router = KoaRouter()

/**
 * 获取所有用户
 */
router.get('/', async(ctx, next) => {
    console.log('user/index')
    ctx.body = 'user/index'
})

export default router
