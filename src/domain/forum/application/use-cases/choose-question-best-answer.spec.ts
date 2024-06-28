import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer'
import { makeQuestion } from 'test/factories/make-question'

let inMemoryQuestionRepository: InMemoryQuestionsRepository
let inMemoryAnswersRepository: InMemoryAnswerRepository
let sut: ChooseQuestionBestAnswerUseCase

describe('Chosse Question Best Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswerRepository()
    inMemoryQuestionRepository = new InMemoryQuestionsRepository()
    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryQuestionRepository,
      inMemoryAnswersRepository,
    )
  })

  test('should be able to choose the question best answer', async () => {
    const question = makeQuestion()
    const answer = makeAnswer({ questionId: question.id })

    await inMemoryQuestionRepository.create(question)
    await inMemoryAnswersRepository.create(answer)

    await sut.execute({
      authorId: question.authorId.toString(),
      answerId: answer.id.toString(),
    })

    expect(inMemoryQuestionRepository.items[0].bestAnswerId).toEqual(answer.id)
  })

  test('should not be able to choose another user question best answer', async () => {
    const question = makeQuestion({ authorId: new UniqueEntityID('author-1') })
    const answer = makeAnswer({ questionId: question.id })

    await inMemoryQuestionRepository.create(question)
    await inMemoryAnswersRepository.create(answer)

    await sut.execute({
      authorId: question.authorId.toString(),
      answerId: answer.id.toString(),
    })

    await expect(() => {
      return sut.execute({
        authorId: 'author-2',
        answerId: answer.id.toString(),
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
