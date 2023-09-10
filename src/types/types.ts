import { InputSignupDTO } from "../dtos/user/InputSignup.dto";

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

export interface PostDB {
    id: string
    user_id: string
    content: string
    like: number
    dislike: number
    amount_comments: number
    created_at: string
    updated_at: string
}

export interface InputPostDB {
    id: string
    user_id: string
    content: string
}

export interface InputEditDB {
    id: string,
    content: string,
    updateAt: string
}

export interface CommentDB {
    id: string,
    post_id: string,
    parent_comment_id: string,
    content: string,
    id_user: string,
    like: number,
    dislike: number,
    amount_comment: number,
    created_at: string,
    updated_at: string 
}

export interface InputCommentDB {
    id: string,
    post_id: string,
    parent_comment_id: string | null,
    content: string,
    id_user: string,
}