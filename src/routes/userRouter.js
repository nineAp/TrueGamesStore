const Router = require('express')
const router = new Router()
const {registration, auth} = require('../services/userService')

router.post('/registration', registration)
router.post('/auth', auth)
module.exports = router