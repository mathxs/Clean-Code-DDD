import { QuestionAttachment } from '../../enterprise/entities/question-attchment'

export interface QuestionAttachmentsRepository {
  findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]>
}
