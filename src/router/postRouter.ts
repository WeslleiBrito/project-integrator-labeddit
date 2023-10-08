import express from "express"
import { PostController } from "../controller/PostController"
import { PostBusiness } from "../business/PostBusiness"
import { PostDatabase } from "../database/PostDatabase"
import { TokenManager } from "../services/TokenManager"
import { IdGenerator } from "../services/IdGenerator"
import { UserDatabase } from "../database/UserDatabase"
import { CommentDatabase } from "../database/CommentDatabase"

export const postRouter = express.Router()

const newPostController = new PostController(
    new PostBusiness(
        new PostDatabase(),
        new CommentDatabase(),
        new UserDatabase(),
        new TokenManager(),
        new IdGenerator(),
    )
)

postRouter.post("/", newPostController.createPost)
postRouter.put("/:id", newPostController.editPost)
postRouter.delete("/:id", newPostController.deletePost)
postRouter.get('/', newPostController.getPost)