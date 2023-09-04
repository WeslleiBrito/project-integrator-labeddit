import { InputSignupDTO } from "../dtos/InputSignup.dto";

export enum USER_ROLES {
    ADMIN = "ADMIN",
    MASTER = "MASTER",
    NORMAL = "NORMAL"
}

export interface UserModel extends InputSignupDTO{
    id: string
    role: string
}