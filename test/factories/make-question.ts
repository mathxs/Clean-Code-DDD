import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Question,
  QuestionProps,
} from '@/domain/forum/enterprise/entities/question'

export function makeQuestion(override: Partial<QuestionProps> = {}) {
  const newQuestion = Question.create({
    title: 'Exemplo pergunta',
    authorId: new UniqueEntityID('123'),
    content: 'Conteúdo da pergunta',
    ...override,
  })

  return newQuestion
}
