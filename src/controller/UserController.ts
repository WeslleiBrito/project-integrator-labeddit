import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { ZodError } from "zod";
import { BaseError } from "../errors/BaseError";
import { InputSignupSchema, OutputSignupDTO } from "../dtos/InputSignup.dto";


export class UserController {
    
    constructor (
        private userBusiness: UserBusiness
    ){}

    public signup = async (req: Request, res: Response) => {
        
        try {

            const input = InputSignupSchema.parse(
                {
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                }
            )

            const output: OutputSignupDTO = await this.userBusiness.signup(input)
            
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