const {Review, User, Game} = require('../models/models')


async function createReview(req, res){
    const {verify} = req.body
    const {gameId} = req.body
    const {body, isRec} = req.body
    const user = await User.findByPk(verify.id)
    const game = await Game.findByPk(gameId)
    if(!game) {
        return res.status(404).json({message: 'Игра не найдена'})
    }
    const review = await Review.create({body, isRec})
    await review.setUser(user)
    await review.setGame(game)
    return res.status(200).json({message: 'Отзыв оставлен'})
}

async function updateReview(req, res){
    const {verify} = req.body
    const {gameId} = req.body
    const {body, isRec} = req.body
    const user = await User.findByPk(verify.id)
    const game = await Game.findByPk(gameId)
    if(!game) {
        return res.status(404).json({message: 'Игра не найдена'})
    }
    const review = await Review.findOne({where: {gameId: gameId, userId: verify.id}})
    await review.update({body, isRec})
    await review.setUser(user)
    await review.setGame(game)
    return res.status(200).json({message: 'Отзыв обновлён'})
}

async function deleteReview(req, res) {
    const {verify} = req.body
    const {gameId} = req.body
    const review = await Review.findOne({where: {gameId: gameId, userId: verify.id}})
    if(!review) {
        return res.status(404).json({message: 'Отзыв не найден'})
    }
    await review.destroy()
    return res.status(200).json({message: 'Отзыв удалён'})
}

async function getReviews(req, res) {
    const {gameId} = req.body
    const game = await Game.findByPk(gameId)
    if(!game) {
        return res.status(404).json({message: 'Игра не найдена'})
    }
    const reviews = await game.getReviews()
    return res.status(200).json(reviews)
}

module.exports = {getReviews, createReview, updateReview, deleteReview}
