import { WatchedList } from '@/core/entities/watched-list'
import { AnswerAttachment } from './answer-attchment'

export class AnswerAttachmentList extends WatchedList<AnswerAttachment> {
  compareItems(a: AnswerAttachment, b: AnswerAttachment): boolean {
    return a.attachmentId === b.attachmentId
  }
}
