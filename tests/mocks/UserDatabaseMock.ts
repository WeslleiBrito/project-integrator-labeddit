import {USER_ROLES, UserDB, UserModel} from '../../src/types/types'
import {BaseDatabase} from '../../src/database/BaseDatabase'
import {UserDatabase} from '../../src/database/UserDatabase'

const userMock: UserDB[] = [

    {
        id: "idMockNormal01",
        name: "Normal 01",
        email: "normal01@gmail.com",
        password: "normal1",
        role: USER_ROLES.NORMAL,
        created_at: new Date().toDateString()
    },
    {
        id: "idMockNormal02",
        name: "Normal 02",
        email: "normal02@gmail.com",
        password: "normal2",
        role: USER_ROLES.NORMAL, 
        created_at: new Date().toDateString()
    },
    {
        id: "idMockNormal03",
        name: "Normal 03",
        email: "normal03@gmail.com",
        password: "normal3",
        role: USER_ROLES.NORMAL,
        created_at: new Date().toDateString()
    },
    {
        id: "idMockAdmin01",
        name: "Admin 01",
        email: "admin01@gmail.com",
        password: "admin1",
        role: USER_ROLES.ADMIN,
        created_at: new Date().toDateString()
    },
    {
        id: "idMockAdmin02",
        name: "Admin 02",
        email: "admin02@gmail.com",
        password: "admin2",
        role: USER_ROLES.ADMIN,
        created_at: new Date().toDateString()
    },
    {
        id: "idMockMaster",
        name: "Master",
        email: "master@gmail.com",
        password: "master",
        role: USER_ROLES.ADMIN,
        created_at: new Date().toDateString()
    },
]

export class UserDatabaseMock extends BaseDatabase implements UserDatabase{

    public static USERS_TABLE = "users"

    public signup = async (input: UserDB): Promise<void> => {
        userMock.push(input)
    }
   
    public findUserById = async (id: string): Promise<UserDB | undefined> => {

        const find: UserDB | undefined = await userMock.find(user => user.id === id) 

        return find
    }

    public findUserByEmail = async(email: string): Promise<UserDB | undefined> => {
        
        const find: UserDB | undefined = await userMock.find(user => user.email === email) 

        return find
    }

    public findRole = async(role: string): Promise<UserDB | undefined> => {

        const find: UserDB | undefined = await userMock.find(user => user.role === role) 

        return find
    }
    
}