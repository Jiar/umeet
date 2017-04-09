import KoaRouter from 'koa-router'

const router = KoaRouter()

/**
 * 获取所有分类
 */
router.get('/', async(ctx, next) => {
    console.log('sort/index')
})

export default router