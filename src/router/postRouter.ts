import express from "express"
import { PostController } from "../controller/PostController"
import { PostBusiness } from "../business/PostBusiness"
import { PostDatabase } from "../database/PostDatabase"
import { TokenManager } from "../services/TokenManager"
import { IdGenerator } from "../services/IdGenerator"

export const postRouter = express.Router()

const newPostController = new PostController(
    new PostBusiness(
        new PostDatabase(),
        new TokenManager(),
        new IdGenerator()
    )
)

postRouter.post("/", newPostController.createPost)
postRouter.put("/:id", newPostController.editPost)