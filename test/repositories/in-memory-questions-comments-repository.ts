import { QuestionsCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comments'

export class InMemoryQuestionsCommentsRepository
  implements QuestionsCommentsRepository
{
  public items: QuestionComment[] = []

  async create(questionComment: QuestionComment) {
    this.items.push(questionComment)
  }
}
