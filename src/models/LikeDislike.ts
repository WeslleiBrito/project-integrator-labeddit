

export class LikeDislike {

    constructor(
        private userId: string,
        private postId: string,
        private like: number
    ){}

    public getLikeDislike = (): likeDislike => {
        return {
            userId: this.userId,
            postId: this.postId,
            like: this.like
        }
    }
}


interface likeDislike {
    userId: string,
    postId: string,
    like: number
}

