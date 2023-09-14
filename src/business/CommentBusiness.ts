import { CommentDatabase } from "../database/CommentDatabase";
import { PostDatabase } from "../database/PostDatabase";
import { UserDatabase } from "../database/UserDatabase";
import { InputCreateCommentDTO, OutputCreateCommentDTO } from "../dtos/comments/InputCreateComment.dto";
import { InputDeleteCommentDTO, OutputDeleteCommentDTO } from "../dtos/comments/InputDeleteComment.dto";
import { InputEditCommentDTO, OutputEditCommentDTO } from "../dtos/comments/InputEditComment.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { Comment } from "../models/Comment";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { InputCommentDB, USER_ROLES } from "../types/types";



export class CommentBusiness {

    constructor(
        private commentDatabase: CommentDatabase,
        private userDatabase: UserDatabase,
        private tokenManager: TokenManager,
        private postDatabase: PostDatabase,
        private idGenerator: IdGenerator
    ){}

    public createComment = async (input: InputCreateCommentDTO): Promise<OutputCreateCommentDTO> => {

        const {token, id, parentCommentId, content} = input

        const tokenIsValid = this.tokenManager.validateToken(token)

        const idComment = this.idGenerator.generate()

        if(!tokenIsValid){
            throw new BadRequestError("Refaça o login, para renovar seu token.")
        }

        const post = await this.postDatabase.findPostById(id)

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
            id: idComment,
            content,
            post_id: post.id,
            parent_comment_id: parentCommentId ? parentCommentId : null,
            id_user: tokenIsValid.id
        } 

        await this.commentDatabase.createComment(inputDb)

        return{
            message: "Comentário criado com sucesso!"
        }
    }

    public editComment =  async (input: InputEditCommentDTO): Promise<OutputEditCommentDTO> => {

        const {id, token, content} = input

        const tokenIsValid = this.tokenManager.validateToken(token)

        if(!tokenIsValid){
            throw new BadRequestError("Refaça o login, para renovar seu token.")
        }

        const commentDb = await this.commentDatabase.findCommentById(id)

        if(!commentDb){
            throw new NotFoundError("Comentário não localizado, verifique o id e tente novamente.")
        }

        if(commentDb.id_user !== tokenIsValid.id){
            throw new BadRequestError("Sua conta não tem autorização para editar este comentário")
        }

        const comment = new Comment(
            commentDb.id,
            commentDb.id_user,
            commentDb.post_id,
            commentDb.parent_comment_id,
            commentDb.amount_comment,
            commentDb.content,
            commentDb.created_at,
            commentDb.updated_at,
            commentDb.like,
            commentDb.dislike,
            []
        )

        comment.setContent(content)
        comment.setUpdateAt(new Date().toISOString())

        await this.commentDatabase.editComment({id, content, updated_at: comment.getUpdatedAt()})

        return {
            message: "Comentário editado com sucesso!"
        }
    }

    public deleteComment = async (input: InputDeleteCommentDTO): Promise<OutputDeleteCommentDTO> => {

        const {id, token} = input

        const tokenIsValid = this.tokenManager.validateToken(token)

        if(!tokenIsValid){
            throw new BadRequestError("Refaça o login, para renovar seu token.")
        }

        const commentDb = await this.commentDatabase.findCommentById(id)

        if(!commentDb){
            throw new NotFoundError("Comentário não localizado, verifique o id e tente novamente.")
        }


        if(tokenIsValid.role === USER_ROLES.NORMAL && commentDb.id_user !== tokenIsValid.id){
            throw new UnauthorizedError("Sua conta não tem permissão para deleter este comentário.")
        }
        
        const roleCreatorComment = await this.userDatabase.findUserById(commentDb.id_user) 

        if(roleCreatorComment && (tokenIsValid.role === USER_ROLES.ADMIN 
            && roleCreatorComment.role !== USER_ROLES.NORMAL) 
            && commentDb.id_user !== tokenIsValid.id){
                throw new UnauthorizedError("Sua conta não tem permissão para deleter este comentário.")
        }

        await this.commentDatabase.deleteComment(id)

        return {
            message: "Comentário deletado com sucesso!"
        }
    }
}