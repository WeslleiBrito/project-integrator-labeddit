import express from "express"
import { UserController } from "../controller/UserController"
import { UserBusiness } from "../business/UserBusiness"
import { UserDatabase } from "../database/UserDatabase"
import { IdGenerator } from "../services/IdGenerator"
import { HashManager } from "../services/HashManager"
import { TokenManager } from "../services/TokenManager"


export const userRouter = express.Router()


const newUserController = new UserController(
    new UserBusiness(
        new UserDatabase,
        new IdGenerator(),
        new HashManager(),
        new TokenManager()
    )
)

userRouter.post('/signup', newUserController.signup)
userRouter.post('/login', newUserController.login)
userRouter.put('/account/:id', newUserController.editAccount)
userRouter.delete('/account/:id', newUserController.deleteAccount)