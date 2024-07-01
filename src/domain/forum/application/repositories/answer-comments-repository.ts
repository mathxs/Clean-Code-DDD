import { AnswerComment } from '../../enterprise/entities/answer-comments'

export interface AnswerCommentsRepository {
  create(answerComments: AnswerComment): Promise<void>
}
