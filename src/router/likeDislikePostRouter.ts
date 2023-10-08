import express from "express"
import { LikeDislikePostController } from "../controller/LikeDislikePostController"
import { LikeDislikePostBusiness } from "../business/LikeDislikePostBusiness"
import { LikeDislikePostDatabase } from "../database/LikeDislikePostDatabase"
import { PostDatabase } from "../database/PostDatabase"
import { TokenManager } from "../services/TokenManager"

export const likeDislikePostRouter = express.Router()


const newLikeDislikePostController = new LikeDislikePostController(
    new LikeDislikePostBusiness(
        new LikeDislikePostDatabase(),
        new PostDatabase(),
        new TokenManager()
    )
)


likeDislikePostRouter.post('/:id/like', newLikeDislikePostController.likeDislike)
