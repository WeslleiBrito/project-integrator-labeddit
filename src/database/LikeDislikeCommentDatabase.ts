import { LikeDislikeCommentDB } from "../types/types";
import { BaseDatabase } from "./BaseDatabase";


export class LikeDislikeCommentDatabase extends BaseDatabase {

    public static TABLE_LIKE_DISLIKE_COMMENTS = "likes_dislikes_comments"

    public createLike = async (input: LikeDislikeCommentDB): Promise<void> => {

        await LikeDislikeCommentDatabase.connection(LikeDislikeCommentDatabase.TABLE_LIKE_DISLIKE_COMMENTS).insert(input)

    }

    public findLikeByCommentByUser = async (input: {user_id: string, comment_id: string}): Promise<LikeDislikeCommentDB | undefined> => {
        const {user_id, comment_id} = input

        const [result]: LikeDislikeCommentDB[] | undefined[] = await LikeDislikeCommentDatabase.connection(LikeDislikeCommentDatabase.TABLE_LIKE_DISLIKE_COMMENTS)
        .where({user_id}).andWhere({comment_id})

        return result
    }

    public getLikes = async (): Promise<LikeDislikeCommentDB[]> => {

        const result: LikeDislikeCommentDB[] = await LikeDislikeCommentDatabase.connection(LikeDislikeCommentDatabase.TABLE_LIKE_DISLIKE_COMMENTS)

        return result
    }

    public editLike = async (input: LikeDislikeCommentDB): Promise<void> => {
        const {user_id,  comment_id, like} = input

        await LikeDislikeCommentDatabase.connection(LikeDislikeCommentDatabase.TABLE_LIKE_DISLIKE_COMMENTS)
        .where({user_id}).andWhere({comment_id}).update({like})
    }

    public deleteLike = async (input: {user_id: string, comment_id: string}): Promise<void> => {
        const {user_id,  comment_id} = input

        await LikeDislikeCommentDatabase.connection(LikeDislikeCommentDatabase.TABLE_LIKE_DISLIKE_COMMENTS)
        .where({user_id}).andWhere({comment_id}).del()
    }
}