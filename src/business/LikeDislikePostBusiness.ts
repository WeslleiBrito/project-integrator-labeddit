import { LikeDislikePostDatabase } from "../database/LikeDislikePostDatabase";
import { PostDatabase } from "../database/PostDatabase";
import { InputLikeDislikePostDTO, OutputLikeDislikePostDTO } from "../dtos/likeDislikePosts/InputLikeDislikePost.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { TokenManager } from "../services/TokenManager";
import { LikeDislikePostDB } from "../types/types";


export class LikeDislikePostBusiness {

    constructor (
        private likeDislikePostDatabase: LikeDislikePostDatabase,
        private postDatabase: PostDatabase,
        private tokenManager: TokenManager
    )
    {}

    public likeDislike = async (input: InputLikeDislikePostDTO): Promise<OutputLikeDislikePostDTO> => {

        const {token, like, id} = input

        const tokenIsValid = this.tokenManager.validateToken(token)

        if(!tokenIsValid){
            throw new BadRequestError("Refaça o login, para renovar seu token.")
        }

        const post = await this.postDatabase.findPostById(id)

        if(!post){
            throw new NotFoundError("Post inválido.")
        }

        if(post.user_id === tokenIsValid.id){
            throw new UnauthorizedError(`Por ser o criador do post você não tem autorização para ${like ? "curtir" : "descurtir"}.`)
        }
        
        const likeDislikeExist = await this.likeDislikePostDatabase.findLikeByPostByUser({user_id: tokenIsValid.id, post_id: id})
        const output: OutputLikeDislikePostDTO = {message: ""}

        if(likeDislikeExist){
            if(likeDislikeExist.like === (like ? 1 : 0)) {
                await this.likeDislikePostDatabase.deleteLike({user_id: tokenIsValid.id, post_id: id})
                
                if(like){
                    await this.postDatabase.editPost({content: post.content, id: id, like: post.like - 1, dislike: post.dislike, updateAt: post.updated_at})
                }else{
                    await this.postDatabase.editPost({content: post.content, id: id, like: post.like, dislike: post.dislike - 1, updateAt: post.updated_at})
                }

                output.message = `${like ? "Like" : "Dislike" } deletado com sucesso.`
            }else{
                if(like){
                    await this.likeDislikePostDatabase.editLike({post_id: id, user_id: tokenIsValid.id, like: 1 })
                    await this.postDatabase.editPost({content: post.content, id: id, like: post.like + 1, dislike: post.dislike - 1, updateAt: post.updated_at})
                }else{
                    await this.likeDislikePostDatabase.editLike({post_id: id, user_id: tokenIsValid.id, like: 0 })
                    await this.postDatabase.editPost({content: post.content, id: id, like: post.like - 1, dislike: post.dislike + 1, updateAt: post.updated_at})
                }

                output.message = `${like ? "Dislike editado para like" : "Like editado para dislike" } com sucesso.`
            }
        }else{
            
            const inputDB: LikeDislikePostDB = {
                user_id: tokenIsValid.id,
                post_id: id,
                like: like ? 1 : 0
            }

            await this.likeDislikePostDatabase.createLike(inputDB)

            if(like){
                await this.postDatabase.editPost({content: post.content, id: id, like: post.like + 1, dislike: post.dislike, updateAt: post.updated_at})
            }else{
                await this.postDatabase.editPost({content: post.content, id: id, like: post.like, dislike: post.dislike + 1, updateAt: post.updated_at})
            }

            output.message = `${like ? "Like" : "Dislike" } criado com sucesso.`
        }
        
        
        return output
    }
}