import { UserDatabase } from "../database/UserDatabase";
import { InputLoginDTO, OutputLoginDTO } from "../dtos/InputLogin.dto";
import { InputSignupDTO, OutputSignupDTO } from "../dtos/InputSignup.dto";
import { ConflictError } from "../errors/ConflictError";
import { NotFoundError } from "../errors/NotFoundError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
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

    public login = async (input: InputLoginDTO): Promise<OutputLoginDTO> => {
        
        const {email, password} = input

        const account = await this.userDatabase.findUserByEmail(email)

        if(!account){
            throw new NotFoundError("Email ou senha inválida.")
        }

        const passwordValid = await this.hashManager.compare(password, account.password)

        if(!passwordValid){
            throw new UnauthorizedError("Email ou senha inválida.")
        }

        const token = this.tokenManager.createToken(
            {
                id: account.id,
                name: account.name,
                role: account.role
            }
        )
        
        return {
            token
        }

    }
}