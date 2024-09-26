import express from 'express'
import authRoutes from './routes/auth-routes'
import userRoutes from './routes/user-routes'
import strashipRoutes from './routes/starship-routes'
import cors from 'cors'
import globalErrorHandler from './middlewares/error.handler'

const app = express()



app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.static('public'))
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/', strashipRoutes )
app.use(globalErrorHandler)


export {app}