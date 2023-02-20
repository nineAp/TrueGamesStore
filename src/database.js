const { Sequelize } = require('sequelize')
module.exports = new Sequelize(
    process.env.DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: Number(process.env.DB_PORT)
})
