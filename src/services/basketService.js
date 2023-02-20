const {Game, User} = require('../models/models')

async function addGameToBasket(req, res) {
    const {gameId} = req.body
    const user_data = req.body.verify
    const user = await User.findByPk(user_data.id)
    const basket = await user.getBasket({include: [Game]})
    const game = await Game.findByPk(gameId)
    if(!game) {
        return res.status(404).json({message: 'Игра не найдена'})
    }
    await basket.addGame(game)
    return res.status(200).json({message: 'Игра успешно добавлена в корзину'})
}

async function removeGameFromBasket(req, res) {
    const {gameId} = req.body
    const user_data = req.body.verify
    const user = await User.findByPk(user_data.id)
    const basket = await user.getBasket({include: [Game]})
    const game = await Game.findByPk(gameId)
    if(!game) {
        return res.status(404).json({message: 'Игра не найдена'})
    }
    await basket.removeGame(game)
    return res.status(200).json({message: 'Игра успешно удалена из корзины'})
}

async function getBasketGames(req, res) {
    const user_data = req.body.verify
    const user = await User.findByPk(user_data.id)
    const basket = await user.getBasket({include: [Game]})
    return res.status(200).json(basket)
}


module.exports = {addGameToBasket, removeGameFromBasket, getBasketGames}