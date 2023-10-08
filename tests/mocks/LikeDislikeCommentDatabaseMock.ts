import { BaseDatabase } from '../../src/database/BaseDatabase'
import { LikeDislikeCommentDB } from '../../src/types/types'

const likeDislikeCommentMock: LikeDislikeCommentDB[] = [
    {
        comment_id: "idMockComment3",
        user_id: "idMockNormal01",
        like: 1
    },
    {
        comment_id: "idMockComment1",
        user_id: "idMockAdmin02",
        like: 0
    },
    {
        comment_id: "idMockComment2",
        user_id: "idMockAdmin01",
        like: 1
    }
]

export class LikeDislikeCommentDatabaseMock extends BaseDatabase {

    public static TABLE_LIKE_DISLIKE_POST_DATABASE = "likes_dislikes_comments"

    public createLike = async (input: LikeDislikeCommentDB): Promise<void> => {}

    public findLikeByCommentByUser = async (input: {user_id: string, comment_id: string}): Promise<LikeDislikeCommentDB | undefined> => {

        const {user_id, comment_id} = input

        const result: LikeDislikeCommentDB | undefined = likeDislikeCommentMock.find(item => item.comment_id === comment_id && item.user_id === user_id)

        return result
    }

    public getLikes = async (): Promise<LikeDislikeCommentDB[]> => {

        return likeDislikeCommentMock
    }

    public editLike = async (input: LikeDislikeCommentDB): Promise<void> => {}

    public deleteLike = async (input: {user_id: string, comment_id: string}): Promise<void> => {}
}
