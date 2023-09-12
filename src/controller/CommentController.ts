import { Request, Response } from "express";
import { CommentBusiness } from "../business/CommentBusiness";
import { InputCreateCommentSchema } from "../dtos/comments/InputCreateComment.dto";
import { ZodError } from "zod";
import { BaseError } from "../errors/BaseError";


export class CommentController {

    constructor(
        private commentBusiness: CommentBusiness
    ){}

    public createComment = async (req: Request, res: Response) => {

        try {
            const input = InputCreateCommentSchema.parse(
                {
                    token: req.headers.authorization,
                    id: req.params.id,
                    parentCommentId: req.body.parentCommentId,
                    content: req.body.content
                }
            )
    
            const output = await this.commentBusiness.createComment(input)

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