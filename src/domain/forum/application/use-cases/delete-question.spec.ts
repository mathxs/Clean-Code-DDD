import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { DeleteQuestionUseCase } from './delete-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: DeleteQuestionUseCase

describe('Delete Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
  })

  test('should be able to delete a question', async () => {
    const newQuestion = makeQuestion({}, new UniqueEntityID('123'))
    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      questionId: '123',
    })

    expect(inMemoryQuestionsRepository.items).toHaveLength(0)
  })
})
