import z from 'zod'


export interface InputGetCommentsDTO {
    token: string
}

export interface OutputGetCommentsDTO {
    message: string
}

export const InputGetCommentsSchema = z.object(
    {
        token: z.string({required_error: "O token é obrigatório.", invalid_type_error: "O token deve ser do tipo string"}).min(1, "Token vazio.")
    }
).transform(data => data as InputGetCommentsDTO)