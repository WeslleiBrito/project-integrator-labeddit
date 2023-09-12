import z from 'zod'


export interface InputCreateCommentDTO {
    token: string,
    id: string,
    parentCommentId?: string,
    content: string
}

export interface OutputCreateCommentDTO {
    message: string
}

export const InputCreateCommentSchema = z.object(
    {
        token: z.string({required_error: "O token é obrigatório.", invalid_type_error: "O token deve ser do tipo string"}).min(1, "Token vazio."),
        id: z.string({required_error: "O id da postagem é obrigatório.", invalid_type_error: "O id deve ser do tipo string"}).min(1, "id vazio."),
        parentCommentId: z.string({required_error: "O parentCommentId é obrigatório.", invalid_type_error: "O parentCommentId deve ser do tipo string"}).min(1, "parentCommentId vazio.").optional(),
        content: z.string({required_error: "O content é obrigatório.", invalid_type_error: "O content deve ser do tipo string"}).min(1, "content vazio.")
    }
).transform(data => data as InputCreateCommentDTO)