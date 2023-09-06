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
            USER_ROLES.NORMAL,
            new Date().toISOString()
        )

        await this.userDatabase.signup(
            {
                id: newUser.getId(),
                name: newUser.getName(),
                email: newUser.getEmail(),
                password: newUser.getPassword(),
                role: newUser.getRole(),
                created_at: newUser.getCreatedAt()
            }
        )
        
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