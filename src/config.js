

const PORT = process.env.PORT || 5000
const SECRET = 'nok'
process.DEFAULT = {}
process.DEFAULT.pagination = {}
process.DEFAULT.pagination.page = 1
process.DEFAULT.pagination.limit = 3

export{
    PORT,
    SECRET
}