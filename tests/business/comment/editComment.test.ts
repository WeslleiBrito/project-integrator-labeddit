import { CommentBusiness } from '../../../src/business/CommentBusiness'
import { UserDatabase } from '../../../src/database/UserDatabase'
import { InputEditCommentSchema } from '../../../src/dtos/comments/InputEditComment.dto'
import { CommentDatabaseMock } from '../../mocks/CommentDatabaseMock'
import { IdGeneratorMock } from '../../mocks/IdGeneratorMock'
import { PostDatabaseMock } from '../../mocks/PostDatabaseMock'
import { TokenManagerMock } from '../../mocks/TokenManagerMock'



const newCommentBusiness = new CommentBusiness(
    new CommentDatabaseMock(),
    new UserDatabase(),
    new TokenManagerMock(),
    new PostDatabaseMock(),
    new IdGeneratorMock()
)

describe('Testando o edit-comment', () => {

    
    test("Deve editar um comentario e obter sucesso", async () => {

        const input = InputEditCommentSchema.parse(
            {
                token: "tokenMockNormal03",
                id: "idMockComment1",
                content: "Teste de sucesso da edição"
            }
        )

        const output = await newCommentBusiness.editComment(input)

        expect(output).toEqual(
            {
                message: "Comentário editado com sucesso!"
            }
        )
    })

    test('Deve gerar erro quando for enviado um token inválido', async () => {

        expect.assertions(1)

        try {

            const input = InputEditCommentSchema.parse(
                {
                    id: "idMockComment5",
                    token: "token-invalido",
                    content: "Teste de token inválido",
                }
            )
    
            await newCommentBusiness.editComment(input)

        } catch (error) {

            expect(error).toBeDefined()
        }
    })

    test('Deve gerar um erro quando o id for inválido', async () => {

        expect.assertions(1)

        try {

            const input = InputEditCommentSchema.parse(
                {
                    id: "id-invalido",
                    token: "tokenMockNormal03",
                    content: "Teste de id inválido"
                }
            )
    
            await newCommentBusiness.editComment(input)

        } catch (error) {

            expect(error).toBeDefined()
        }
    })


    test('Deve gerar um erro quando o usuário que não criou o comentário tenta edita-lo', async () => {

        expect.assertions(1)

        try {

            const input = InputEditCommentSchema.parse(
                {
                    id: "idMockComment1",
                    token: "tokenMockNormal01",
                    content: "Teste de usuário não autorizado"
                }
            )
    
            await newCommentBusiness.editComment(input)

        } catch (error) {

            expect(error).toBeDefined()
        }
    })
})