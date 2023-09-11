import { CommentDatabase } from "../database/CommentDatabase";
import { PostDatabase } from "../database/PostDatabase";
import { InputCreateCommentDTO, OutputCreateCommentDTO } from "../dtos/comments/InputCreateComment.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { InputCommentDB } from "../types/types";



export class CommentBusiness {

    constructor(
        private commentDatabase: CommentDatabase,
        private tokenManager: TokenManager,
        private postDatabase: PostDatabase,
        private idGenerator: IdGenerator
    ){}

    public createComment = async (input: InputCreateCommentDTO): Promise<OutputCreateCommentDTO> => {

        const {token, postId, parentCommentId, content} = input

        const tokenIsValid = this.tokenManager.validateToken(token)

        const id = this.idGenerator.generate()

        if(!tokenIsValid){
            throw new BadRequestError("Refaça o login, para renovar seu token.")
        }

        const post = await this.postDatabase.findPostById(postId)

        if(!post){
            throw new NotFoundError("Post não localizado, verifique o id da postagem e tente novamente.")
        }
        
        if(parentCommentId){

            const commentDb = await this.commentDatabase.findCommentById(parentCommentId)

            if(!commentDb){
                throw new NotFoundError("Comentário não localizado, verifique o id e tente novamente.")
            }

        }

        const inputDb: InputCommentDB = {
            content,
            id,
            post_id: post.id,
            parent_comment_id: parentCommentId ? parentCommentId : null,
            id_user: tokenIsValid.id
        } 

        await this.commentDatabase.createComment(inputDb)

        return{
            message: "Comentário criado com sucesso!"
        }
    }
}