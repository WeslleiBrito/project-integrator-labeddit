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
    name_user: string
    content: string
    like: number
    dislike: number
    created_at: string
    updated_at: string
}

export interface InputPostDB {
    id: string
    user_id: string
    content: string,
    name_user: string
}

export interface InputEditDB {
    id: string,
    content: string,
    updateAt: string,
    like: number,
    dislike: number
}

export interface CommentDB {
    id: string,
    post_id: string,
    parent_comment_id: string | null,
    content: string,
    id_user: string,
    like: number,
    dislike: number,
    created_at: string,
    updated_at: string,
    answer?: CommentDB[]
}

export interface InputCommentDB {
    id: string,
    post_id: string,
    parent_comment_id: string | null,
    content: string,
    id_user: string,
}

export interface InputEditCommentDB {
    id: string 
    content: string
    updated_at: string
    like: number
    dislike: number
}

export interface LikeDislikePostDB {
    user_id: string
    post_id: string
    like: number
}

export interface LikeDislikeCommentDB {
    user_id: string
    comment_id: string
    like: 0 | 1
}

export interface likeDislike {
    userId: string,
    postId: string,
    like: number
}