import z from 'zod'

export interface InputLikeDislikePostDTO {
    token: string
    like: boolean,
    id: string
}

export interface OutputLikeDislikePostDTO {
    message: string
}

export const InputLikeDislikePostSchema = z.object(
    {
        token: z.string({required_error: "O token é obrigatório.", invalid_type_error: "O token deve ser do tipo string"}).min(1, "Token vazio."),
        like: z.boolean({required_error: "A propriedade like não foi informada.", invalid_type_error: "O like deve se do tipo boolean"}),
        id: z.string({required_error: "O id é obrigatório.", invalid_type_error: "O id deve ser uma string"})
    }
).transform(data => data as InputLikeDislikePostDTO)