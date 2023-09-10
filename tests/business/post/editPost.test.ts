import {PostBusiness} from '../../../src/business/PostBusiness'
import { InputEditPostSchema } from '../../../src/dtos/post/InputEditPost.dto'
import { BaseError } from '../../../src/errors/BaseError'
import { IdGeneratorMock } from '../../mocks/IdGeneratorMock'
import { PostDatabaseMock } from '../../mocks/PostDatabaseMock'
import { TokenManagerMock } from '../../mocks/TokenManagerMock'

const postBusiness = new PostBusiness(
    new PostDatabaseMock(),
    new TokenManagerMock(),
    new IdGeneratorMock()
)


describe("Teste do edit-post", () => {

    test("Sucesso ao editar um post", async () => {

        const input = InputEditPostSchema.parse(
            {
                id: "idPost2",
                token: "tokenMockNormal02",
                content: "Teste de sucesso"
            }
        )
        
        const output = await postBusiness.editPost(input)
        
        expect(output).toEqual(
            {
                message: "Post editado com sucesso!"
            }
        )
    })

    test("Deve gerar erro para token inválidos", async () => {
        expect.assertions(4)

        try {
            const input = InputEditPostSchema.parse(
                {
                    id: "idPost2",
                    token: "token-invalido",
                    content: "O token é inválido"
                }
            )

            const output = await postBusiness.editPost(input)
            
        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(BaseError)
            if(error instanceof BaseError){
                expect(error.message).toBe("Refaça o login, para renovar seu token.")
                expect(error.statusCode).toBe(400)

            }
        }
    })

    test("Deve gerar erro para id inválidos", async () => {
        expect.assertions(4)

        try {
            const input = InputEditPostSchema.parse(
                {
                    id: "id-inválido",
                    token: "tokenMockNormal02",
                    content: "Id invalido"
                }
            )
            
            const output = await postBusiness.editPost(input)

        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(BaseError)
            if(error instanceof BaseError){
                expect(error.message).toBe("Id não encontrado.")
                expect(error.statusCode).toBe(404)

            }
        }
    })


    test("Caso o usuário que esteja tentando editar a postagem não seja o criador deve gerar um erro", async () => {
        expect.assertions(4)

        try {
            const input = InputEditPostSchema.parse(
                {
                    id: "idPost2",
                    token: "tokenMockNormal03",
                    content: "Não sou o dono do post, mas quero edita-lo"
                }
            )
            
            const output = await postBusiness.editPost(input)

        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(BaseError)
            if(error instanceof BaseError){
                expect(error.message).toBe("Sua conta não tem permissão para fazer a edição deste post.")
                expect(error.statusCode).toBe(401)

            }
        }
    })
})