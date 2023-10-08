import { BaseDatabase } from '../../src/database/BaseDatabase'
import {CommentDB, InputEditCommentDB} from '../../src/types/types'

const commentMock: CommentDB[] = [
    {
      id: 'idMockComment1',
      id_user: 'idMockNormal03',
      post_id: 'idPost6',
      content: "Comentário inicial",
      parent_comment_id: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      like: 20,
      dislike: 2
    },
    
    {
      id: 'idMockComment2',
      id_user: 'idMockNormal01',
      post_id: 'idPost6',
      content: "Comentando o primeiro comentário",
      parent_comment_id: 'idMockComment1',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      like: 6,
      dislike: 1
    },

    {
      id: 'idMockComment3',
      id_user: 'idMockAdmin01',
      post_id: 'idPost6',
      content: "Segundo comentário direto no post6.",
      parent_comment_id: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      like: 2,
      dislike: 6
    }
]


export class CommentDatabaseMock extends BaseDatabase {

    public static TABLE_COMMENTS = "comments"

    public createComment = async (): Promise<void> => {

    }

    public findCommentById = async (id: string): Promise<CommentDB | undefined> => {
        
        const result: CommentDB | undefined = commentMock.find(comment => comment.id === id)
        
        return result
    }

    public editComment = async (input: InputEditCommentDB): Promise<void> => {}

    public deleteComment = async (id: string): Promise<void> => {}

    public getComments = async (): Promise<CommentDB[]> => {

      return commentMock
      
    }
}