import { BaseDatabase } from '../../src/database/BaseDatabase'
import {CommentDB} from '../../src/types/types'

const commentMock: CommentDB[] = [
    {
      id: 'idMockComment1',
      id_user: 'idMockNormal03',
      post_id: 'idPost6',
      content: "Comentário inicial",
      parent_comment_id: null,
      amount_comment: 6,
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
      amount_comment: 3,
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
      amount_comment: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      like: 2,
      dislike: 6
    },

    {
      id: 'idMockComment4',
      id_user: 'idMockAdmin01',
      post_id: 'idPost4',
      content: "Comentário inicial no post 4",
      parent_comment_id: null,
      amount_comment: 6,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      like: 7,
      dislike: 0
    },
    {
      id: 'idMockComment5',
      id_user: 'idMockMaster',
      post_id: 'idPost4',
      content: "Comentando o comentário 4",
      parent_comment_id: 'idMockComment4',
      amount_comment: 2,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      like: 0,
      dislike: 0
    },
    {
      id: 'idMockComment6',
      id_user: 'idMockNormal03',
      post_id: 'idPost4',
      content: "Comentando o comentário 5",
      parent_comment_id: null,
      amount_comment: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      like: 8,
      dislike: 6
    },
    {
      id: 'idMockComment7',
      id_user: 'idMockAdmin02',
      post_id: 'idPost1',
      content: "Comentário inicial no post 1",
      parent_comment_id: null,
      amount_comment: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      like: 1,
      dislike: 9
    },

]


export class CommentDatabaseMock extends BaseDatabase {

    public static TABLE_COMMENTS = "comments"

    public createComment = async (): Promise<void> => {

    }

    public findCommentById = async (id: string): Promise<CommentDB | undefined> => {

        const result: CommentDB | undefined = commentMock.find(comment => comment.id === id)

        return result
    }
}