import { InputEditDB, InputPostDB, PostDB } from "../types/types";
import { BaseDatabase } from "./BaseDatabase";


export class PostDatabase extends BaseDatabase implements PostDatabaseI {

    public static TABLE_POSTS = "posts"

    public findPost = async (): Promise<PostDB[]> => {

        const result: PostDB[] = await PostDatabase.connection(PostDatabase.TABLE_POSTS)

        return result
    }

    public findPostById = async (id: string): Promise<PostDB | undefined> => {

        const [result]: PostDB[] | undefined[] = await PostDatabase.connection(PostDatabase.TABLE_POSTS).where({id})

        return result
    }
    
    public createPost = async (input: InputPostDB): Promise<void> => {

        await PostDatabase.connection(PostDatabase.TABLE_POSTS).insert(input)
    }

    public editPost = async (input: InputEditDB): Promise<void> => {
        
        await PostDatabase.connection(PostDatabase.TABLE_POSTS).update({content: input.content}).where({id: input.id})

    }
}

export interface PostDatabaseI {
    findPost(): Promise<PostDB[]>
    createPost(input: InputPostDB): Promise<void>
}