import AnswerReview from './AnswerReview'
import { ANSWER_OPTIONS, QUIZ_STEPS } from './OwnershipQuizQuestion'

const ANSWER_LABELS = Object.fromEntries(ANSWER_OPTIONS.map((option) => [option.id, option.title]))

export default function OwnershipQuizReview({ answers, onEdit, onSubmit, steps = QUIZ_STEPS }) {
  const cards = steps.map((step, index) => ({
    question: step.question,
    answer: ANSWER_LABELS[answers[index]],
  }))

  return <AnswerReview cards={cards} onEdit={onEdit} onSubmit={onSubmit} />
}
