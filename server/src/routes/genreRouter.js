const Router = require('express')
const {getAllGenres, getGenre, createGenre, updateGenre, deleteGenre} = require('../services/genreService')
const isAdmin = require('../middlewares/isAdminMiddleware')
const router = new Router()

router.get('', getAllGenres)
router.get('/:id', getGenre)
router.post('', isAdmin, createGenre)
router.patch('/:id', isAdmin, updateGenre)
router.delete('/:id', isAdmin, deleteGenre)
module.exports = router