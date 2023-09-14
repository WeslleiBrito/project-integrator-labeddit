import { CommentBusiness } from '../../../src/business/CommentBusiness'
import { UserDatabase } from '../../../src/database/UserDatabase'
import { InputCreateCommentSchema } from '../../../src/dtos/comments/InputCreateComment.dto'
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

describe("Testando o create-comment", () => {

    test('Teste se sucesso da criação do comentário, SEM parent id', async () => {

        const input = InputCreateCommentSchema.parse(
            {
                id: "idPost4",
                token: "tokenMockNormal03",
                content: "Teste de sucesso sem parent id"
            }
        )

        const output = await newCommentBusiness.createComment(input)

        expect(output).toEqual(
            {
                message: "Comentário criado com sucesso!"
            }
        )
    })

    test('Teste se sucesso da criação do comentário, COM parent id', async () => {

        const input = InputCreateCommentSchema.parse(
            {
                id: "idPost4",
                token: "tokenMockNormal03",
                content: "Teste de sucesso sem parent id",
                parentCommentId: "idMockComment5"
            }
        )

        const output = await newCommentBusiness.createComment(input)

        expect(output).toEqual(
            {
                message: "Comentário criado com sucesso!"
            }
        )
    })

    test('Deve gerar erro quando for enviado um token inválido', async () => {

        expect.assertions(1)

        try {

            const input = InputCreateCommentSchema.parse(
                {
                    id: "idPost4",
                    token: "token-invalido",
                    content: "Teste de token inválido",
                    parentCommentId: "idMockComment5"
                }
            )
    
            await newCommentBusiness.createComment(input)

        } catch (error) {

            expect(error).toBeDefined()
        }
    })

    test('Deve gerar um erro quando id do post for inválido', async () => {

        expect.assertions(1)

        try {

            const input = InputCreateCommentSchema.parse(
                {
                    id: "id-post-invalido",
                    token: "tokenMockNormal03",
                    content: "Teste de sucesso sem parent id",
                    parentCommentId: "idMockComment5"
                }
            )
    
            await newCommentBusiness.createComment(input)

        } catch (error) {

            expect(error).toBeDefined()
        }
    })

    test('Deve gerar um erro quando o parentCommentId for inválido', async () => {

        expect.assertions(1)

        try {

            const input = InputCreateCommentSchema.parse(
                {
                    id: "idPost4",
                    token: "tokenMockNormal03",
                    content: "Teste de sucesso sem parent id",
                    parentCommentId: "parent-comment-id-invalido"
                }
            )
    
            await newCommentBusiness.createComment(input)

        } catch (error) {

            expect(error).toBeDefined()
        }
    })

})