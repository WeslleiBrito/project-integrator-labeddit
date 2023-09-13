import { InputEditCommentDTO } from "../dtos/comments/InputEditComment.dto";
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

        const {id, content, updated_at} = input

        await CommentDatabase.connection(CommentDatabase.TABLE_COMMENTS).update({content, updated_at}).where({id})

    }

    public deleteComment = async (id: string): Promise<void> => {

        await CommentDatabase.connection(CommentDatabase.TABLE_COMMENTS).del().where({id})
        
    }
    
}