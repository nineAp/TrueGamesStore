const {Game, Genre, Category} = require('../models/models')
const isImageLoaded = require('../utils/isImageLoaded')
const deleteImage = require('../utils/deleteImage')


async function getAllGames(req, res) {
    let {limit, page} = req.query
    limit = limit || 9
    page = page || 1
    let offset = page*limit - limit
    const games = await Game.findAll({include: [Genre, Category], limit, offset})
    return res.json(games)
}

async function getGamesByGenres(req, res) {
    const {genresId} = req.body
    let {limit, page} = req.query
    limit = limit || 9
    page = page || 1
    let offset = page*limit - limit
    if(!genresId) {
        return res.status(500).json({message: 'Internal Error'})
    }
    const genres = await Genre.findAll({where: {id: genresId}, limit, offset})
    const response = []
    for(let genre of genres) {
        response.push(...await genre.getGames())
    }
    res.status(200).json(response)
}

async function getGamesByCategories(req, res) {
    const {categoriesId} = req.body
    let {limit, page} = req.queryя
    limit = limit || 9
    page = page || 1
    let offset = page*limit - limit
    if(!categoriesId) {
        return res.status(500).json({message: 'Internal Error'})
    }
    const categories = await Category.findAll({where: {id: categoriesId}, limit, offset})
    const response = []
    for(let category of categories) {
        response.push(...await category.getGames())
    }
    res.status(200).json(response)
}

async function getOneGame(req, res) {
    const {id} = req.params
    if(!id) {
        return res.status(500).json({message: 'Internal Error'})
    }
    const game = await Game.findByPk(id, {include: [Genre, Category]})
    if(!game) {
        return res.status(404).json({message: 'Does not exist'})
    }
    return res.status(200).json(game)
}

async function createGame(req, res) {
    const {title, description, price, discount, genresId, categoriesId} = req.body
    const isExist = await Game.findOne({where: {title: title}})
    if(isExist) {
        return res.status(409).json({message: 'Игра уже существует'})
    }
    const game = await Game.create({title: title, description: description, price: price,
    discount: discount})
    if(genresId && categoriesId) {
        const genres = await Genre.findAll({where: {id: genresId}})
        const categories = await Category.findAll({where: {id: categoriesId}})
        await game.setGenres(genres)
        await game.setCategories(categories)
    }
    const filename = await isImageLoaded(req, 'poster')
    if(filename) {
        await game.update({poster: filename})
    }
    return res.status(200).json({message: 'Успешно создано', game: game})

}

async function updateGame(req, res) {
    const {title, description, price, discount, genresId, categoriesId} = req.body
    const {id} = req.params
    const game = await Game.findByPk(id)
    if(!game) {
        return res.status(404).json({message: 'Игры не существует'})
    }
    if(genresId && categoriesId) {
        const genres = await Genre.findAll({where: {id: genresId}})
        const categories = await Category.findAll({where: {id: categoriesId}})
        await game.setGenres(genres)
        await game.setCategories(categories)
    }
    await game.update({title: title, description: description, price: price, discount: discount})
    const filename = await isImageLoaded(req, 'poster')
    if(filename) {
        await deleteImage(game.poster)
        await game.update({poster: filename})
    }
    return res.status(200).json({message: 'Успешно обновлено', game: game})
}

async function deleteGame(req, res) {
    const {id} = req.params
    const game = await Game.findByPk(id)
    if(!game) {
        return res.status(404).json({message: 'Игра не создана или уже удалена'})
    }
    await deleteImage(game.poster)
    await game.destroy()
    return res.status(200).json({message: 'Успешно удалено'})
}



module.exports = {getAllGames, getGamesByGenres, getGamesByCategories, getOneGame, createGame, updateGame, deleteGame}