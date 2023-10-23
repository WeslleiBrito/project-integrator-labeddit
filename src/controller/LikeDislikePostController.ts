import { Request, Response } from "express";
import { BaseError } from "../errors/BaseError";
import { ZodError } from "zod";
import { LikeDislikePostBusiness } from "../business/LikeDislikePostBusiness";
import { InputLikeDislikePostSchema } from "../dtos/likeDislikePosts/InputLikeDislikePost.dto";
import { InputGetLikeDislikeSchema } from "../dtos/likeDislikePosts/InputGetLikeDislike.dto";


export class LikeDislikePostController {

    constructor (
        private likeDislikePostBusiness: LikeDislikePostBusiness
    ) {}

    public likeDislike = async (req: Request, res: Response) => {

        try {
            const input = InputLikeDislikePostSchema.parse(
                {
                    token: req.headers.authorization,
                    id: req.params.id,
                    like: req.body.like
                }
            )
    
            const output = await this.likeDislikePostBusiness.likeDislike(input)

            res.status(201).send(output)

        } catch (error) {
             if(error instanceof ZodError){
                res.status(400).send(error.issues)
            }else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.send("Erro inesperado\n " + error)
            }
        }
    }

    public getLikeDislikes = async (req: Request, res: Response) => {
        try {
            const input = InputGetLikeDislikeSchema.parse(
                {
                    token: req.headers.authorization
                }
            )
    
            const output = await this.likeDislikePostBusiness.getLikes(input)

            res.status(200).send(output)

        } catch (error) {
             if(error instanceof ZodError){
                res.status(400).send(error.issues)
            }else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.send("Erro inesperado\n " + error)
            }
        }
    }
}