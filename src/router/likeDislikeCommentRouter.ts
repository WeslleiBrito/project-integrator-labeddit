import express from "express"
import { TokenManager } from "../services/TokenManager"
import { LikeDislikeCommentController } from "../controller/LikeDislikeCommentController"
import { LikeDislikeCommentBusiness } from "../business/LikeDislikeCommentBusiness"
import { LikeDislikeCommentDatabase } from "../database/LikeDislikeCommentDatabase"
import { CommentDatabase } from "../database/CommentDatabase"

export const likeDislikeCommentRouter = express.Router()


const newLikeDislikeCommentController = new LikeDislikeCommentController(
    new LikeDislikeCommentBusiness(
        new LikeDislikeCommentDatabase(),
        new CommentDatabase(),
        new TokenManager()
    )
)


likeDislikeCommentRouter.post('/:id/like', newLikeDislikeCommentController.likeDislike)
