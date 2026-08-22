import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import iconInfo from '../../assets/lost-register/icon-info.svg'
import iconChevronDown from '../../assets/ai-matching/icon-chevron-down.svg'
import iconMeetupCrowd from '../../assets/ai-matching/icon-meetup-crowd.svg'
import iconMeetupSchedule from '../../assets/ai-matching/icon-meetup-schedule.svg'
import iconMeetupConfirm from '../../assets/ai-matching/icon-meetup-confirm.svg'
import iconParcelCheck from '../../assets/ai-matching/icon-parcel-check.svg'
import BottomSheet from '../../components/common/BottomSheet/BottomSheet'
import './DeliveryMethodSelect.css'

const DELIVERY_OPTIONS = [
  { id: 'meetup', title: '직접 만나서 받기', desc: '약속한 장소와 시간에 직접 받아요.' },
  { id: 'parcel', title: '택배로 받기', desc: '습득자가 가까운 접수처에서 보내요.' },
]

const PARCEL_SUB_OPTIONS = [
  { id: 'general', title: '일반 택배', desc: '택배사를 통해 원하는 주소로 받아요.' },
  { id: 'store', title: '편의점 택배', desc: '가까운 편의점에서 접수해 받아요.' },
]

const MEETUP_CHECK_ITEMS = [
  {
    id: 'crowded-place',
    icon: iconMeetupCrowd,
    title: '사람 많은 곳에서 만나요',
    desc: '지하철역, 편의점 앞처럼 밝고 사람들이 오가는 장소를 추천해요. 집 주소나 한적한 장소는 피해주세요.',
  },
  {
    id: 'place-and-time',
    icon: iconMeetupSchedule,
    title: '장소와 시간을 함께 정해요',
    desc: '분실자가 희망 장소와 시간을 제안하면 습득자가 가능한 일정을 확인해요. 서로 확인한 뒤 약속이 확정돼요.',
  },
  {
    id: 'confirm-item',
    icon: iconMeetupConfirm,
    title: '물건을 확인한 뒤 완료해요',
    desc: '전달받은 물건이 맞는지 확인한 뒤 수령 완료를 눌러주세요. 감사는 물건 전달이 끝난 뒤 전해져요.',
  },
]

export default function DeliveryMethodSelect() {
  const navigate = useNavigate()
  const [selectedId, setSelectedId] = useState('meetup')
  const [isMeetupSheetOpen, setMeetupSheetOpen] = useState(false)
  const [openItemId, setOpenItemId] = useState(null)
  const [parcelType, setParcelType] = useState(null)
  const [isParcelSheetOpen, setParcelSheetOpen] = useState(false)
  const [pendingParcelType, setPendingParcelType] = useState('general')

  const toggleItem = (id) => {
    setOpenItemId((prev) => (prev === id ? null : id))
  }

  const handleNext = () => {
    if (selectedId === 'meetup') {
      setMeetupSheetOpen(true)
    } else if (selectedId === 'parcel') {
      setPendingParcelType(parcelType || 'general')
      setParcelSheetOpen(true)
    }
  }

  const handleConfirmParcelType = () => {
    setParcelType(pendingParcelType)
    setParcelSheetOpen(false)
    navigate(`/matching/result/ownership/parcel/${pendingParcelType}`)
  }

  const selectedParcelOption = PARCEL_SUB_OPTIONS.find((option) => option.id === parcelType)

  return (
    <div className="delivery-method">
      <h2 className="delivery-method__title">어떻게 물건을 받을까요?</h2>
      <p className="delivery-method__subtitle">원하는 전달 방법을 선택해주세요.</p>

      <div className="delivery-method__callout">
        <img src={iconInfo} alt="" className="delivery-method__callout-icon" />
        <p className="delivery-method__callout-text">감사는 물건을 돌려받은 뒤 전달돼요</p>
      </div>

      <div className="delivery-method__options">
        {DELIVERY_OPTIONS.map((option) => {
          const isSelected = selectedId === option.id
          const showParcelFooter = option.id === 'parcel' && isSelected && selectedParcelOption
          return (
            <div
              key={option.id}
              className={`delivery-method__option-wrap${showParcelFooter ? ' delivery-method__option-wrap--with-footer' : ''}`}
            >
              <button
                type="button"
                className={`delivery-method__option${isSelected ? ' delivery-method__option--selected' : ''}`}
                onClick={() => setSelectedId(option.id)}
              >
                <span className="delivery-method__option-body">
                  <span className="delivery-method__option-title">{option.title}</span>
                  <span className="delivery-method__option-desc">{option.desc}</span>
                </span>
                <span
                  className={`delivery-method__option-radio${isSelected ? ' delivery-method__option-radio--selected' : ''}`}
                />
              </button>
              {showParcelFooter && (
                <div className="delivery-method__option-footer">
                  <p className="delivery-method__option-footer-title">{selectedParcelOption.title}</p>
                  <p className="delivery-method__option-footer-desc">{selectedParcelOption.desc}</p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="delivery-method__next-wrap">
        <button type="button" className="delivery-method__next" onClick={handleNext}>
          다음
        </button>
      </div>

      <BottomSheet
        isOpen={isMeetupSheetOpen}
        onClose={() => setMeetupSheetOpen(false)}
        footer={
          <button
            type="button"
            className="meetup-check-sheet__confirm"
            onClick={() => navigate('/matching/result/ownership/in-person')}
          >
            직접 만나기 진행
          </button>
        }
      >
        <div className="meetup-check-sheet__header">
          <p className="meetup-check-sheet__title">직접 만나기 전에 확인해주세요</p>
          <p className="meetup-check-sheet__desc">
            안전하고 편하게 물건을 주고받을 수 있도록 몇 가지만 확인해주세요.
          </p>
        </div>
        <div className="meetup-check-sheet__list">
          {MEETUP_CHECK_ITEMS.map((item) => {
            const isOpenItem = openItemId === item.id
            return (
              <div className="meetup-check-sheet__item" key={item.id}>
                <button
                  type="button"
                  className="meetup-check-sheet__item-trigger"
                  onClick={() => toggleItem(item.id)}
                >
                  <img src={item.icon} alt="" className="meetup-check-sheet__item-icon" />
                  <span className="meetup-check-sheet__item-title">{item.title}</span>
                  <img
                    src={iconChevronDown}
                    alt=""
                    className={`meetup-check-sheet__item-chevron${isOpenItem ? ' meetup-check-sheet__item-chevron--open' : ''}`}
                  />
                </button>
                {isOpenItem && (
                  <div className="meetup-check-sheet__item-body">
                    <p className="meetup-check-sheet__item-desc">{item.desc}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </BottomSheet>

      <BottomSheet
        isOpen={isParcelSheetOpen}
        onClose={() => setParcelSheetOpen(false)}
        footer={
          <button type="button" className="parcel-sheet__confirm" onClick={handleConfirmParcelType}>
            선택 완료
          </button>
        }
      >
        <div className="parcel-sheet__header">
          <p className="parcel-sheet__title">어떤 방법으로 받아볼까요?</p>
          <p className="parcel-sheet__desc">원하는 택배 방식을 선택해주세요.</p>
        </div>
        <div className="parcel-sheet__list">
          {PARCEL_SUB_OPTIONS.map((option) => {
            const isSelected = pendingParcelType === option.id
            return (
              <button
                type="button"
                key={option.id}
                className={`parcel-sheet__option${isSelected ? ' parcel-sheet__option--selected' : ''}`}
                onClick={() => setPendingParcelType(option.id)}
              >
                <span className="parcel-sheet__option-body">
                  <span className="parcel-sheet__option-title">{option.title}</span>
                  <span className="parcel-sheet__option-desc">{option.desc}</span>
                </span>
                {isSelected && (
                  <span className="parcel-sheet__option-check">
                    <img src={iconParcelCheck} alt="" />
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </BottomSheet>
    </div>
  )
}
