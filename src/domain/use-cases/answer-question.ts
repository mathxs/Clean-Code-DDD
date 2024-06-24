import { Answer } from "../entities/answer"
import { AnswersRepository } from "../repositories/answers-repository"

interface AnswerQuestionUseCaseRequest {
  instructorId: string
  content: string
  questionId: string

}

export class AnswerQuestionUseCase {
  constructor(private answerRepository: AnswersRepository){ 

  } 

  async execute({instructorId, questionId, content}: AnswerQuestionUseCaseRequest){
    const answer = new Answer({content, authorId: instructorId, questionId})
    await this.answerRepository.create(answer)
    return answer
  }

}