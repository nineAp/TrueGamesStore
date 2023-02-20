const jwt = require('jsonwebtoken')
function isAuth(req, res, next) {
    const headers = req.headers
    if(headers.authorization == undefined) {
        return res.status(403).json({message: "Пользователь не авторизован"})
    }
    const token = headers.authorization.split(' ')
    try {
        const verify = jwt.verify(token[1], process.env.SECRET_KEY)
        if (verify) {
            req.body.verify = verify
            return next()
        }
    } catch (e) {
        return res.status(403).json({message: 'Срок действия вашего токена истёк'})
    }
    return res.status(403).json({message: "Пользователь не авторизован"})
}

module.exports = isAuth