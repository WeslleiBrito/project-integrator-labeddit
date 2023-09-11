import { CommentDB, InputCommentDB } from "../types/types";
import { BaseDatabase } from "./BaseDatabase";


export class CommentDatabase extends BaseDatabase {

    public static TABLE_COMMENTS = "comments"

    public createComment = async (input: InputCommentDB): Promise<void> => {

        await CommentDatabase.connection(CommentDatabase.TABLE_COMMENTS).insert(input)
    }

    public findCommentById = async (id: string): Promise<CommentDB | undefined > => {

        const [result]: CommentDB[] | undefined = await CommentDatabase.connection(CommentDatabase.TABLE_COMMENTS).where({id})

        return result
    }
    
}