import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import { ZodError } from "zod";
import { BaseError } from "../errors/BaseError";
import { InputPostSchema } from "../dtos/post/InputPost.dto";
import { InputEditPostSchema } from "../dtos/post/InputEditPost.dto";
import { InputDeletePostSchema } from "../dtos/post/InputDeletePost.dto";
import { InputGetPostsSchema } from "../dtos/post/InputGetPosts.dto";


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

    public deletePost = async (req: Request, res: Response) => {

        try {
            
            const input = InputDeletePostSchema.parse(
                {
                    id: req.params.id,
                    token: req.headers.authorization
                }
            )
            
            const output = await this.postBusiness.deletePost(input)

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


    public getPost = async (req: Request, res: Response) => {

        try {
            
            const input = InputGetPostsSchema.parse(
                {
                    token: req.headers.authorization
                }
            )
            
            const output = await this.postBusiness.getPosts(input)

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