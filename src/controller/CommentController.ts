import { Request, Response } from "express";
import { BaseError } from "../errors/BaseError";
import { ZodError } from "zod";
import { CommentBusiness } from "../business/CommentBusiness";
import { InputCreateCommentSchema } from "../dtos/comments/InputCreateComment.dto";
import { InputEditCommentSchema } from "../dtos/comments/InputEditComment.dto";
import { InputDeleteCommentSchema } from "../dtos/comments/InputDeleteComment.dto";
import { InputGetCommentsSchema } from "../dtos/comments/InputGetComments.dto";


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

    public editComment = async (req: Request, res: Response) => {
        
        try {

            const input = InputEditCommentSchema.parse(
                {
                    token: req.headers.authorization,
                    id: req.params.id,
                    content: req.body.content
                }
            )
    
            const output = await this.commentBusiness.editComment(input)

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
    
    public deleteComment = async (req: Request, res: Response) => {
        
        try {

            const input = InputDeleteCommentSchema.parse(
                {
                    token: req.headers.authorization,
                    id: req.params.id
                }
            )
    
            const output = await this.commentBusiness.deleteComment(input)

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

    public getComment = async (req: Request, res: Response) => {
        
        try {

            const input = InputGetCommentsSchema.parse(
                {
                    token: req.headers.authorization
                }
            )
    
            const output = await this.commentBusiness.getComments(input)

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