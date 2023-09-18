import { CommentDatabase } from "../database/CommentDatabase";
import { PostDatabase } from "../database/PostDatabase";
import { UserDatabase } from "../database/UserDatabase";
import { InputGetPostsDTO, OutputGetPostsDTO } from "../dtos/post/ImputGetPosts.dto";
import { InputDeletePostDTO, OutputDeletePostDTO } from "../dtos/post/InputDeletePost.dto";
import { InputEditPostDTO, OutputEditPostDTO } from "../dtos/post/InputEditPost.dto";
import { InputPostDTO, OutputPostDTO } from "../dtos/post/InputPost.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { CommentModel } from "../models/Comment";
import { Post} from "../models/Post";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { CommentDB, USER_ROLES} from "../types/types";



export class PostBusiness {

    constructor(
        private postDatabase: PostDatabase,
        private commentDatabase: CommentDatabase,
        private userDatabase: UserDatabase,
        private tokenManager: TokenManager,
        private idGenerator: IdGenerator
    ){}
    
    public createPost = async (input: InputPostDTO): Promise<OutputPostDTO> => {

        const {token, content} = input

        const tokenIsValid = this.tokenManager.validateToken(token)

        if(!tokenIsValid){
            throw new BadRequestError("Refaça o login, para renovar seu token.")
        }

        const id = this.idGenerator.generate()

        await this.postDatabase.createPost({id, content, user_id: tokenIsValid.id})

        return {
            message: "Post criado com sucesso!"
        }
    }

    public editPost = async (input: InputEditPostDTO): Promise<OutputEditPostDTO> => {

        const {id, token, content} = input

        const tokenIsValid = this.tokenManager.validateToken(token)

        if(!tokenIsValid){
            throw new BadRequestError("Refaça o login, para renovar seu token.")
        }

        const post = await this.postDatabase.findPostById(id)
        
        if(!post){
            throw new NotFoundError("Id não encontrado.")
        }

        if(tokenIsValid.id !== post.user_id){
            throw new UnauthorizedError("Sua conta não tem permissão para fazer a edição deste post.")
        }

        await this.postDatabase.editPost({id, content, updateAt: new Date().toISOString()})

        return {
            message: "Post editado com sucesso!"
        }
    }

    public deletePost = async (input: InputDeletePostDTO): Promise<OutputDeletePostDTO> => {

        const {id, token } = input

        const tokenIsValid = this.tokenManager.validateToken(token)

        if(!tokenIsValid){
            throw new BadRequestError("Refaça o login, para renovar seu token.")
        }

        const post = await this.postDatabase.findPostById(id)
        
        if(!post){
            throw new NotFoundError("Id não encontrado.")
        }

        const roleCreatorPost = await this.userDatabase.findUserById(post.user_id)

        if(tokenIsValid.role === USER_ROLES.NORMAL && post.user_id !== tokenIsValid.id){
            throw new UnauthorizedError("Sua conta não tem permissão para deletar o post de outro usuário.")
        }
        
        if(roleCreatorPost && tokenIsValid.role === USER_ROLES.ADMIN && post.user_id !== tokenIsValid.id && roleCreatorPost.role !== USER_ROLES.NORMAL){
            throw new UnauthorizedError("Sua conta não tem permissão para deletar o post desse usuário.")
        }


        await this.postDatabase.deletePost(id)

        return {
            message: "Post deletado com sucesso!"
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
        };
    };

    private groupsComments = (comments: CommentDB[], parentId: string | null = null): CommentModel[] => {
        const result: CommentModel[] = []

        for (const comment of comments) {
            if (comment.parent_comment_id === parentId){
                const children = this.groupsComments(comments, comment.id)
                const commentModel = this.mapComment(comment)

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

    public getPosts = async (input: InputGetPostsDTO): Promise<OutputGetPostsDTO> => {
        const {token} = input

        const tokenIsValid = this.tokenManager.validateToken(token)

        if(!tokenIsValid){
            throw new BadRequestError("Refaça o login, para renovar seu token.")
        }

        const comment = await this.commentDatabase.getComments()
        const agroupComments = this.groupsComments(comment)
        const posts = await this.postDatabase.getPosts()

        const result = posts.map(post => {

            const comment = agroupComments.filter(comm => comm.postId === post.id)

            return new Post(
                post.id,
                post.user_id,
                post.content,
                post.like,
                post.dislike,
                comment.length,
                post.created_at,
                post.updated_at,
                comment
            ).getPostModel()
        })

        return result
    }
}