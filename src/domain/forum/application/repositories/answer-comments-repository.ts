import { AnswerComment } from '../../enterprise/entities/answer-comments'

export interface AnswerCommentsRepository {
  create(answerComments: AnswerComment): Promise<void>
  delete(answerComments: AnswerComment): Promise<void>
  findById(id: string): Promise<AnswerComment | null>
}
