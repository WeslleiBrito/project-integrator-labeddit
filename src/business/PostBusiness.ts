import { PostDatabase } from "../database/PostDatabase";
import { InputPostDTO, OutputPostDTO } from "../dtos/InputPost.dto";
import { BadRequestError } from "../errors/BadRequestError";
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
}