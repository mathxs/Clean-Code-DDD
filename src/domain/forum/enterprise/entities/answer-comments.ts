import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface AnswerCommentProps {
  authorId: UniqueEntityID
  answerId: UniqueEntityID

  content: string
  createdAt: Date
  updateAt?: Date
}

export class AnswerComent extends Entity<AnswerCommentProps> {
  get authorId() {
    return this.props.authorId
  }

  get answerId() {
    return this.props.answerId
  }

  get content() {
    return this.props.content
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updateAt() {
    return this.props.updateAt
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  private touch() {
    this.props.updateAt = new Date()
  }

  static create(
    props: Optional<AnswerCommentProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const answerComent = new AnswerComent(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id,
    )

    return answerComent
  }
}
