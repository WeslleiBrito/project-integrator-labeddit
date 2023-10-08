import { CommentModel } from "./Comment"

export class Post {

    constructor(
        private id: string,
        private creator: {id: string, name: string},
        private content: string,
        private like: number,
        private dislike: number,
        private amountComments: number,
        private createdAt: string,
        private updatedAt: string,
        private comments: CommentModel[]
    ){}

    public getId = (): string => {
        return this.id
    }

    public getUserId = (): string => {
        return this.creator.id
    }

    public getNameUser = (): string => {
        return this.creator.name
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
    
    public getComments = (): CommentModel[] => {
        return this.comments
    }

    public getPostModel = (): PostModel => {

        const model: PostModel = {
            id: this.id,
            content: this.content,
            creator: {
                id: this.creator.id,
                name: this.creator.name
            },
            like: this.like,
            dislike: this.dislike,
            amountComments: this.amountComments,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            comments: this.comments
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
    content: string
    like: number
    dislike: number
    amountComments: number
    createdAt: string
    updatedAt: string
    creator: {
        id: string,
        name: string
    }
    comments: CommentModel[]
}