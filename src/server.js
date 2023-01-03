import express from 'express'
const app = express()
import cors from 'cors'
import { PORT } from './config.js'
import adminRouter from './router/adminAuth.router.js'
import postRouter from './router/post.router.js'
import fileUpload from 'express-fileupload'
import directionRouter from './router/direction.router.js'
import swaggerRouter from './swagger.js'



app.use(cors())
app.use(express.json())
app.use( fileUpload())


app.use( adminRouter )
app.use( postRouter )
app.use( directionRouter )
app.use('/api-docs', swaggerRouter )




app.listen(PORT, () => console.log('server url: http://localhost:' + PORT))