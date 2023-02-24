const Router = require('express')
const isAuth = require('../middlewares/isAuthMiddleware')
const router = new Router()
const {createReview, deleteReview, updateReview, getReviews} = require('../services/reviewService')

router.get('/', getReviews)
router.post('/', isAuth, createReview)
router.patch('/', isAuth, updateReview)
router.delete('/', isAuth, deleteReview)

module.exports = router