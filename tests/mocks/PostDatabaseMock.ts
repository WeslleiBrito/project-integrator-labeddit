import { BaseDatabase } from "../../src/database/BaseDatabase";
import { InputEditDB, InputPostDB, PostDB } from "../../src/types/types";

const postsMock: PostDB[] = [
    {
        id: "idPost1",
        user_id: "idMockNormal01",
        content: "Conteudo 1",
        like: 3,
        dislike: 15,
        name_user: "Normal 1",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        id: "idPost2",
        user_id: "idMockNormal02",
        content: "Conteudo 2",
        like: 100,
        dislike: 13,
        name_user: "Normal 2",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        id: "idPost3",
        user_id: "idMockNormal03",
        content: "Conteudo 3",
        like: 7,
        dislike: 12,
        name_user: "Normal 3",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        id: "idPost4",
        user_id: "idMockAdmin01",
        content: "Conteudo 4",
        like: 6,
        dislike: 2,
        name_user: "Admin 1",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },

    {
        id: "idPost6",
        user_id: "idMockAdmin02",
        content: "Conteudo 4",
        like: 3,
        dislike: 15,
        name_user: "Admin 2",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        id: "idPost5",
        user_id: "idMockMaster",
        content: "Conteudo 5",
        like: 3,
        dislike: 15,
        name_user: "Master",
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

    public editPost = async (input: InputEditDB): Promise<void> => {
        
    }

    public findPostById = async (id: string): Promise<PostDB | undefined> => {

        const result: PostDB | undefined = postsMock.find(post => post.id === id)

        return result
    }

    public deletePost = async (id: string): Promise<void> => {

    }

    public getPosts = async (): Promise<PostDB[]> => {

        return postsMock
    }
}