import z from 'zod'
import { likeDislike } from '../../types/types'


export interface InputGetLikeDislikeDTO {
    token: string
}

export type OutputGetLikeDislikeDTO = likeDislike[]

export const InputGetLikeDislikeSchema = z.object(
    {
        token: z.string({required_error: "O token é obrigatório.", invalid_type_error: "O token deve ser do tipo string"}).min(1, "Token vazio.")
    }
).transform(data => data as InputGetLikeDislikeDTO)