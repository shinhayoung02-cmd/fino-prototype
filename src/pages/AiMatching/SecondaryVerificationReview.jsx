import AnswerReview from './AnswerReview'
import { SECONDARY_VERIFICATION_STEPS, SECONDARY_VERIFICATION_ANSWER_LABELS } from './SecondaryVerificationQuestion'

export default function SecondaryVerificationReview({ answers, onEdit, onSubmit, steps = SECONDARY_VERIFICATION_STEPS }) {
  const cards = steps.map((step, index) => ({
    question: step.question,
    answer: SECONDARY_VERIFICATION_ANSWER_LABELS[answers[index]],
  }))

  return <AnswerReview cards={cards} onEdit={onEdit} onSubmit={onSubmit} />
}
