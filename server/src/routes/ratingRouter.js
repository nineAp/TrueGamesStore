const Router = require('express')
const isAuth = require('../middlewares/isAuthMiddleware')
const router = new Router()
const {setRating, updateRating, removeRating, getGameRatings} = require('../services/ratingService')

router.post('/', isAuth, setRating)
router.patch('/', isAuth, updateRating)
router.delete('/', isAuth, removeRating)
router.get('/', getGameRatings)

module.exports = router
