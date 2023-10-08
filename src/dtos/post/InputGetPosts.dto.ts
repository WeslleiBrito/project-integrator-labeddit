import z from 'zod'
import { PostModel } from '../../models/Post'


export interface InputGetPostsDTO {
    token: string
}

export type OutputGetPostsDTO = PostModel[]

export const InputGetPostsSchema = z.object(
    {
        token: z.string({required_error: "O token é obrigatório.", invalid_type_error: "O token deve ser do tipo string"}).min(1, "Token vazio.")
    }
).transform(data => data as InputGetPostsDTO)