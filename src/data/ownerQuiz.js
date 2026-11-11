// 습득자가 등록하는 주관식 소유권 확인 퀴즈 — AI가 습득물 사진에서 찾은 특징으로 초안을 만듦 (시연용 고정 결과)
const OWNER_QUIZ = {
  wallet: [
    { feature: '안쪽 카드칸', question: '지갑 안쪽 카드칸에 무엇이 들어 있나요?', answer: '학생증' },
    { feature: '모서리 상태', question: '지갑 모서리는 어떤 상태인가요?', answer: '한쪽 모서리가 까져 있어요' },
    { feature: '앞면 로고', question: '지갑 앞면 로고는 무슨 색인가요?', answer: '실버' },
  ],
  airpods: [
    { feature: '케이스 색', question: '이어폰 케이스는 무슨 색인가요?', answer: '핑크' },
    { feature: '케이스 뒷면', question: '케이스 뒷면에 어떤 흔적이 있나요?', answer: '스티커 자국' },
    { feature: '케이스 표면', question: '케이스 표면에 어떤 사용 흔적이 있나요?', answer: '모서리 마모' },
  ],
}

export function getOwnerQuiz(itemKey = '') {
  return OWNER_QUIZ[itemKey.startsWith('airpods') ? 'airpods' : 'wallet']
}
