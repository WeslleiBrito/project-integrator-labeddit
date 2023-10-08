import z from 'zod'


export interface InputEditCommentDTO {
    id: string
    token: string
    content: string
}


export interface OutputEditCommentDTO {
    message: string
}

export const InputEditCommentSchema = z.object(
    {
        token: z.string({required_error: "O token é obrigatório.", invalid_type_error: "O token deve ser do tipo string"}).min(1, "Token vazio."),
        id: z.string({required_error: "O id do comentário é obrigatório.", invalid_type_error: "O id deve ser do tipo string"}).min(1, "id vazio."),
        content: z.string({required_error: "O content é obrigatório.", invalid_type_error: "O content deve ser do tipo string"}).min(1, "content vazio.")
    }
).transform(data => data as InputEditCommentDTO)