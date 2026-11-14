import { useLocation } from 'react-router-dom'
import SubStepScreen from '../../layout/Screens/SubStepScreen'
import MenuButton from '../../components/common/MenuButton/MenuButton'
import InPersonProposalStatus from '../../pages/AiMatching/InPersonProposalStatus'
import ParcelDeliveryStatus from '../../pages/AiMatching/ParcelDeliveryStatus'
import ParcelStoreDeliveryStatus from '../../pages/AiMatching/ParcelStoreDeliveryStatus'
import { OWNERSHIP_PATH } from '../../app/paths'

const PROPOSAL_SENT_CONFIG = {
  parcel: { title: '일반 택배', Component: ParcelDeliveryStatus },
  'parcel-store': { title: '편의점 택배', Component: ParcelStoreDeliveryStatus },
}

// 제안 보낸 뒤: 고른 전달 방식(location.state.deliveryMethod)에 맞는 진행 화면
export default function ProposalSentScreen({ onOpenNavMenu, onConfirmParcel }) {
  const location = useLocation()
  const deliveryMethod = location.state?.deliveryMethod
  const { title = '대면 직거래', Component = InPersonProposalStatus } =
    PROPOSAL_SENT_CONFIG[deliveryMethod] ?? {}
  const componentProps = deliveryMethod === 'parcel' ? { onConfirm: onConfirmParcel } : {}

  return (
    <SubStepScreen
      title={title}
      backTo={`${OWNERSHIP_PATH}/proposal-confirm`}
      rightSlot={<MenuButton onClick={onOpenNavMenu} />}
    >
      <Component {...componentProps} />
    </SubStepScreen>
  )
}
