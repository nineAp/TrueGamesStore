const Router = require('express')
const router = new Router()
const isAuth = require('../middlewares/isAuthMiddleware')
const isAdmin = require('../middlewares/isAdminMiddleware')
const {getAllGames, getGamesByGenres, getOneGame, getGamesByCategories, updateGame, deleteGame, createGame} = require('../services/gameService')

router.get('', getAllGames)
router.get('/genre', getGamesByGenres)
router.get('/:id', getOneGame)
router.get('/category', getGamesByCategories)
router.post('', isAdmin, createGame)
router.patch('/:id', isAdmin, updateGame)
router.delete('/:id', isAdmin, deleteGame)
module.exports = router