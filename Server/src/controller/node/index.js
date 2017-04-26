import KoaRouter from 'koa-router'

const router = KoaRouter()

/**
 * 获取所有节点
 */
router.get('/', async(ctx, next) => {
    console.log('node/index')
    ctx.body = 'node/index'
})

export default router
