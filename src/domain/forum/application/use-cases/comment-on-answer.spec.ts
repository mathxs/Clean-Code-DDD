import { makeAnswer } from 'test/factories/make-answer'
import { CommentOnAnswerUseCase } from './comment-on-answer'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository'
import { InMemoryAnswersCommentsRepository } from 'test/repositories/in-memory-answers-comments-repository'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachmentes-repository'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let inMemoryAnswerCommentsRepository: InMemoryAnswersCommentsRepository
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let sut: CommentOnAnswerUseCase

describe('Chosse Answer Best Answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository(
      inMemoryAnswerAttachmentsRepository,
    )
    inMemoryAnswerCommentsRepository = new InMemoryAnswersCommentsRepository()
    sut = new CommentOnAnswerUseCase(
      inMemoryAnswerRepository,
      inMemoryAnswerCommentsRepository,
    )
  })

  test('should be able to comment on answer', async () => {
    const answer = makeAnswer()

    await inMemoryAnswerRepository.create(answer)

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: answer.authorId.toString(),
      content: 'Comment content',
    })

    expect(inMemoryAnswerCommentsRepository.items[0].content).toEqual(
      'Comment content',
    )
  })
})
