import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import { ZodError } from "zod";
import { BaseError } from "../errors/BaseError";
import { InputPostSchema } from "../dtos/post/InputPost.dto";
import { InputEditPostSchema } from "../dtos/post/InputEditPost.dto";


export class PostController {

    constructor(
        private postBusiness: PostBusiness
    ){}

    public createPost = async (req: Request, res: Response) => {

        try {

            const input = InputPostSchema.parse(
                {
                    token: req.headers.authorization,
                    content: req.body.content
                }
            )

            const output = await this.postBusiness.createPost(input)

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

    public editPost = async (req: Request, res: Response) => {

        try {
            
            const input = InputEditPostSchema.parse(
                {
                    id: req.params.id,
                    token: req.headers.authorization,
                    content: req.body.content
                }
            )
            
            const output = await this.postBusiness.editPost(input)

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