import { QuestionComment } from '../../enterprise/entities/question-comments'

export interface QuestionsCommentsRepository {
  create(questionComments: QuestionComment): Promise<void>
  delete(questionComments: QuestionComment): Promise<void>
  findByID(id: string): Promise<QuestionComment | null>
}
