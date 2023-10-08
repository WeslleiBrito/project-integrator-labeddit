import { LikeDislikePostDB } from "../types/types";
import { BaseDatabase } from "./BaseDatabase";


export class LikeDislikePostDatabase extends BaseDatabase {

    public static TABLE_LIKE_DISLIKE_POSTS = "likes_dislikes_posts"

    public createLike = async (input: LikeDislikePostDB): Promise<void> => {

        await LikeDislikePostDatabase.connection(LikeDislikePostDatabase.TABLE_LIKE_DISLIKE_POSTS).insert(input)

    }

    public findLikeByPostByUser = async (input: {user_id: string, post_id: string}): Promise<LikeDislikePostDB | undefined> => {
        const {user_id, post_id} = input

        const [result]: LikeDislikePostDB[] | undefined[] = await LikeDislikePostDatabase.connection(LikeDislikePostDatabase.TABLE_LIKE_DISLIKE_POSTS)
        .where({user_id}).andWhere({post_id})

        return result
    }

    public getLikes = async (): Promise<LikeDislikePostDB[]> => {

        const result: LikeDislikePostDB[] = await LikeDislikePostDatabase.connection(LikeDislikePostDatabase.TABLE_LIKE_DISLIKE_POSTS)

        return result
    }

    public editLike = async (input: LikeDislikePostDB): Promise<void> => {
        const {user_id,  post_id, like} = input

        await LikeDislikePostDatabase.connection(LikeDislikePostDatabase.TABLE_LIKE_DISLIKE_POSTS)
        .where({user_id}).andWhere({post_id}).update({like})
    }

    public deleteLike = async (input: {user_id: string, post_id: string}): Promise<void> => {
        const {user_id,  post_id} = input

        await LikeDislikePostDatabase.connection(LikeDislikePostDatabase.TABLE_LIKE_DISLIKE_POSTS)
        .where({user_id}).andWhere({post_id}).del()
    }
}