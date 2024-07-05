import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { makeQuestion } from 'test/factories/make-question'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    )
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  test('should be able to get a question by slug', async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create('exemplo-pergunta'),
    })
    await inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({
      slug: 'exemplo-pergunta',
    })

    // expect(result.isRight()).toBe(true)
    // if (result.isRight()) {
    //   expect(result.value?.question.id).toBeTruthy()
    //   expect(result.value?.question.title).toEqual(newQuestion.title)

    expect(result.value).toMatchObject({
      question: expect.objectContaining({
        title: newQuestion.title,
      }),
    })
  })
})
