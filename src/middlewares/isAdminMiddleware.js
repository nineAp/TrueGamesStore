const jwt = require('jsonwebtoken')
function isAdmin(req, res, next) {
    const headers = req.headers
    if(headers.authorization == undefined) {
        return res.status(403).json({message: "Пользователь не авторизован"})
    }
    const token = headers.authorization.split(' ')
    try {
        const verify = jwt.verify(token[1], process.env.SECRET_KEY)
        if (verify) {
            if(verify.role == 'ADMIN') {
                req.body.verify = verify
                return next()
            }
            return res.status(403).json({message: "Доступ запрещён"})
        }
    } catch (e) {
        return res.status(403).json({message: 'Срок действия вашего токена истёк'})
    }
    return res.status(403).json({message: "Пользователь не авторизован"})
}

module.exports = isAdmin