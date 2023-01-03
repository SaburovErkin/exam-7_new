import {read, write} from '../utils/model.js'
import { SECRET } from '../config.js'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import checkToken from '../middlewares/checkToken.js'




const GET = (req, res) => {
    try {
        let admins = read('admins').filter(admin => delete admin.password)
        res.send(admins)
    } catch (error) {
        
    }
}


const LOGIN = (checkToken, (req, res) => {
    try {
        let admins = read('admins');
        let { adminname, password } = req.body;
        password = crypto.createHash('sha256').update(password).digest('hex');
        let admin = admins.find(
            (admin) => admin.adminname == adminname && admin.password == password
        );


        if (!admin) {
            throw new Error('wrong adminname or password')
        }else{
            res.status(200).json({
                status:200, message:'success', token: jwt.sign({adminId: admin.adminId}, SECRET)
            })
        }
    } catch (error) {
        res.status(400).json({
            status:400, message: error.message
        })
    }
})



const REGISTER = (req, res) => {
    try {
        let admins = read('admins')
        let { adminname, password, gender } = req.body
        password = crypto.createHash('sha256').update(password).digest('hex')
        let newAdmin = {
            adminId: admins.at(-1)?.adminId + 1 || 1, adminname, password, gender
        }

        admins.push(newAdmin)
        write('admins', admins)

        res.status(201).json({ status:201, message:'new admin added', data: newAdmin, token: jwt.sign({adminId: newAdmin.adminId}, SECRET) })

    } catch (error) {
        res.status(400).json({ status:400, message:'error' })
    }
}



export default {
    GET,
    LOGIN,
    REGISTER
}