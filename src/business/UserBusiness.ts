import { UserDatabase } from "../database/UserDatabase";
import { InputDeleteAccountDTO, OutputDeleteAccountDTO } from "../dtos/user/InputDeleteAccount.dto";
import { InputEditAccountDTO, OutputEditAccountDTO } from "../dtos/user/InputEditAccount.dto";
import { InputLoginDTO, OutputLoginDTO } from "../dtos/user/InputLogin.dto";
import { InputSignupDTO, OutputSignupDTO } from "../dtos/user/InputSignup.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { ConflictError } from "../errors/ConflictError";
import { NotFoundError } from "../errors/NotFoundError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { User } from "../models/User";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { USER_ROLES} from "../types/types";


export class UserBusiness implements UserBusinessI{
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

    public editAccount = async (input: InputEditAccountDTO): Promise<OutputEditAccountDTO> => {
        const {token, id, password, name} = input

        const tokenIsValid = this.tokenManager.validateToken(token)

        if(!tokenIsValid){
            throw new UnauthorizedError("Token inválido")
        }

        const account = await this.userDatabase.findUserById(id)

        if(!account){
            throw new NotFoundError("A conta informada não existe")
        }
        
        if(tokenIsValid.id !== account.id){
            throw new BadRequestError("Apenas o proprietário da conta tem permissão para alterar alguma informação.")
        }

        const newUser = new User(
            account.id,
            account.name,
            account.email,
            account.password,
            account.role,
            account.created_at
        )

        newUser.setName(name || newUser.getName())
        newUser.setPassword(password || newUser.getPassword())

        await this.userDatabase.editAccount({
            id: newUser.getId(),
            name: newUser.getName(),
            password: newUser.getPassword()
        })

        return {
            message: "Editado com sucesso!"
        }
    }

    public deleteAccount = async (input: InputDeleteAccountDTO): Promise<OutputDeleteAccountDTO> => {
        
        const {id, token} = input

        const tokenIsValid = this.tokenManager.validateToken(token)

        if(!tokenIsValid){
            throw new BadRequestError("Token inválido, renove seu token refazendo o login.")
        }

        const account = await this.userDatabase.findUserById(id)

        if(!account){
            throw new NotFoundError("O id informado não existe, verifique e tente novamente.")
        }

        if(tokenIsValid.role === USER_ROLES.NORMAL && tokenIsValid.id !== id){
            throw new BadRequestError("Sua conta não possui os privelégios para deletar esta conta.")
        }

        if(tokenIsValid.role === USER_ROLES.ADMIN && (account.role === USER_ROLES.ADMIN || account.role === USER_ROLES.MASTER) && tokenIsValid.id !== id){
            throw new BadRequestError("Um usuário admin não pode excluir outra conta admin ou a conta master.")
        }

        await this.userDatabase.deleteAccount(id)

        return {
            message: "Conta deletada com sucesso!"
        }
    }
}

export interface UserBusinessI {
    signup(input: InputSignupDTO): Promise<OutputSignupDTO>
    login(input: InputLoginDTO): Promise<OutputLoginDTO>
    editAccount(input: InputEditAccountDTO): Promise<OutputEditAccountDTO>
    deleteAccount(input: InputDeleteAccountDTO): Promise<OutputDeleteAccountDTO>
}