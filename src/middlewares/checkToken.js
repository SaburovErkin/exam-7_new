import { SECRET } from '../config.js'
import jwt from 'jsonwebtoken'



function checkToken(req, res, next) {
    try {
        let { token } = req.headers

        if (!token) {
            throw new Error('token Required')
        }

        let reult = jwt.verify(token, SECRET)

        next()
    } catch (error) {
        res.status(403).json({
            status:403, message: error.message
        })
    }
}

export default checkToken