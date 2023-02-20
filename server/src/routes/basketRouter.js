const Router = require('express')
const router = new Router()
const isAuth = require('../middlewares/isAuthMiddleware')
const {addGameToBasket, removeGameFromBasket, getBasketGames} = require('../services/basketService')

router.get('/', isAuth, getBasketGames)
router.post('/', isAuth, addGameToBasket)
router.delete('/', isAuth, removeGameFromBasket)

module.exports = router