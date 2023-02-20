const Router = require('express')
const router = new Router()
const {updateCategory, getCategory, getCategories, deleteCategory, createCategory} = require('../services/categoryService')
const isAdmin = require('../middlewares/isAdminMiddleware')

router.get('/:id', getCategory)
router.get('/', getCategories)
router.post('/', isAdmin, createCategory)
router.patch('/:id', isAdmin, updateCategory)
router.delete('/:id', isAdmin, deleteCategory)

module.exports = router