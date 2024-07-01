import { QuestionComment } from '../../enterprise/entities/question-comments'

export interface QuestionsCommentsRepository {
  create(questionComments: QuestionComment): Promise<void>
}
