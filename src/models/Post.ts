
export class Post {

    constructor(
        private id: string,
        private userId: string,
        private content: string,
        private like: number,
        private dislike: number,
        private amountComments: number,
        private createdAt: string,
        private updatedAt: string
    ){}

    public getId = (): string => {
        return this.id
    }

    public getUserId = (): string => {
        return this.userId
    }

    public getContent = (): string => {
        return this.content
    }

    public getLike = (): number => {
        return this.like
    }

    public getDislike = (): number => {
        return this.dislike
    }

    public getAmountComments = (): number => {
        return this.amountComments
    }

    public getCreatedAt = (): string => {
        return this.createdAt
    }

    public getUpdatedAt = (): string => {
        return this.updatedAt
    }
    
    public getPostModel = (): PostModel => {

        const model: PostModel = {
            id: this.id,
            userId: this.userId,
            content: this.content,
            like: this.like,
            dislike: this.dislike,
            amountComments: this.amountComments,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        }

        return model
    }

    public setContent = (newContent: string): void => {
        this.content = newContent
    }

    public setUpdateAt = (newUpdateAt: string): void => {
        this.updatedAt = newUpdateAt
    }
    
}

export interface PostModel {
    id: string
    userId: string
    content: string
    like: number
    dislike: number
    amountComments: number
    createdAt: string
    updatedAt: string
}