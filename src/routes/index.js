const Router = require('express')
const router = new Router()
const gamesRouter = require('./gamesRouter')
const userRouter = require('./userRouter')
const genreRouter = require('./genreRouter')
const categoryRouter = require('./categoryRouter')
const screenshotRouter = require('./screenshotRouter')
const basketRouter = require('./basketRouter')

router.use('/games', gamesRouter)
router.use('/users', userRouter)
router.use('/genres', genreRouter)
router.use('/categories', categoryRouter)
router.use('/screenshots', screenshotRouter)
router.use('/basket', basketRouter)

module.exports = router