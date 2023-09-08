
export class post {

    constructor(
        private id: string,
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
    
    public setContent = (newContent: string): void => {
        this.content = newContent
    }
}