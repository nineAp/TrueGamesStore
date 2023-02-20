const Router = require('express')
const isAdmin = require('../middlewares/isAdminMiddleware')
const router = new Router()
const {getScreenshotsByGame, createScreenshot, updateScreenshot, deleteScreenshot} = require('../services/screenshotService')

router.get('/:id', getScreenshotsByGame)
router.post('/', isAdmin, createScreenshot)
router.patch('/:id', isAdmin, updateScreenshot)
router.delete('/:id', isAdmin, deleteScreenshot)

module.exports = router