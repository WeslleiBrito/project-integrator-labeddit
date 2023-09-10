import { InputCommentDB } from "../types/types";
import { BaseDatabase } from "./BaseDatabase";


export class PostDatabase extends BaseDatabase {

    public static TABLE_COMMENTS = "comments"

    public createPost = async (input: InputCommentDB): Promise<void> => {

        await PostDatabase.connection(PostDatabase.TABLE_COMMENTS).insert(input)
    }
    
}