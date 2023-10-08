import {PostBusiness} from '../../../src/business/PostBusiness'
import { InputDeletePostSchema } from '../../../src/dtos/post/InputDeletePost.dto'
import { BaseError } from '../../../src/errors/BaseError'
import { CommentDatabaseMock } from '../../mocks/CommentDatabaseMock'
import { IdGeneratorMock } from '../../mocks/IdGeneratorMock'
import { PostDatabaseMock } from '../../mocks/PostDatabaseMock'
import { TokenManagerMock } from '../../mocks/TokenManagerMock'
import { UserDatabaseMock } from '../../mocks/UserDatabaseMock'

const postBusiness = new PostBusiness(
    new PostDatabaseMock(),
    new CommentDatabaseMock(),
    new UserDatabaseMock(),
    new TokenManagerMock(),
    new IdGeneratorMock()
)

describe("Testes do delete-post", () => {

    test("Sucesso da deleção do post", async () => {

        const input = InputDeletePostSchema.parse(
            {
                token: "tokenMockNormal02",
                id: "idPost2"
            }
        )

        const output = await postBusiness.deletePost(input)

        expect(output).toEqual(
            {
                message: "Post deletado com sucesso!"
            }
        )
    })

    test("Deve gerar erro para token inválidos", async () => {
        expect.assertions(4)

        try {
            const input = InputDeletePostSchema.parse(
                {
                    id: "idPost2",
                    token: "token-invalido"
                }
            )

            const output = await postBusiness.deletePost(input)
            
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
            const input = InputDeletePostSchema.parse(
                {
                    id: "id-inválido",
                    token: "tokenMockNormal02"
                }
            )
            
            const output = await postBusiness.deletePost(input)

        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(BaseError)
            if(error instanceof BaseError){
                expect(error.message).toBe("Id não encontrado.")
                expect(error.statusCode).toBe(404)

            }
        }
    })

    test("Deve gerar erro caso um usuario normal tentar deletar um post de outro usuário", async () => {
        expect.assertions(4)

        try {
            const input = InputDeletePostSchema.parse(
                {
                    id: "idPost3",
                    token: "tokenMockNormal02"
                }
            )
            
            const output = await postBusiness.deletePost(input)

        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(BaseError)
            if(error instanceof BaseError){
                expect(error.message).toBe("Sua conta não tem permissão para deletar o post de outro usuário.")
                expect(error.statusCode).toBe(401)

            }
        }
    })
    
    test("Um usuário admin não tem permissão para deletar um post de outro admin ou master", async () => {
        expect.assertions(1)
        
        try {

            const input = InputDeletePostSchema.parse(
                {
                    token: "tokenMockAdmin02",
                    id: "idPost4"
                }
            )

            const output = await postBusiness.deletePost(input)

        } catch (error) {
            expect(error).toBeDefined()
        }
    })
})