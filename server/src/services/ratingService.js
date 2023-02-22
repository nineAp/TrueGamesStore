const {Rating, Game, User} = require('../models/models')


async function getDataForRate(req, res) {
    const verify = req.body.verify
    const {gameId} = req.body
    const game = await Game.findByPk(gameId)
    const user = await User.findByPk(verify.id)
    if(!game) {
        return res.status(404).json({message: 'Игра не найдена'})
    }
    return {game, user}
}


async function calculateRating(game) {
    const ratings = await game.getRatings()
    let ratings_sum = 0
    ratings.map((rate) => {
        ratings_sum+=rate.mark
    })
    const middle_mark = ratings_sum/ratings.length
    await game.update({middle_rate: middle_mark})
}

async function setRating(req, res) {
    const {game, user} = await getDataForRate(req, res)
    const {mark} = req.body
    const isExist = await Rating.findOne({where: {gameId: game.id, userId: user.id}})
    if(isExist) {
        return res.status(409).json({message: 'Оценка уже поставлена'})
    }
    const rating = await Rating.create({mark: mark})
    await rating.setGame(game)
    await rating.setUser(user)
    await calculateRating(game)
    return res.status(200).json({message: 'Оценка поставлена'})
}

async function updateRating(req, res) {
    const {game, user} = await getDataForRate(req, res)
    const {mark} = req.body
    const rating = await Rating.findOne({where: {gameId: game.id, userId: user.id}})
    if(!rating) {
        return res.status(500).json({message: 'Internal server error'})
    }
    await rating.update({mark: mark})
    await calculateRating(game)
    return res.status(200).json({message: 'Оценка обновлена'})
}

async function removeRating(req, res) {
    const {game, user} = await getDataForRate(req, res)
    const rating = await Rating.findOne({where: {gameId: game.id, userId: user.id}})
    if(!rating) {
        return res.status(500).json({message: 'Internal server error'})
    }
    await rating.destroy()
    await calculateRating(game)
    return res.status(200).json({message: 'Оценка убрана'})
}


async function getGameRatings(req, res) {
    const {gameId} = req.body
    const game = await Game.findByPk(gameId)
    if(!game) {
        return res.status(404).json({message: 'Игра не найдена'})
    }
    const ratings = await game.getRatings({
        include: [{model: User, attributes: ['first_name', 'last_name']}]
    })
    return res.status(200).json(ratings)
}

module.exports = {setRating, updateRating, removeRating, getGameRatings}