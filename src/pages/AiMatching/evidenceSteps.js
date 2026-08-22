import wornPhotoStory from '../../assets/ai-matching/samples/worn-photo-story.png'

export const EVIDENCE_STEPS = [
  {
    badge: '1/3',
    title: '구매 영수증이 있나요?',
    subtitle: '온·오프라인 구매 내역을 올려주세요.',
    tip: '영수증에 상품명이나 구매 시점이 보이면 확인에 도움이 돼요.',
    accept: 'application/pdf',
    sample: { url: '/samples/matin_kim_receipt.pdf', name: 'matin_kim_receipt.pdf' },
    reviewLabel: '답변 1',
    reviewTitle: '구매 영수증',
    reviewDetail: '2026.07.15 구매',
  },
  {
    badge: '2/3',
    title: '기기 연결 기록이 있나요?',
    subtitle: '블루투스 페어링 이력이나 연결 기록 화면을 올려주세요.',
    tip: '이어폰, 스마트워치 같은 기기 확인에 도움이 돼요.',
    accept: 'image/*',
    sample: null,
    reviewLabel: '답변 2',
    reviewTitle: '블루투스 연결 기록',
    reviewDetail: '기기 연결 기록 스크린샷',
  },
  {
    badge: '3/3',
    title: '이전에 사용한 사진이 있나요?',
    subtitle: '물건을 착용하거나 사용하던 사진을 올려주세요.',
    tip: 'SNS, 갤러리 사진도 괜찮아요.',
    accept: 'image/*',
    sample: { url: wornPhotoStory, name: 'worn-photo-story.png' },
    reviewLabel: '답변 3',
    reviewTitle: '과거 사용 사진',
    reviewDetail: '갤러리 사진 2장',
  },
]

export const EMPTY_EVIDENCE_FILES = EVIDENCE_STEPS.map(() => [])
