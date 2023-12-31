import express from 'express'
import cors from 'cors'
import { userRouter } from './router/userRouter'
import dontenv from 'dotenv'
import { postRouter } from './router/postRouter'
import { commentRouter } from './router/commentRouter'
import { likeDislikePostRouter } from './router/likeDislikePostRouter'
import { likeDislikeCommentRouter } from './router/likeDislikeCommentRouter'

dontenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.listen(Number(process.env.PORT || 3003), () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`)
})

app.use('/users', userRouter)
app.use('/post', postRouter)
app.use('/comment', commentRouter)
app.use('/posts', likeDislikePostRouter)
app.use('/comments', likeDislikeCommentRouter)