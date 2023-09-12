import express from "express"
import { CommentController } from "../controller/CommentController"
import { CommentBusiness } from "../business/CommentBusiness"
import { CommentDatabase } from "../database/CommentDatabase"
import { TokenManager } from "../services/TokenManager"
import { PostDatabase } from "../database/PostDatabase"
import { IdGenerator } from "../services/IdGenerator"

export const commentRouter = express.Router()

const newCommentController = new CommentController(
    new CommentBusiness(
        new CommentDatabase(),
        new TokenManager(),
        new PostDatabase(),
        new IdGenerator()
    )
)

commentRouter.post('/:id/comment', newCommentController.createComment)