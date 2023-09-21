import {LikeDislikePostBusiness} from '../../../src/business/LikeDislikePostBusiness'
import { InputLikeDislikePostSchema } from '../../../src/dtos/likeDislikePosts/InputLikeDislikePost.dto'
import { LikeDislikePostDatabaseMock } from '../../mocks/LikeDislikePostDatabaseMock'
import { PostDatabaseMock } from '../../mocks/PostDatabaseMock'
import { TokenManagerMock } from '../../mocks/TokenManagerMock'


const likeDislikePostBuiseness = new LikeDislikePostBusiness(
    new LikeDislikePostDatabaseMock(),
    new PostDatabaseMock(),
    new TokenManagerMock()
)


describe("Testando o Like Dislike", () => {

    test("Sucesso na criação do like", async () => {

        const input = InputLikeDislikePostSchema.parse(
            {
                token: "tokenMockMaster",
                id: "idPost4",
                like: true
            }
        )

        const output = await likeDislikePostBuiseness.likeDislike(input)

        expect(output).toEqual(
            {
                message: `Like criado com sucesso.`
            }
        )
    })

    test("Sucesso na criação do dislike", async () => {

        const input = InputLikeDislikePostSchema.parse(
            {
                token: "tokenMockMaster",
                id: "idPost4",
                like: false
            }
        )

        const output = await likeDislikePostBuiseness.likeDislike(input)

        expect(output).toEqual(
            {
                message: `Dislike criado com sucesso.`
            }
        )
    })

    test("Deve deletar a interação quando usuário já deu like e tenta dar like novamente", async () => {

        const input = InputLikeDislikePostSchema.parse(
            {
                token: "tokenMockAdmin01",
                id: "idPost3",
                like: true
            }
        )

        const output = await likeDislikePostBuiseness.likeDislike(input)

        expect(output).toEqual(
            {
                message: `Like deletado com sucesso.`
            }
        )
    })

    test("Deve deletar a interação quando usuário já deu dislike e tenta dar dislike novamente", async () => {

        const input = InputLikeDislikePostSchema.parse(
            {
                token: "tokenMockAdmin02",
                id: "idPost2",
                like: false
            }
        )

        const output = await likeDislikePostBuiseness.likeDislike(input)

        expect(output).toEqual(
            {
                message: `Dislike deletado com sucesso.`
            }
        )
    })

    test("Deve editar a interação quando usuário já deu like e tenta dar dislike.", async () => {

        const input = InputLikeDislikePostSchema.parse(
            {
                token: "tokenMockNormal01",
                id: "idPost2",
                like: false
            }
        )

        const output = await likeDislikePostBuiseness.likeDislike(input)

        expect(output).toEqual(
            {
                message: `Like editado para dislike com sucesso.`
            }
        )
    })

    test("Deve editar a interação quando usuário já deu dislike e tenta dar like.", async () => {

        const input = InputLikeDislikePostSchema.parse(
            {
                token: "tokenMockAdmin02",
                id: "idPost2",
                like: true
            }
        )

        const output = await likeDislikePostBuiseness.likeDislike(input)

        expect(output).toEqual(
            {
                message: `Dislike editado para like com sucesso.`
            }
        )
    })

    test("Deve gerar um erro para token inválido.", async () => {

        expect.assertions(1)

        try {

            const input = InputLikeDislikePostSchema.parse(
                {
                    token: "token-invalido",
                    id: "idPost2",
                    like: true
                }
            )
    
            const output = await likeDislikePostBuiseness.likeDislike(input)

        } catch (error) {
            expect(error).toBeDefined()
        }
       
    })

    test("Deve gerar um erro para post que não existe.", async () => {

        expect.assertions(1)

        try {

            const input = InputLikeDislikePostSchema.parse(
                {
                    token: "tokenMockMaster",
                    id: "id-invalido",
                    like: false
                }
            )
    
            const output = await likeDislikePostBuiseness.likeDislike(input)

        } catch (error) {
            expect(error).toBeDefined()
        }
       
    })

    test("Deve gerar um erro quando o autor do post tenta curtir seu próprio post.", async () => {

        expect.assertions(1)

        try {

            const input = InputLikeDislikePostSchema.parse(
                {
                    token: "tokenMockNormal02",
                    id: "idPost2",
                    like: true
                }
            )
    
            const output = await likeDislikePostBuiseness.likeDislike(input)

        } catch (error) {
            expect(error).toBeDefined()
        }
       
    })

    test("Deve gerar um erro quando o autor do post tenta descurtir seu próprio post.", async () => {

        expect.assertions(1)

        try {

            const input = InputLikeDislikePostSchema.parse(
                {
                    token: "tokenMockNormal02",
                    id: "idPost2",
                    like: false
                }
            )
    
            const output = await likeDislikePostBuiseness.likeDislike(input)

        } catch (error) {
            expect(error).toBeDefined()
        }
       
    })


})