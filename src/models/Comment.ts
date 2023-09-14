

export class Comment {
    
    constructor(
        private id: string,
        private idUser: string,
        private postId: string,
        private parentCommentId: string | null,
        private amountComment: number,
        private content: string,
        private createdAt: string,
        private updatedAt: string,
        private like: number,
        private dislike: number,
        private answers: Comment[]
    ){}

    public getCommentModel = (): CommentModel => {

        return {
            id: this.id,
            idUser: this.idUser,
            postId: this.postId,
            parentCommentId: this.parentCommentId,
            amountComment: this.amountComment,
            content: this.content,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            like: this.like,
            dislike: this.dislike,
            answers: this.answers
        }
    }

    public getId = (): string => {
        return this.id
    }

    public getIdUser = (): string => {
        return this.idUser
    }

    public getPostId = (): string => {
        return this.postId
    }

    public getParentCommentId = (): string | null => {
        return this.parentCommentId
    }
    
    public getAmountComment = (): number => {
        return this.amountComment
    }

    public getContent = (): string => {
        return this.content
    }

    public getCreatedAt = (): string => {
        return this.createdAt
    }

    public getUpdatedAt = (): string => {
        return this.updatedAt
    }

    public getLike = (): number => {
        return this.like
    }

    public getDislike = (): number => {
        return this.dislike
    }

    public setContent = (newContent: string): void => {
        this.content = newContent
    }

    public setUpdateAt = (newUpdateAt: string): void => {
        this.updatedAt = newUpdateAt
    }

    public setLike = (newLike: number): void => {
        this.like = newLike
    }

    public setDilike = (newDilike: number): void => {
        this.dislike = newDilike
    }

    public setAmountComment = (newAmountComment: number): void => {
        this.amountComment = newAmountComment
    }
    
    public getAnswers = (): Comment[]  => {
        return this.answers
    }

}

export interface CommentModel {
        id: string,
        idUser: string,
        postId: string,
        parentCommentId: string | null,
        amountComment: number,
        content: string,
        createdAt: string,
        updatedAt: string,
        like: number,
        dislike: number,
        answers: Comment[]
}