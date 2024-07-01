import { QuestionsCommentsRepository } from '../repositories/question-comments-repository'

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string
  questionCommentId: string
}

interface DeleteQuestionCommentUseCaseResponse {}

export class DeleteQuestionCommentUseCase {
  constructor(
    private questionsCommentsRepository: QuestionsCommentsRepository,
  ) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questionComment =
      await this.questionsCommentsRepository.findByID(questionCommentId)

    if (!questionComment) {
      throw new Error('Question Comment not found')
    }

    if (questionComment.authorId.toString() !== authorId) {
      throw new Error('You can only delete your own comments')
    }
    await this.questionsCommentsRepository.delete(questionComment)
    return {}
  }
}
