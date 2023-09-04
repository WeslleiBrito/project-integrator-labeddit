import { UserDB } from "../types/types"
import { BaseDatabase } from "./BaseDatabase"


export class UserDatabase extends BaseDatabase implements UserDatabese {
    
    public static TABLE_USER: string = "users"

    public signup = async (input: UserDB): Promise<void> => {

        await UserDatabase.connection(UserDatabase.TABLE_USER).insert(input)
    }

    public findUserById = async (id: string): Promise<UserDB | undefined> => {
        
        const [result]: UserDB[] | undefined[] = await UserDatabase.connection(UserDatabase.TABLE_USER).where({id})

        return result
    }
    
    public findUserByEmail = async (email: string): Promise<UserDB | undefined> => {
        
        const [result]: UserDB[] | undefined[] = await UserDatabase.connection(UserDatabase.TABLE_USER).where({email})
       
        return result
    }

    public findRole = async (role: string): Promise<UserDB | undefined> => {
        
        const [result]: UserDB[] | undefined[] = await UserDatabase.connection(UserDatabase.TABLE_USER).where({role})

        return result
    }
}

export interface UserDatabese {
    signup (input: UserDB): Promise<void>
    findUserById(id: string): Promise<UserDB | undefined>
    findUserByEmail(email: string): Promise<UserDB | undefined>
    findRole(role: string): Promise<UserDB | undefined>
}