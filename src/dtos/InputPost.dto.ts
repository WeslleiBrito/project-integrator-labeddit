import z from 'zod'

export interface InputPostDTO {
    token: string
    content: string
}

export interface OutputPostDTO {
    message: "Post criado com sucesso!"
}

export const InputPostSchema = z.object(
    {
        token: z.string({required_error: "O token é obrigatório.", invalid_type_error: "O token deve ser do tipo string"}).min(1, "Token vazio."),
        content: z.string({required_error: "O content é obrigatório.", invalid_type_error: "O content deve ser do tipo string"}).min(1, "Content vazio.")
    }
)