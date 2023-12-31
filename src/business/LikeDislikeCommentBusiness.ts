import { CommentDatabase } from "../database/CommentDatabase";
import { LikeDislikeCommentDatabase } from "../database/LikeDislikeCommentDatabase";
import { InputLikeDislikeCommentsDTO } from "../dtos/likeDislikeComments/InputLikeDislikeComments.dto";
import { OutputLikeDislikePostDTO } from "../dtos/likeDislikePosts/InputLikeDislikePost.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { TokenManager } from "../services/TokenManager";
import { LikeDislikeCommentDB } from "../types/types";


export class LikeDislikeCommentBusiness {

    constructor (
        private likeDislikeCommentDatabase: LikeDislikeCommentDatabase,
        private commentDatabase: CommentDatabase,
        private tokenManager: TokenManager
    )
    {}

    public likeDislike = async (input: InputLikeDislikeCommentsDTO): Promise<OutputLikeDislikePostDTO> => {

        const {token, like, id} = input

        const tokenIsValid = this.tokenManager.validateToken(token)

        if(!tokenIsValid){
            throw new BadRequestError("Refaça o login, para renovar seu token.")
        }

        const  comment = await this.commentDatabase.findCommentById(id)

        if(!comment){
            throw new NotFoundError("Comentário inválido.")
        }

        if(comment.id_user === tokenIsValid.id){
            throw new UnauthorizedError(`Por ser o criador do comentário você não tem autorização para ${like ? "curtir" : "descurtir"}.`)
        }
        
        const likeDislikeExist = await this.likeDislikeCommentDatabase.findLikeByCommentByUser({user_id: tokenIsValid.id, comment_id: id})
        const output: OutputLikeDislikePostDTO = {message: ""}

        if(likeDislikeExist){
            if(likeDislikeExist.like === (like ? 1 : 0)) {
                await this.likeDislikeCommentDatabase.deleteLike({user_id: tokenIsValid.id, comment_id: id})
                
                if(like){
                    await this.commentDatabase.editComment({content: comment.content, id: id, like: comment.like - 1, dislike: comment.dislike, updated_at: comment.updated_at})
                }else{
                    await this.commentDatabase.editComment({content: comment.content, id: id, like: comment.like, dislike: comment.dislike - 1, updated_at: comment.updated_at})
                }

                output.message = `${like ? "Like" : "Dislike" } deletado com sucesso.`
            }else{
                if(like){
                    await this.likeDislikeCommentDatabase.editLike({comment_id: id, user_id: tokenIsValid.id, like: 1 })
                    await this.commentDatabase.editComment({content: comment.content, id: id, like: comment.like + 1, dislike: comment.dislike - 1, updated_at: comment.updated_at})
                }else{
                    await this.likeDislikeCommentDatabase.editLike({comment_id: id, user_id: tokenIsValid.id, like: 0 })
                    await this.commentDatabase.editComment({content: comment.content, id: id, like: comment.like - 1, dislike: comment.dislike + 1, updated_at: comment.updated_at})
                }

                output.message = `${like ? "Dislike editado para like" : "Like editado para dislike" } com sucesso.`
            }
        }else{
            
            const inputDB: LikeDislikeCommentDB = {
                user_id: tokenIsValid.id,
                comment_id: id,
                like: like ? 1 : 0
            }

            await this.likeDislikeCommentDatabase.createLike(inputDB)

            if(like){
                await this.commentDatabase.editComment({content: comment.content, id: id, like: comment.like + 1, dislike: comment.dislike, updated_at: comment.updated_at})
            }else{
                await this.commentDatabase.editComment({content: comment.content, id: id, like: comment.like, dislike: comment.dislike + 1, updated_at: comment.updated_at})
            }

            output.message = `${like ? "Like" : "Dislike" } criado com sucesso.`
        }
        
        
        return output
    }
}