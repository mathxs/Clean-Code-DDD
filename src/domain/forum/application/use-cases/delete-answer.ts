import { AnswersRepository } from '../repositories/answers-repository'

interface DeleteAnswerUseCaseRequest {
  answerId: string
  authorId: string
}
interface DeleteAnswerUseCaseResponse {}

export class DeleteAnswerUseCase {
  constructor(private answerRepository: AnswersRepository) {}

  async execute({
    authorId,
    answerId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findByID(answerId)
    if (!answer) {
      throw new Error('Answer not found')
    }
    if (answer.authorId.toString() !== authorId) {
      throw new Error('Unauthorized')
    }
    await this.answerRepository.delete(answer)
    return {}
  }
}
