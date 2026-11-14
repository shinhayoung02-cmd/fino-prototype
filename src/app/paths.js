// 여러 파일에서 쓰는 화면 경로와 경로 계산

export const OWNERSHIP_PATH = '/matching/result/ownership'
export const PARCEL_GENERAL_RECEIPT_PATH = `${OWNERSHIP_PATH}/parcel/general/receipt`

export const FOUND_MATCH_RESULT_PATH = '/found/match-result'
export const FOUND_QUIZ_PATH = `${FOUND_MATCH_RESULT_PATH}/quiz`
export const FOUND_CLAIMANTS_PATH = `${FOUND_QUIZ_PATH}/claimants`
export const FOUND_CLAIMANTS_RESULT_PATH = `${FOUND_CLAIMANTS_PATH}/result`
export const FOUND_VERIFICATION_PATH = `${FOUND_CLAIMANTS_PATH}/verification`
export const FOUND_RETURN_PREP_PATH = `${FOUND_CLAIMANTS_PATH}/return-prep`
export const FOUND_RETURN_REVIEW_PATH = `${FOUND_RETURN_PREP_PATH}/review`

// 소유권 확인 결과는 플로우 설정 스위치(다중 분실자·퀴즈 실패)를 따라감
export function getVerificationResultPath({ isMultipleClaimantsFlow, isQuizFailFlow }) {
  if (isMultipleClaimantsFlow) return `${OWNERSHIP_PATH}/claimants`
  if (isQuizFailFlow) return `${OWNERSHIP_PATH}/quiz-failed`
  return `${OWNERSHIP_PATH}/verified`
}

// 습득자가 채점한 소유권 퀴즈 결과 → 다음 화면
export function getOwnershipQuizResultPath(answers) {
  const incorrectCount = answers.filter((answer) => answer === 'incorrect').length
  const unsureCount = answers.filter((answer) => answer === 'unsure').length
  if (unsureCount >= 1) return FOUND_CLAIMANTS_PATH
  if (incorrectCount >= 1) return `${FOUND_QUIZ_PATH}/undecided`
  return FOUND_CLAIMANTS_RESULT_PATH
}
