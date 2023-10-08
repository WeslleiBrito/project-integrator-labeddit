import z from 'zod'


export interface InputDeleteCommentDTO {
    id: string
    token: string
}


export interface OutputDeleteCommentDTO {
    message: string
}

export const InputDeleteCommentSchema = z.object(
    {
        token: z.string({required_error: "O token é obrigatório.", invalid_type_error: "O token deve ser do tipo string"}).min(1, "Token vazio."),
        id: z.string({required_error: "O id do comentário é obrigatório.", invalid_type_error: "O id deve ser do tipo string"}).min(1, "id vazio."),
    }
).transform(data => data as InputDeleteCommentDTO)