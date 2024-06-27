import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository'
import { AnswerQuestionUseCase } from './answer-question'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: AnswerQuestionUseCase

describe('Create Answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswerRepository)
  })

  test('should be able to create an answer', async () => {
    const { answer } = await sut.execute({
      instructorId: '1',
      questionId: '1',
      content: 'Resposta da pergunta',
    })

    expect(answer.id).toBeTruthy()
    expect(answer.content).toEqual('Resposta da pergunta')
    expect(answer.authorId).toBeTruthy()
    expect(answer.questionId).toBeTruthy()

    expect(inMemoryAnswerRepository.items).toHaveLength(1)
    expect(inMemoryAnswerRepository.items[0]).toEqual(answer)
    expect(inMemoryAnswerRepository.items[0].id).toEqual(answer.id)
  })
})
