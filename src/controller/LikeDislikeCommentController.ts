import { Request, Response } from "express";
import { BaseError } from "../errors/BaseError";
import { ZodError } from "zod";
import { LikeDislikeCommentBusiness } from "../business/LikeDislikeCommentBusiness";
import { InputLikeDislikeCommentsSchema } from "../dtos/likeDislikeComments/InputLikeDislikeComments.dto";


export class LikeDislikeCommentController {

    constructor (
        private likeDislikeCommentBusiness: LikeDislikeCommentBusiness
    ) {}

    public likeDislike = async (req: Request, res: Response) => {

        try {
            const input = InputLikeDislikeCommentsSchema.parse(
                {
                    token: req.headers.authorization,
                    id: req.params.id,
                    like: req.body.like
                }
            )
    
            const output = await this.likeDislikeCommentBusiness.likeDislike(input)

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
}