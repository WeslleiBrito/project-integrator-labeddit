import { BaseDatabase } from '../../src/database/BaseDatabase'
import { LikeDislikePostDB } from '../../src/types/types'

const likeDislikePostMock: LikeDislikePostDB[] = [
    {
        post_id: "idPost2",
        user_id: "idMockNormal01",
        like: 1
    },
    {
        post_id: "idPost2",
        user_id: "idMockAdmin02",
        like: 0
    },
    {
        post_id: "idPost3",
        user_id: "idMockAdmin01",
        like: 1
    }
]

export class LikeDislikePostDatabaseMock extends BaseDatabase {

    public static TABLE_LIKE_DISLIKE_POST_DATABASE = "likes_dislikes_posts"

    public createLike = async (input: LikeDislikePostDB): Promise<void> => {}

    public findLikeByPostByUser = async (input: {user_id: string, post_id: string}): Promise<LikeDislikePostDB | undefined> => {

        const {user_id, post_id} = input

        const result: LikeDislikePostDB | undefined = likeDislikePostMock.find(item => item.post_id === post_id && item.user_id === user_id)

        return result
    }

    public getLikes = async (): Promise<LikeDislikePostDB[]> => {

        return likeDislikePostMock
    }

    public editLike = async (input: LikeDislikePostDB): Promise<void> => {}

    public deleteLike = async (input: {user_id: string, post_id: string}): Promise<void> => {}
}
