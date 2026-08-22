import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import iconInfo from '../../assets/lost-register/icon-info.svg'
import iconChevronRight from '../../assets/home/icon-chevron-right.svg'
import iconReceipt from '../../assets/ai-matching/icon-receipt.svg'
import iconDevices from '../../assets/ai-matching/icon-devices.svg'
import iconPerson from '../../assets/ai-matching/icon-person.svg'
import iconChevronDown from '../../assets/ai-matching/icon-chevron-down.svg'
import BottomSheet from '../../components/common/BottomSheet/BottomSheet'
import './OwnershipEvidence.css'

const FAQ_ITEMS = [
  {
    id: 'faq-1',
    question: '어떤 자료를 제출할 수 있나요?',
    answer:
      '구매 영수증, 기기 연결 기록, 이전에 사용하거나 착용한 사진처럼 내가 사용한 물건이라는 걸 확인할 수 있는 자료를 제출할 수 있어요.',
  },
  {
    id: 'faq-2',
    question: '자료는 하나만 제출해도 되나요?',
    answer:
      '네. 확인에 도움이 되는 자료를 하나 이상 제출해주세요. 여러 자료를 함께 제출하면 확인에 더 도움이 될 수 있어요.',
  },
  {
    id: 'faq-3',
    question: '제출한 자료는 누가 확인하나요?',
    answer: '자료는 현재 물건을 보관하고 있는 습득자가 실제 물건과 비교해 확인해요.',
  },
  {
    id: 'faq-4',
    question: '자료를 제출하면 바로 주인으로 확인되나요?',
    answer: '아니요. 습득자가 제출한 자료와 실제 물건을 비교한 뒤 확인 결과가 정해져요.',
  },
]

const EVIDENCE_ITEMS = [
  {
    id: 'receipt',
    icon: iconReceipt,
    title: '구매 영수증',
    desc: '구매한 날짜나 상품 정보를 확인할 수 있는 영수증을 준비해주세요.',
    example: '예: 온라인 주문 내역, 카드 영수증, 매장 구매 영수증',
  },
  {
    id: 'device',
    icon: iconDevices,
    title: '기기 연결 기록 스크린샷',
    desc: '해당 기기를 사용한 기록이 보이는 연결 화면을 준비해주세요.',
    example: '예: 블루투스 연결 기록, 등록된 기기 목록, 기기명 화면',
  },
  {
    id: 'photo',
    icon: iconPerson,
    title: '과거 착용 사진',
    desc: '분실 전 실제로 사용하거나 착용한 모습이 담긴 사진을 준비해주세요.',
    example: '예: 갤러리 사진, SNS 사진, 일상 사진',
  },
]

export default function OwnershipEvidence() {
  const navigate = useNavigate()
  const [isSheetOpen, setSheetOpen] = useState(false)
  const [openItemId, setOpenItemId] = useState(null)
  const [isFaqSheetOpen, setFaqSheetOpen] = useState(false)
  const [openFaqId, setOpenFaqId] = useState(null)

  const toggleItem = (id) => {
    setOpenItemId((prev) => (prev === id ? null : id))
  }

  const toggleFaq = (id) => {
    setOpenFaqId((prev) => (prev === id ? null : id))
  }

  return (
    <div className="ownership-evidence">
      <span className="ownership-evidence__badge">2차 소유권 확인중</span>

      <h2 className="ownership-evidence__title">소유권을 확인할 자료를 추가해주세요</h2>
      <p className="ownership-evidence__desc">습득자가 답변한 결과를 확인하고, 재검증을 요청할 수 있어요.</p>

      <div className="ownership-evidence__callout">
        <img src={iconInfo} alt="" className="ownership-evidence__callout-icon" />
        <p className="ownership-evidence__callout-text">
          제출 자료는 습득자에게만 공유되며, 검토 후 즉시 삭제돼요.
        </p>
      </div>

      <div className="ownership-evidence__list">
        <button
          type="button"
          className="ownership-evidence__list-row"
          onClick={() => setFaqSheetOpen(true)}
        >
          <span>자주 묻는 질문</span>
          <img src={iconChevronRight} alt="" />
        </button>
        <div className="ownership-evidence__list-divider" />
        <div className="ownership-evidence__list-row">
          <span>고객센터 문의하기</span>
          <img src={iconChevronRight} alt="" />
        </div>
      </div>

      <div className="ownership-evidence__next-wrap">
        <button type="button" className="ownership-evidence__next" onClick={() => setSheetOpen(true)}>
          다음
        </button>
      </div>

      <BottomSheet
        isOpen={isSheetOpen}
        onClose={() => setSheetOpen(false)}
        title="다음 자료를 준비해주세요"
        footer={
          <button
            type="button"
            className="evidence-sheet__confirm"
            onClick={() => navigate('/matching/result/ownership/evidence/upload')}
          >
            확인
          </button>
        }
      >
        <p className="evidence-sheet__desc">아래 항목 중 하나 이상을 제출해주세요.</p>
        <div className="evidence-sheet__list">
          {EVIDENCE_ITEMS.map((item) => {
            const isOpenItem = openItemId === item.id
            return (
              <div className="evidence-sheet__item" key={item.id}>
                <button
                  type="button"
                  className="evidence-sheet__item-trigger"
                  onClick={() => toggleItem(item.id)}
                >
                  <img src={item.icon} alt="" className="evidence-sheet__item-icon" />
                  <span className="evidence-sheet__item-title">{item.title}</span>
                  <img
                    src={iconChevronDown}
                    alt=""
                    className={`evidence-sheet__item-chevron${isOpenItem ? ' evidence-sheet__item-chevron--open' : ''}`}
                  />
                </button>
                {isOpenItem && (
                  <div className="evidence-sheet__item-body">
                    <p className="evidence-sheet__item-desc">{item.desc}</p>
                    <p className="evidence-sheet__item-example">{item.example}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </BottomSheet>

      <BottomSheet isOpen={isFaqSheetOpen} onClose={() => setFaqSheetOpen(false)} title="자주 묻는 질문">
        <div className="evidence-sheet__list">
          {FAQ_ITEMS.map((item) => {
            const isOpenItem = openFaqId === item.id
            return (
              <div className="evidence-sheet__item" key={item.id}>
                <button
                  type="button"
                  className="evidence-sheet__item-trigger"
                  onClick={() => toggleFaq(item.id)}
                >
                  <span className="evidence-sheet__item-title">{item.question}</span>
                  <img
                    src={iconChevronDown}
                    alt=""
                    className={`evidence-sheet__item-chevron${isOpenItem ? ' evidence-sheet__item-chevron--open' : ''}`}
                  />
                </button>
                {isOpenItem && (
                  <div className="evidence-sheet__item-body">
                    <p className="evidence-sheet__item-desc">{item.answer}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </BottomSheet>
    </div>
  )
}
