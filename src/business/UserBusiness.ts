import { UserDatabase } from "../database/UserDatabase";
import { InputSignupDTO, OutputSignupDTO } from "../dtos/InputSignup.dto";
import { ConflictError } from "../errors/ConflictError";
import { User } from "../models/User";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { USER_ROLES } from "../types/types";


export class UserBusiness {
    constructor (
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private tokenManager: TokenManager
    ){}

    public signup = async (input: InputSignupDTO): Promise<OutputSignupDTO> => {

        const {name, email, password} = input

        const emailExist = await this.userDatabase.findUserByEmail(email)

        if(emailExist) {
            throw new ConflictError("Email já existe.")
        }

        const id: string = this.idGenerator.generate()

        const hashPassword = await this.hashManager.hash(password)

        const newUser = new User(
            id,
            name,
            email,
            hashPassword,
            USER_ROLES.NORMAL
        )
        
        if(newUser.getRole() === USER_ROLES.MASTER){
            const masterExist = await this.userDatabase.findRole(newUser.getRole())

            if(masterExist){
                throw new ConflictError("Não é permitido mais de um usuário master")
            }
        }
        
        await this.userDatabase.signup(newUser.getUserModel())
        
        const token = this.tokenManager.createToken(
            {
                id: newUser.getId(),
                name: newUser.getName(),
                role: newUser.getRole()
            }
        )

        return {
            message: "Cadastro efetuado com sucesso!",
            token
        }
        
    }
}