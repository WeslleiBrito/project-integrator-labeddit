import { CommentDB, InputCommentDB, InputEditCommentDB } from "../types/types";
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

    public editComment = async (input: InputEditCommentDB): Promise<void> => {

        const {id, content, updated_at, dislike, like} = input

        await CommentDatabase.connection(CommentDatabase.TABLE_COMMENTS).update({content, updated_at, like, dislike}).where({id})

    }

    public deleteComment = async (id: string): Promise<void> => {

        await CommentDatabase.connection(CommentDatabase.TABLE_COMMENTS).del().where({id})
        
    }

    public getComments = async (): Promise<CommentDB[]> => {

        const result: CommentDB[] = await CommentDatabase.connection(CommentDatabase.TABLE_COMMENTS)

        return result
    }
    
}