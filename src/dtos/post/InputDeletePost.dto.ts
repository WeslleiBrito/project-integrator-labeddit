import z from 'zod'


export interface InputDeletePostDTO {
    token: string
    id: string
}


export interface OutputDeletePostDTO {
    message: string
}


export const InputDeletePostSchema = z.object(
    {
        token: z.string({required_error: "O token é obrigatório.", invalid_type_error: "O token deve ser do tipo string"}).min(1, "Token vazio."),
        id: z.string({required_error: "O id é obrigatório.", invalid_type_error: "O id deve ser do tipo string"}).min(1, "Id vazio.")
    }
).transform(data => data as InputDeletePostDTO)