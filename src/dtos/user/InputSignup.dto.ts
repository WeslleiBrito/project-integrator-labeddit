import z from "zod"

export interface InputSignupDTO {
    name: string,
    email: string,
    password: string
}

export interface OutputSignupDTO {
    message: string,
    token: string
}

export const InputSignupSchema = z.object(
    {
        name: z.string({required_error: "Name não informado.",  invalid_type_error: "Espera-se que o name venha como string."}).min(3, {message: "O nome precisa ter pelo menos 3 caracteres."}),
        email: z.string({required_error: "Email não informado.",  invalid_type_error: "Espera-se que o email venha como string."}).email({message: "Email inválido."}),
        password: z.string({required_error: "Password não informado.",  invalid_type_error: "Espera-se que o password venha como string."}).min(5, {message: "O password precisa ter pelo menos 5 caracteres."})
    }
).transform(data => data as InputSignupDTO)

