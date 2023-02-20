const {Category} = require('../models/models')

async function getCategory(req, res){
    const {id} = req.params
    const category = await Category.findByPk(id)
    if(!category) {
        return res.status(404).json({message: 'Категория не найдена'})
    }
    return res.status(200).json(category)
}

async function getCategories(req, res){
    const categories = await Category.findAll()
    return res.status(200).json(categories)
}

async function createCategory(req, res) {
    const {title, description} = req.body
    const isExist = await Category.findOne({where: {title: title}})
    if(isExist) {
        return res.status(409).json({message: 'Данная категория уже существует'})
    }
    const category = await Category.create({title: title, description: description})
    return res.status(200).json(category)
}
async function updateCategory(req, res) {
    const {title, description} = req.body
    const {id} = req.params
    const category = await Category.findByPk(id)
    if(!category) {
        return res.status(404).json({message: 'Категория не найдена'})
    }
    await category.update({title: title, description: description})
    return res.status(200).json({message: 'Успешно обновлено', category: category})
}

async function deleteCategory(req, res) {
    const {id} = req.params
    const category = await Category.findByPk(id)
    if(!category) {
        return res.status(404).json({message: 'Категория не найдена'})
    }
    await category.destroy()
    return res.status(200).json({message: 'Успешно удалено'})
}

module.exports = {createCategory, getCategories, getCategory, updateCategory, deleteCategory}