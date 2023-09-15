import { CommentBusiness } from '../../../src/business/CommentBusiness'
import { UserDatabase } from '../../../src/database/UserDatabase'
import { CommentDatabaseMock } from '../../mocks/CommentDatabaseMock'
import { IdGeneratorMock } from '../../mocks/IdGeneratorMock'
import { PostDatabaseMock } from '../../mocks/PostDatabaseMock'
import { TokenManagerMock } from '../../mocks/TokenManagerMock'
import { InputDeleteCommentSchema } from '../../../src/dtos/comments/InputDeleteComment.dto'



const newCommentBusiness = new CommentBusiness(
    new CommentDatabaseMock(),
    new UserDatabase(),
    new TokenManagerMock(),
    new PostDatabaseMock(),
    new IdGeneratorMock()
)

describe('Testando o delete Comment.', () => {

    test("Sucesso ao deletar um comentário", async () => {

        const input = InputDeleteCommentSchema.parse(
            {
                id: 'idMockComment6',
                token: 'tokenMockNormal03'
            }
        )

       const output = await newCommentBusiness.deleteComment(input)

       expect(output).toEqual(
        {
            message: "Comentário deletado com sucesso!"
        }
       )
    })

    test('Deve gerar erro quando for enviado um token inválido', async () => {

        expect.assertions(1)

        try {

            const input = InputDeleteCommentSchema.parse(
                {
                    id: "idMockComment5",
                    token: "token-invalido"
                }
            )
    
            await newCommentBusiness.deleteComment(input)

        } catch (error) {

            expect(error).toBeDefined()
        }
    })

    test('Deve gerar um erro quando o id for inválido', async () => {

        expect.assertions(1)

        try {

            const input = InputDeleteCommentSchema.parse(
                {
                    id: "id-invalido",
                    token: "tokenMockNormal03"
                }
            )
    
            await newCommentBusiness.deleteComment(input)

        } catch (error) {

            expect(error).toBeDefined()
        }
    })

    test('Deve gerar um erro quando um usuário normal tenta deletar um comentário não criado por ele.', async () => {

        expect.assertions(1)

        try {

            const input = InputDeleteCommentSchema.parse(
                {
                    id: "idMockComment7",
                    token: "tokenMockNormal03"
                }
            )
    
            await newCommentBusiness.deleteComment(input)

        } catch (error) {

            expect(error).toBeDefined()
        }
    })

    test('Deve gerar um erro quando um usuário admin tenta deletar um comentário de outro admin ou do master.', async () => {

        expect.assertions(1)

        try {

            const input = InputDeleteCommentSchema.parse(
                {
                    id: "idMockComment9",
                    token: "tokenMockAdmin02"
                }
            )
    
            await newCommentBusiness.deleteComment(input)

        } catch (error) {

            expect(error).toBeDefined()
        }
    })
})
