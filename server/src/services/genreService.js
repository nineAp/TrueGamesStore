const {Genre} = require('../models/models')

async function getGenre(req, res){
    const {id} = req.params
    const genre = await Genre.findByPk(id)
    if(!genre) {
        return res.status(404).json({message: 'Жанра не существует'})
    }
    return res.status(200).json(genre)
}
async function getAllGenres(req, res){
    const genres = await Genre.findAll()
    return res.status(200).json(genres)
}
async function createGenre(req, res) {
    const {title, description} = req.body
    const isExist = await Genre.findOne({where: {title: title}})
    if(isExist) {
        return res.status(409).json({message: 'Жанр уже существует'})
    }
    const genre = await Genre.create({title: title, description: description})
    return res.status(200).json(genre)

}
async function updateGenre(req, res) {
    const {title, description} = req.body
    const {id} = req.params
    const genre = await Genre.findByPk(id)
    if(!genre) {
        return res.status(404).json({message: 'Жанра не существует'})
    }
    await genre.update({title: title, description: description})
    return res.status(200).json(genre)
}

async function deleteGenre(req, res) {
    const {id} = req.params
    const genre = await Genre.findByPk(id)
    if(!genre) {
        return res.status(404).json({message: 'Жанра не существует'})
    }
    await genre.destroy()
    return res.status(200).json({message: 'Успешно удалено'})
}

module.exports = {getGenre, getAllGenres, createGenre, updateGenre, deleteGenre}