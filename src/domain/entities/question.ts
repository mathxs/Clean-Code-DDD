import { Slug } from './value-objects/slug'
import { Entity } from '../../core/entities/entity'
import { UniqueEntityID } from '../../core/entities/unique-entity-id'

interface QuestionProps {
  slug: Slug
  authorId: UniqueEntityID
  bestAnswerId?: UniqueEntityID

  title: string
  content: string
  createdAt: Date
  updateAt?: Date
}

export class Question extends Entity<QuestionProps> {}
