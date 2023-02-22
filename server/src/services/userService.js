const {User, Basket} = require('../models/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

async function registration(req, res) {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    const body = req.body
    if(!body.email.match(validRegex)) {
        return res.status(400).json({message: 'Некорректный email'})
    }
    const check = await User.findOne({
        where: {
            email: body.email
        }
    })
    if(check) {
        return res.send('Пользователь уже существует')
    }
    const basket = await Basket.create()
    const password = await bcrypt.hash(body.password, 4)
    const data = {...body, password: password, basketId: basket.id}
    const user = await User.create(data)
    await user.setBasket(basket)
    return res.json({token: createJwt(user)})
}

async function auth(req, res) {
    const body = req.body
    const user = await User.findOne({where: {email: body.email}})
    if(!user) {
        return res.status(404).json({message: 'Пользователя с таким email не существует'})
    }
    const isTruePassword = await bcrypt.compare(body.password, user.password)
    if(isTruePassword) {
        return res.status(200).json({token: createJwt(user)})
    }
    return res.status(403).json({message: "Неверный логин или пароль"})
}


function createJwt(user) {
    const token = jwt.sign({id: user.id, role: user.role, email: user.email, first_name: user.first_name, last_name: user.last_name},
        process.env.SECRET_KEY, {expiresIn: '24h'})
    return token
}



module.exports = {registration, auth}