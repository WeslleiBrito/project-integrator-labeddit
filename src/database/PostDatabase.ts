import { InputPostDB, PostDB } from "../types/types";
import { BaseDatabase } from "./BaseDatabase";


export class PostDatabase extends BaseDatabase implements PostDatabaseI {

    public static TABLE_POSTS = "posts"

    public findPost = async (): Promise<PostDB[]> => {

        const result: PostDB[] = await PostDatabase.connection(PostDatabase.TABLE_POSTS)

        return result
    }

    public createPost = async (input: InputPostDB): Promise<void> => {

        await PostDatabase.connection(PostDatabase.TABLE_POSTS).insert(input)
    }
}

export interface PostDatabaseI {
    findPost(): Promise<PostDB[]>
    createPost(input: InputPostDB): Promise<void>
}