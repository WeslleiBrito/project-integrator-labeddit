import { BaseDatabase } from "../../src/database/BaseDatabase";
import { InputPostDB, PostDB } from "../../src/types/types";

const postsMock: PostDB[] = [
    {
        id: "idPost1",
        user_id: "idUser1",
        content: "Conteudo 1",
        like: 3,
        dislike: 15,
        amount_comments: 30,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        id: "idPost2",
        user_id: "idUser2",
        content: "Conteudo 2",
        like: 100,
        dislike: 13,
        amount_comments: 350,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        id: "idPost3",
        user_id: "idUser3",
        content: "Conteudo 3",
        like: 3,
        dislike: 15,
        amount_comments: 30,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        id: "idPost4",
        user_id: "idUser2",
        content: "Conteudo 4",
        like: 3,
        dislike: 15,
        amount_comments: 30,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        id: "idPost5",
        user_id: "idUser1",
        content: "Conteudo 5",
        like: 3,
        dislike: 15,
        amount_comments: 30,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
]

export class PostDatabaseMock extends BaseDatabase {


    public static TABLE_POSTS = "posts"

    public findPost = async (): Promise<PostDB[]> => {

        const result: PostDB[] = postsMock

        return result
    }

    public createPost = async (input: InputPostDB): Promise<void> => {

    }
}