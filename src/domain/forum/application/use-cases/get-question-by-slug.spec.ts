import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { Question } from '../../enterprise/entities/question'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  test('should be able to get a question by slug', async () => {
    const newQuestion = Question.create({
      title: 'Exemplo pergunta',
      slug: Slug.create('exemplo-pergunta'),
      authorId: new UniqueEntityID('123'),
      content: 'Conteúdo da pergunta',
    })
    inMemoryQuestionsRepository.create(newQuestion)

    const { question } = await sut.execute({
      slug: 'exemplo-pergunta',
    })

    expect(question.id).toBeTruthy()
    expect(question.title).toBe('Exemplo pergunta')
    expect(question.slug.value).toBe('exemplo-pergunta')
    expect(question.authorId.toString()).toBe('123')
    expect(question.content).toBe('Conteúdo da pergunta')
  })
})
