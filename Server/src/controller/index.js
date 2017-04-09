import KoaRouter from 'koa-router'

import user from './user'
import sort from './sort'
import post from './post'
import comment from './comment'

const router = KoaRouter()

router.use('/user', user.routes(), user.allowedMethods())
// router.use(user.routers())
// router.use(user.allowedMethods())

router.use('/sort', sort.routes(), sort.allowedMethods())
// router.use(sort.routers())
// router.use(sort.allowedMethods())

router.use('/post', post.routes(), post.allowedMethods())
// router.use(post.routers())
// router.use(post.allowedMethods())

router.use('/comment', comment.routes(), comment.allowedMethods())
// router.use(comment.routers())
// router.use(comment.allowedMethods())

export default router

// import KoaRouter from 'koa-router'
// const router = KoaRouter();
// export default router