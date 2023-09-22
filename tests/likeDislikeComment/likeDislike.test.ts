import {LikeDislikeCommentBusiness} from '../../src/business/LikeDislikeCommentBusiness'
import { TokenManagerMock } from '../mocks/TokenManagerMock'
import { LikeDislikeCommentDatabaseMock } from '../mocks/LikeDislikeCommentDatabaseMock'
import { CommentDatabaseMock } from '../mocks/CommentDatabaseMock'
import { InputLikeDislikeCommentsSchema } from '../../src/dtos/likeDislikeComments/InputLikeDislikeComments.dto'


const likeDislikeCommentBuiseness = new LikeDislikeCommentBusiness(
    new LikeDislikeCommentDatabaseMock(),
    new CommentDatabaseMock(),
    new TokenManagerMock()
)

describe("Testando o Like Dislike", () => {

    test("Sucesso na criação do like", async () => {

        const input = InputLikeDislikeCommentsSchema.parse(
            {
                token: "tokenMockMaster",
                id: "idMockComment3",
                like: true
            }
        )

        const output = await likeDislikeCommentBuiseness.likeDislike(input)

        expect(output).toEqual(
            {
                message: `Like criado com sucesso.`
            }
        )
    })

    test("Sucesso na criação do dislike", async () => {

        const input = InputLikeDislikeCommentsSchema.parse(
            {
                token: "tokenMockMaster",
                id: "idMockComment3",
                like: false
            }
        )

        const output = await likeDislikeCommentBuiseness.likeDislike(input)

        expect(output).toEqual(
            {
                message: `Dislike criado com sucesso.`
            }
        )
    })

    test("Deve deletar a interação quando usuário já deu like e tenta dar like novamente", async () => {

        const input = InputLikeDislikeCommentsSchema.parse(
            {
                token: "tokenMockAdmin01",
                id: "idMockComment2",
                like: true
            }
        )

        const output = await likeDislikeCommentBuiseness.likeDislike(input)

        expect(output).toEqual(
            {
                message: `Like deletado com sucesso.`
            }
        )
    })

    test("Deve deletar a interação quando usuário já deu dislike e tenta dar dislike novamente", async () => {

        const input = InputLikeDislikeCommentsSchema.parse(
            {
                token: "tokenMockAdmin02",
                id: "idMockComment1",
                like: false
            }
        )

        const output = await likeDislikeCommentBuiseness.likeDislike(input)

        expect(output).toEqual(
            {
                message: `Dislike deletado com sucesso.`
            }
        )
    })

    test("Deve editar a interação quando usuário já deu like e tenta dar dislike.", async () => {

        const input = InputLikeDislikeCommentsSchema.parse(
            {
                token: "tokenMockAdmin01",
                id: "idMockComment2",
                like: false
            }
        )

        const output = await likeDislikeCommentBuiseness.likeDislike(input)

        expect(output).toEqual(
            {
                message: `Like editado para dislike com sucesso.`
            }
        )
    })

    test("Deve editar a interação quando usuário já deu dislike e tenta dar like.", async () => {

        const input = InputLikeDislikeCommentsSchema.parse(
            {
                token: "tokenMockAdmin02",
                id: "idMockComment1",
                like: true
            }
        )

        const output = await likeDislikeCommentBuiseness.likeDislike(input)

        expect(output).toEqual(
            {
                message: `Dislike editado para like com sucesso.`
            }
        )
    })

    test("Deve gerar um erro para token inválido.", async () => {

        expect.assertions(1)

        try {

            const input = InputLikeDislikeCommentsSchema.parse(
                {
                    token: "token-invalido",
                    id: "idComment2",
                    like: true
                }
            )
    
            const output = await likeDislikeCommentBuiseness.likeDislike(input)

        } catch (error) {
            expect(error).toBeDefined()
        }
       
    })

    test("Deve gerar um erro para comentário que não existe.", async () => {

        expect.assertions(1)

        try {

            const input = InputLikeDislikeCommentsSchema.parse(
                {
                    token: "tokenMockMaster",
                    id: "id-invalido",
                    like: false
                }
            )
    
            const output = await likeDislikeCommentBuiseness.likeDislike(input)

        } catch (error) {
            expect(error).toBeDefined()
        }
       
    })

    test("Deve gerar um erro quando o autor do comentário tenta curtir seu próprio comentário.", async () => {

        expect.assertions(1)

        try {

            const input = InputLikeDislikeCommentsSchema.parse(
                {
                    token: "tokenMockNormal01",
                    id: "idMockComment2",
                    like: true
                }
            )
    
            const output = await likeDislikeCommentBuiseness.likeDislike(input)

        } catch (error) {
            expect(error).toBeDefined()
        }
       
    })

    test("Deve gerar um erro quando o autor do comentário tenta descurtir seu próprio comentário.", async () => {

        expect.assertions(1)

        try {

            const input = InputLikeDislikeCommentsSchema.parse(
                {
                    token: "tokenMockNormal01",
                    id: "idMockComment2",
                    like: false
                }
            )
    
            const output = await likeDislikeCommentBuiseness.likeDislike(input)

        } catch (error) {
            expect(error).toBeDefined()
        }
       
    })


})