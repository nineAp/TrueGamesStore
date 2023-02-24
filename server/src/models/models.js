const sequelize = require('../database')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING, unique: false},
    first_name: {type: DataTypes.STRING, unique: false, maxLength: 255, allowNull: true, defaultValue: 'Аноним'},
    last_name: {type: DataTypes.STRING, unique: false, maxLength: 255, allowNull: true},
    role: {type: DataTypes.STRING, defaultValue: 'USER', allowNull: false}
}, {timestamps: false})


const Game = sequelize.define('game', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    title: {type: DataTypes.STRING, unique: true, maxLength: 255},
    description: {type: DataTypes.TEXT},
    price: {type: DataTypes.INTEGER},
    discount: {type: DataTypes.INTEGER, defaultValue: 0},
    poster: {type: DataTypes.STRING, defaultValue: 'no_image.jpeg'},
    middle_rate: {type: DataTypes.FLOAT, defaultValue: 0.00}
}, {timestamps: false})


const Category = sequelize.define('category', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    title: {type: DataTypes.STRING, maxLength: 255},
    description: {type: DataTypes.TEXT},
}, {timestamps: false})

const Genre = sequelize.define('genre', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    title: {type: DataTypes.STRING, maxLength: 255},
    description: {type: DataTypes.TEXT},
}, {timestamps: false})

const Screenshot = sequelize.define('screenshot', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    image: {type: DataTypes.STRING}
}, {timestamps: false})

const Review = sequelize.define('review', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    body: {type: DataTypes.TEXT, allowNull: false},
    isRec: {type: DataTypes.BOOLEAN}
})

const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    mark: {type: DataTypes.INTEGER}
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
}, {timestamps: false})

const GameGenre = sequelize.define('game_genre', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
}, {timestamps: false})

const GameCategory = sequelize.define('game_category', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
}, {timestamps: false})

const GameInBasket = sequelize.define('game_basket', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
}, {timestamps: false})

User.hasOne(Basket)
Basket.belongsTo(User)

Game.belongsToMany(Genre, {through: GameGenre, timestamps: false, onDelete: 'CASCADE'})
Genre.belongsToMany(Game, {through: GameGenre, timestamps: false, onDelete: 'CASCADE'})

Game.belongsToMany(Category, {through: GameCategory, timestamps: false, onDelete: 'CASCADE'})
Category.belongsToMany(Game, {through: GameCategory, timestamps: false, onDelete: 'CASCADE'})

Game.belongsToMany(Basket, {through: GameInBasket, timestamps: false, onDelete: 'CASCADE'})
Basket.belongsToMany(Game, {through: GameInBasket, timestamps: false, onDelete: 'CASCADE'})

Game.hasMany(Screenshot, {onDelete:'CASCADE'})
Screenshot.belongsTo(Game)

User.hasMany(Review)
Game.hasMany(Review)
Review.belongsTo(User)
Review.belongsTo(Game)

User.hasMany(Rating)
Game.hasMany(Rating)
Rating.belongsTo(Game)
Rating.belongsTo(User)



module.exports = {User, Game, Genre, Category, Basket, Screenshot, GameGenre, GameCategory, GameInBasket, Rating, Review}