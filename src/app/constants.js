// 홈 화면 '결과 도착' 알림이 뜨기까지 기다리는 시간(ms) — 시연용 연출
export const MATCH_RESULT_DELAY = 1300
export const VERIFICATION_RESULT_DELAY = 1000
export const APPROVAL_RESULT_DELAY = 1300
export const PARCEL_RESULT_DELAY = 3000
export const DELIVERY_DONE_DELAY = 1000
export const RETURN_PROPOSAL_DELAY = 2000
export const RETRY_RETURN_PROPOSAL_DELAY = 3000

export const PARCEL_PROGRESS_STEPS = ['발송대기', '접수완료', '배송중', '수령완료']

export const DELIVERY_METHOD_PICK_OPTIONS = [
  { id: 'in-person', label: '직접 만나서 전달' },
  { id: 'parcel', label: '일반 택배로 전달' },
  { id: 'parcel-store', label: '편의점 택배로 전달' },
]

// 실서비스 도메인 — 시연용 UI(폰 테두리·상태바·플로우 설정)를 숨긴다. dev 미리보기·fino-v2에선 그대로
export const IS_LIVE = ['withfino.com', 'www.withfino.com'].includes(window.location.hostname)
