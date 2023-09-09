import z from 'zod'

export interface InputEditPostDTO {
    token: string
    id: string
    content: string
}

export interface OutputEditPostDTO {
    message: string
}


export const InputEditPostSchema = z.object(
    {
        token: z.string({required_error: "O token é obrigatório.", invalid_type_error: "O token deve ser do tipo string"}).min(1, "Token vazio."),
        id: z.string({required_error: "O id é obrigatório.", invalid_type_error: "O id deve ser do tipo string"}).min(1, "Id vazio."),
        content: z.string({required_error: "O content é obrigatório.", invalid_type_error: "O content deve ser do tipo string"}).min(1, "Content vazio.")
    }
)