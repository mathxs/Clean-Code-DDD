import { QuestionsRepository } from '../repositories/questions-repository'

interface DeleteQuestionUseCaseRequest {
  questionId: string
  authorId: string
}
interface DeleteQuestionUseCaseResponse {}

export class DeleteQuestionUseCase {
  constructor(private questionRepository: QuestionsRepository) {}

  async execute({
    authorId,
    questionId,
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.questionRepository.findByID(questionId)
    if (!question) {
      throw new Error('Question not found')
    }
    if (question.authorId.toString() !== authorId) {
      throw new Error('Unauthorized')
    }
    await this.questionRepository.delete(question)
    return {}
  }
}
