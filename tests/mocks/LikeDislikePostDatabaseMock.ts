import { LikeDislikePostDB } from '../../src/types/types'

const likeDislikePostMock: LikeDislikePostDB[] = [
    {
        post_id: "idPost2",
        user_id: "idMockNormal01",
        like: 1
    },
    {
        post_id: "idPost2",
        user_id: "idMockNormal02",
        like: 0
    },
    {
        post_id: "idPost3",
        user_id: "idMockAdmin01",
        like: 1
    }
]