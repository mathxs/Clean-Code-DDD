import { Answer } from '../../enterprise/entities/answer'

export interface AnswersRepository {
  create(answer: Answer): Promise<void>
  delete(answer: Answer): Promise<void>
  findByID(id: string): Promise<Answer | null>
  save(answer: Answer): Promise<void>
}
