import { Either, left, right } from '@/core/either'
import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'
import { NotAllowedError } from './errors/not-allowed-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface EditAnswersUseCaseRequest {
  authorId: string
  answersId: string
  content: string
}

type EditAnswersUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    answers: Answer
  }
>

export class EditAnswersUseCase {
  constructor(private answerssRepository: AnswersRepository) {}

  async execute({
    authorId,
    answersId,
    content,
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

    answers.content = content

    await this.answerssRepository.save(answers)

    return right({ answers })
  }
}
