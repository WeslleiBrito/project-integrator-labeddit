import { CommentBusiness } from '../../../src/business/CommentBusiness'
import { UserDatabase } from '../../../src/database/UserDatabase'
import { InputCreateCommentSchema } from '../../../src/dtos/comments/InputCreateComment.dto'
import { InputGetCommentsSchema } from '../../../src/dtos/comments/InputGetComments.dto'
import { CommentModel } from '../../../src/models/Comment'
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

describe("Testando o getComments", () => {

    test("Teste de sucesso", async () => {

        const input = InputGetCommentsSchema.parse(
            {
                token: "tokenMockAdmin01"
            }
        )

        const output = await newCommentBusiness.getComments(input)
        
        const result: CommentModel[] = [
            {
                id: 'idMockComment1',
                idUser: 'idMockNormal03',
                postId: 'idPost6',
                content: "Comentário inicial",
                parentCommentId: null,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                like: 20,
                dislike: 2,
                amountComment: 1,
                answers: [
                    {
                        id: 'idMockComment2',
                        idUser: 'idMockNormal01',
                        postId: 'idPost6',
                        content: "Comentando o primeiro comentário",
                        parentCommentId: 'idMockComment1',
                        createdAt: expect.any(String),
                        updatedAt: expect.any(String),
                        like: 6,
                        dislike: 1,
                        amountComment: 0,
                        answers: []

                    }
                ]
            },
            {
                id: 'idMockComment3',
                idUser: 'idMockAdmin01',
                postId: 'idPost6',
                content: "Segundo comentário direto no post6.",
                parentCommentId: null,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                like: 2,
                dislike: 6,
                amountComment: 0,
                answers: []
            }
        ]
        expect(output).toEqual(result)


    })

    test("Deve gerar um erro caso  o token seja inválido", async () => {
        expect.assertions(1)

        try {
            const input = InputGetCommentsSchema.parse(
                {
                    token: "token-invalido"
                }
            )

            await newCommentBusiness.getComments(input)

        } catch (error) {
            expect(error).toBeDefined()
        }
    })
})