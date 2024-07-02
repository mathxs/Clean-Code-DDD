import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { EditAnswersUseCase } from './edit-answer'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository'
import { makeAnswer } from 'test/factories/make-answer'

let inMemoryAnswerssRepository: InMemoryAnswerRepository
let sut: EditAnswersUseCase

describe('Edit Answers', () => {
  beforeEach(() => {
    inMemoryAnswerssRepository = new InMemoryAnswerRepository()
    sut = new EditAnswersUseCase(inMemoryAnswerssRepository)
  })

  test('should be able to Edit a answers', async () => {
    const newAnswers = makeAnswer(
      { authorId: new UniqueEntityID('author-1') },
      new UniqueEntityID('123'),
    )
    await inMemoryAnswerssRepository.create(newAnswers)

    await sut.execute({
      authorId: 'author-1',
      content: 'Conteúdo da pergunta teste',
      answersId: newAnswers.id.toValue(),
    })

    expect(inMemoryAnswerssRepository.items[0]).toMatchObject({
      content: 'Conteúdo da pergunta teste',
    })
  })

  test('should not be able to Edit a answers from another user', async () => {
    const newAnswers = makeAnswer(
      { authorId: new UniqueEntityID('author-1') },
      new UniqueEntityID('answers-1'),
    )
    await inMemoryAnswerssRepository.create(newAnswers)
    const result = await sut.execute({
      answersId: newAnswers.id.toValue(),
      authorId: 'author-2',
      content: 'Conteúdo da pergunta teste',
    })
    expect(result.isRight()).toBe(false)
  })
})
