import { Either, left, right } from '@/core/either'
import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'
import { NotAllowedError } from './errors/not-allowed-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { AnswerAttachmentsRepository } from '../repositories/answer-attachments-repository'
import { AnswerAttachmentList } from '../../enterprise/entities/answer-attachment-list'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswerAttachment } from '../../enterprise/entities/answer-attchment'

interface EditAnswersUseCaseRequest {
  authorId: string
  answersId: string
  content: string
  attachmentsIds: string[]
}

type EditAnswersUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    answers: Answer
  }
>

export class EditAnswersUseCase {
  constructor(
    private answerssRepository: AnswersRepository,
    private answerAttachmentsRepository: AnswerAttachmentsRepository,
  ) {}

  async execute({
    authorId,
    answersId,
    content,
    attachmentsIds,
  }: EditAnswersUseCaseRequest): Promise<EditAnswersUseCaseResponse> {
    const answers = await this.answerssRepository.findByID(answersId)

    if (!answers) {
      // throw new Error('Answers not found.')
      return left(new ResourceNotFoundError())
    }

    if (authorId !== answers.authorId.toString()) {
      // throw new Error('Not allowed.')
      return left(new NotAllowedError())
    }

    const currentAnswerAttachments =
      await this.answerAttachmentsRepository.findManyByAnswerId(answersId)
    const answerAttachmentList = new AnswerAttachmentList(
      currentAnswerAttachments,
    )

    const answerAttachments = attachmentsIds.map((attachmentId) => {
      return AnswerAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        answerId: answers.id,
      })
    })

    answerAttachmentList.update(answerAttachments)

    answers.attachments = answerAttachmentList
    answers.content = content

    await this.answerssRepository.save(answers)

    return right({ answers })
  }
}
