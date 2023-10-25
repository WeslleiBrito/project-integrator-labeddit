import { CommentDatabase } from "../database/CommentDatabase";
import { LikeDislikeCommentDatabase } from "../database/LikeDislikeCommentDatabase";
import { PostDatabase } from "../database/PostDatabase";
import { UserDatabase } from "../database/UserDatabase";
import { InputCreateCommentDTO, OutputCreateCommentDTO } from "../dtos/comments/InputCreateComment.dto";
import { InputDeleteCommentDTO, OutputDeleteCommentDTO } from "../dtos/comments/InputDeleteComment.dto";
import { InputEditCommentDTO, OutputEditCommentDTO } from "../dtos/comments/InputEditComment.dto";
import { InputGetCommentsDTO } from "../dtos/comments/InputGetComments.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { CommentModel } from "../models/Comment";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { CommentDB, InputCommentDB, LikeDislikeCommentDB, USER_ROLES } from "../types/types";



export class CommentBusiness {

    constructor(
        private commentDatabase: CommentDatabase,
        private userDatabase: UserDatabase,
        private tokenManager: TokenManager,
        private postDatabase: PostDatabase,
        private idGenerator: IdGenerator,
        private likeDislikeCommentDatabase: LikeDislikeCommentDatabase
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


        await this.commentDatabase.editComment({id, content, updated_at: content, like: commentDb.like, dislike: commentDb.dislike})

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

    private mapComment = (commentDB: CommentDB): CommentModel => {
        return {
            id: commentDB.id,
            idUser: commentDB.id_user,
            postId: commentDB.post_id,
            parentCommentId: commentDB.parent_comment_id,
            content: commentDB.content,
            createdAt: commentDB.created_at,
            updatedAt: commentDB.updated_at,
            like: commentDB.like,
            dislike: commentDB.dislike,
            amountComment: commentDB.answer ? commentDB.answer.length : 0,
            answers: (commentDB.answer || []).map(this.mapComment),
            userInteractions: commentDB.user_interactions as Array<{userId: string, like: number}> | []
        };
    };

    private groupsComments = (comments: CommentDB[], interactions: LikeDislikeCommentDB[], parentId: string | null = null): CommentModel[] => {
        const result: CommentModel[] = []

        for (const comment of comments) {
            if (comment.parent_comment_id === parentId){
                const children = this.groupsComments(comments, interactions, comment.id)
                const commentModel = this.mapComment(comment)


                commentModel.userInteractions = interactions.filter(interaction => interaction.comment_id === comment.id).map(item => {
                    return {
                        userId: item.user_id,
                        like: item.like
                    }
                })

                if (children.length > 0) {

                    commentModel.answers = children;
                    commentModel.amountComment = commentModel.answers.length

                }else{
                    
                    commentModel.answers = [];
                }
                
                result.push(commentModel)
            }

        }

        return result
    }

    public getComments = async (input: InputGetCommentsDTO) => {

        const {token} = input

        const tokenIsValid = this.tokenManager.validateToken(token)

        if(!tokenIsValid){
            throw new BadRequestError("Refaça o login, para renovar seu token.")
        }

        const comment = await this.commentDatabase.getComments()
        const interactions = await this.likeDislikeCommentDatabase.getLikes()

        return this.groupsComments(comment, interactions)

    }
}