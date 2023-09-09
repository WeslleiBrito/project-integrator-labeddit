import { PostDatabase } from "../database/PostDatabase";
import { InputEditPostDTO, OutputEditPostDTO } from "../dtos/post/InputEditPost.dto";
import { InputPostDTO, OutputPostDTO } from "../dtos/post/InputPost.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { Post } from "../models/Post";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";


export class PostBusiness {

    constructor(
        private postDatabase: PostDatabase,
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

        const updatePost = new Post(
            post.id,
            post.user_id,
            post.content,
            post.like,
            post.dislike,
            post.amount_comments,
            post.created_at,
            post.updated_at
        )

        updatePost.setContent(content)

        await this.postDatabase.editPost({id, content: updatePost.getContent()})

        return {
            message: "Post editado com sucesso!"
        }
    }
}