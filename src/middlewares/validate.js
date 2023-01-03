import { AvatarScheme } from "../utils/validation.js";

export default (req, res, next) => {
    try {
        if (req.url == '/posts' && req.method == 'POST') {
            let { error } = AvatarScheme.validate(req.body);
            if (error) throw error
        }

        return next()
    } catch (error) {
        res.status(400).json({ status:400, message:error.message })
    }
}