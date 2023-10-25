import express from "express"
import { CommentController } from "../controller/CommentController"
import { CommentBusiness } from "../business/CommentBusiness"
import { CommentDatabase } from "../database/CommentDatabase"
import { TokenManager } from "../services/TokenManager"
import { PostDatabase } from "../database/PostDatabase"
import { IdGenerator } from "../services/IdGenerator"
import { UserDatabase } from "../database/UserDatabase"
import { LikeDislikeCommentDatabase } from "../database/LikeDislikeCommentDatabase"

export const commentRouter = express.Router()

const newCommentController = new CommentController(
    new CommentBusiness(
        new CommentDatabase(),
        new UserDatabase(),
        new TokenManager(),
        new PostDatabase(),
        new IdGenerator(),
        new LikeDislikeCommentDatabase()
    )
)

commentRouter.post('/post/:id', newCommentController.createComment)
commentRouter.put('/:id', newCommentController.editComment)
commentRouter.delete('/:id', newCommentController.deleteComment)
commentRouter.get('/', newCommentController.getComment)