import {PostBusiness} from '../../../src/business/PostBusiness'
import { InputPostSchema } from '../../../src/dtos/InputPost.dto'
import { IdGeneratorMock } from '../../mocks/IdGeneratorMock'
import { PostDatabaseMock } from '../../mocks/PostDatabaseMock'
import { TokenManagerMock } from '../../mocks/TokenManagerMock'

const postBusiness = new PostBusiness(
    new PostDatabaseMock(),
    new TokenManagerMock(),
    new IdGeneratorMock()
)


describe("Teste do create post", () => {

    test("Teste de sucesso quando criado um post", async () => {
        const input = InputPostSchema.parse(
            {
                token: "tokenMockAdmin01",
                content: "Test de sucesso!"
            }
        )

        const output = await postBusiness.createPost(input)

        expect(output).toEqual({
            message: "Post criado com sucesso!"
        })
    })

    test("Teste de token inválido", async () => {
        expect.assertions(1)
        try {
            const input = InputPostSchema.parse(
                {
                    token: "Token-invalido",
                    content: "Enviado um token inválido"
                }
            )
    
            const output = await postBusiness.createPost(input)

        } catch (error) {
           expect(error).toBeDefined() 
        }
       
    })
})