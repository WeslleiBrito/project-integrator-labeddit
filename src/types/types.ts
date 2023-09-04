import { InputSignupDTO } from "../dtos/InputSignup.dto";

export enum USER_ROLES {
    ADMIN = "ADMIN",
    MASTER = "MASTER",
    NORMAL = "NORMAL"
}

export interface UserModel extends InputSignupDTO{
    id: string,
    role: USER_ROLES, 
    createdAt: string
}

export interface UserDB extends InputSignupDTO {
    id: string,
    role: USER_ROLES,
    created_at: string
}