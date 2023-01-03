import { read, write} from '../utils/model.js'

const GET = (req, res) => {
    try {

        let categories = read('categories')
        let sub_categories = read('sub_categories')
    
        categories.map(categotry => {
            categotry.sub_category = sub_categories.filter(sub_category => sub_category.category_id == categotry.category_id)
        })
            
        res.send( categories )
    } catch (error) {
        res.status(400).json({ status:400, message:error.message })
    }
}

export default {
    GET
}