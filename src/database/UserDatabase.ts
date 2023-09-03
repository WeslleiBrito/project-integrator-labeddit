import { InputSignupDB } from "../types/types"
import { BaseDatabase } from "./BaseDatabase"


export class UserDatabase extends BaseDatabase {
    public static TABLE_USER = "users"

    public signup = async (input: InputSignupDB) => {

        await UserDatabase.connection(UserDatabase.TABLE_USER).insert(input)
    }

    public findUserById = async (id: string) => {
        
        const [result] = await UserDatabase.connection(UserDatabase.TABLE_USER).where({id})

        return result
    }
    
    public findUserByEmail = async (email: string) => {
        
        const [result] = await UserDatabase.connection(UserDatabase.TABLE_USER).where({email})

        return result
    }
}

