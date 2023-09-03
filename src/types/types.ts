import { InputSignupDTO } from "../dtos/InputSignup.dto";

export enum USER_ROLES {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
}

export interface InputSignupDB extends InputSignupDTO{
    id: string
    role: string
}