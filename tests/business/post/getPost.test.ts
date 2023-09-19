import {PostBusiness} from '../../../src/business/PostBusiness'
import { InputGetPostsSchema } from '../../../src/dtos/post/ImputGetPosts.dto'
import { PostModel } from '../../../src/models/Post'
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
const mockPostComments: PostModel[] = [
    {
        id: "idPost1",
        content: "Conteudo 1",
        like: 3,
        dislike: 15,
        creator: {
            id: "idMockNormal01",
            name: "Normal 1"
        },
        amountComments: 0,
        comments: [],
        createdAt: expect.any(String),
        updatedAt: expect.any(String)
    },
    {
        id: "idPost2",
        content: "Conteudo 2",
        like: 100,
        dislike: 13,
        creator: {
            id: "idMockNormal02",
            name: "Normal 2"
        },
        amountComments: 0,
        comments: [],
        createdAt: expect.any(String),
        updatedAt: expect.any(String)
    },
    {
        id: "idPost3",
        content: "Conteudo 3",
        like: 7,
        dislike: 12,
        creator: {
            id: "idMockNormal03",
            name: "Normal 3"
        },
        amountComments: 0,
        comments: [],
        createdAt: expect.any(String),
        updatedAt: expect.any(String)
    },
    {
        id: "idPost4",
        content: "Conteudo 4",
        like: 6,
        dislike: 2,
        creator: {
            id: "idMockAdmin01",
            name: "Admin 1"
        },
        amountComments: 0,
        comments: [],
        createdAt: expect.any(String),
        updatedAt: expect.any(String)
    },
    
    {
        id: "idPost6",
        content: "Conteudo 4",
        like: 3,
        dislike: 15,
        creator: {
            id: "idMockAdmin02",
            name: "Admin 2"
        },
        amountComments: 2,
        comments: [
            {
                id: "idMockComment1",
                idUser: "idMockNormal03",
                postId: "idPost6",
                content: "Comentário inicial",
                parentCommentId: null,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                like: 20,
                dislike: 2,
                amountComment: 1,
                answers: [
                    {
                        id: "idMockComment2",
                        idUser: "idMockNormal01",
                        postId: "idPost6",
                        content: "Comentando o primeiro comentário",
                        parentCommentId: "idMockComment1",
                        createdAt: expect.any(String),
                        updatedAt: expect.any(String),
                        like: 6,
                        dislike: 1,
                        amountComment: 0,
                        answers: []
                    }
                ],
                
            },
            {
                id: "idMockComment3",
                idUser: "idMockAdmin01",
                postId: "idPost6",
                content: "Segundo comentário direto no post6.",
                parentCommentId: null,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                like: 2,
                dislike: 6,
                amountComment: 0,
                answers: []
            }
        ],
        createdAt: expect.any(String),
        updatedAt: expect.any(String)
    },
    {
        id: "idPost5",
        content: "Conteudo 5",
        like: 3,
        dislike: 15,
        creator: {
            id: "idMockMaster",
            name: "Master"
        },
        amountComments: 0,
        comments: [],
        createdAt: expect.any(String),
        updatedAt: expect.any(String)
    }
]
describe("Teste do getPost", () => {

    test('Deve retornar os posts com seus comentários', async () => {

        const input = InputGetPostsSchema.parse(
            {
                token: "tokenMockNormal01"
            }
        )

        const result = await postBusiness.getPosts(input)

        expect(result).toEqual(mockPostComments)
    })
})