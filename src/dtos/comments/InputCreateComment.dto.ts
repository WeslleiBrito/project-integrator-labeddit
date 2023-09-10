import z from 'zod'


export interface InputCreateCommentDTO {
    token: string,
    postId: string,
    parentCommentId?: string,
    content: string
}

export interface OutputCreateCommentDTO {
    message: string
}

export const InputCreateCommentSchema = z.object(
    {
        token: z.string({required_error: "O token é obrigatório.", invalid_type_error: "O token deve ser do tipo string"}).min(1, "Token vazio."),
        postId: z.string({required_error: "O postId é obrigatório.", invalid_type_error: "O postId deve ser do tipo string"}).min(1, "postId vazio."),
        parentCommentId: z.string({required_error: "O parentCommentId é obrigatório.", invalid_type_error: "O parentCommentId deve ser do tipo string"}).min(1, "parentCommentId vazio.").optional(),
        content: z.string({required_error: "O content é obrigatório.", invalid_type_error: "O content deve ser do tipo string"}).min(1, "content vazio.")
    }
)