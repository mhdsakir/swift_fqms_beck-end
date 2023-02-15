const { expressjwt:expressJwt } = require('express-jwt')

function authJwt() {
    const secret = process.env.secret
    const api = process.env.API_URL

    return expressJwt({
        secret,
        algorithms: ['HS256'],
    }).unless({
        path: [
            `${api}/vehiown/login`,
            `${api}/shedown/login`,
            `${api}/vehiown/register`,
            `${api}/shedown/register`
        ]
    })
}

module.exports = authJwt