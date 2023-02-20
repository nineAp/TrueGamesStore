const {Screenshot, Game} = require('../models/models')
const isImageLoaded = require('../utils/isImageLoaded')
const deleteImage = require('../utils/deleteImage')

async function getScreenshotsByGame(req, res) {
    const {id} = req.params
    const game = await Game.findByPk(id)
    if(!game) {
        return res.status(404).json({message: 'Игра не найдена'})
    }
    const screenshots = await game.getScreenshots()
    return res.status(200).json(screenshots)
}

async function createScreenshot(req, res) {
    const {gameId} = req.body
    const game = await Game.findByPk(gameId)
    if(!game) {
        return res.status(404).json({message: 'Игра не найдена'})
    }
    const filename = await isImageLoaded(req, 'image')
    const screenshot = await Screenshot.create({image: filename})
    await screenshot.setGame(game)
    return res.status(200).json({message: 'Успешно создано', screenshot: screenshot})
}

async function updateScreenshot(req, res) {
    const {id} = req.params
    const screenshot = await Screenshot.findByPk(id)
    if(!screenshot) {
        return res.status(404).json({message: 'Скриншот не найден'})
    }
    const filename = await isImageLoaded(req, 'image')
    if(!filename) {
        return res.status(500).json({message: 'Internal Server Error'})
    }
    await deleteImage(screenshot.image)
    await screenshot.update({image: filename})
    return res.status(200).json({message: 'Успешно обновлено', screenshot: screenshot})
}

async function deleteScreenshot(req, res) {
    const {id} = req.params
    const screenshot = await Screenshot.findByPk(id)
    if(!screenshot) {
        return res.status(404).json({message: 'Скриншот не найден'})
    }
    await deleteImage(screenshot.image)
    await screenshot.destroy()
    return res.status(200).json({message: 'Успешно удалено'})
}


module.exports = {getScreenshotsByGame, createScreenshot, updateScreenshot, deleteScreenshot}