import { read, write } from '../utils/model.js'
import path from 'path'
import { time } from 'console'
// import moment from 'moment'




const GET = (req, res) => {
    try {
        let posts = read('posts')
        let { postId, userName, title, day, time, type,
        page = process.DEFAULT.pagination.page,
        limit = process.DEFAULT.pagination.limit } = req.query
        
        
        
        let data = posts.filter((post) => {
            let byPostId = postId ? post.postId == postId : true
            let byName = userName ? post.userName.toLowerCase().includes(userName.toLowerCase()) : true
            let byTitle = title ? post.title.toLowerCase().includes(title.toLowerCase()) : true
            let byDay = day ? post.day.includes(day) : true
            let byTime = time ? post.time.includes(time) : true
            let byType = type ? post.type.includes(type) : true
            
            return byPostId && byTitle && byDay && byTime && byType && byName 
        }).slice(( page - 1 ) * limit, page * limit)
        
        res.send(data)
    } catch (error) {
        res.status(400).json({ status:400, message:error.message })
    }
}


const POST = (req, res, next) => {
    try {
        let posts = read('posts')
        let { userName, profession, title, desctiption, body, place, day, time, type, link, number} = req.body
        let { avatar } = req.files
        
        
        let fileName = Date.now() + avatar.name.replace(/\s/g, '');
        avatar.mv(path.resolve('uploads', fileName))
        
        let newPost = {
            postId: posts.at(-1)?.postId + 1 || 1,
            userName, profession, title, desctiption, body, place, day, time, type, link, number, avatar: fileName
        }
        
        
        posts.push(newPost)
        write('posts', posts)
        res.status(201).json({ status:1, message:'new post added', data: newPost})

        return next()
    } catch (error) {
        res.status(400).json({ status:400, message:error.message })
    }
}



export default {
    GET,
    POST
}