import { UserModel } from "../types/types"
import { BaseDatabase } from "./BaseDatabase"


export class UserDatabase extends BaseDatabase {
    public static TABLE_USER = "users"

    public signup = async (input: UserModel): Promise<void> => {

        await UserDatabase.connection(UserDatabase.TABLE_USER).insert(input)
    }

    public findUserById = async (id: string): Promise<UserModel | undefined> => {
        
        const [result]: UserModel[] | undefined[] = await UserDatabase.connection(UserDatabase.TABLE_USER).where({id})

        return result
    }
    
    public findUserByEmail = async (email: string): Promise<UserModel | undefined> => {
        
        const [result]: UserModel[] | undefined[] = await UserDatabase.connection(UserDatabase.TABLE_USER).where({email})
       
        return result
    }

    public findRole = async (role: string): Promise<UserModel | undefined> => {
        
        const [result]: UserModel[] | undefined[] = await UserDatabase.connection(UserDatabase.TABLE_USER).where({role})

        return result
    }
}

