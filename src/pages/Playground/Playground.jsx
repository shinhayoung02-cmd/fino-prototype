import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/common/Button/Button'
import StatusBadge from '../../components/common/StatusBadge/StatusBadge'
import Card from '../../components/common/Card/Card'
import BottomSheet from '../../components/common/BottomSheet/BottomSheet'
import Modal from '../../components/common/Modal/Modal'
import './Playground.css'

export default function Playground({ tab = 'home' }) {
  const [isSheetOpen, setSheetOpen] = useState(false)
  const [isModalOpen, setModalOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="playground">
      <p className="playground__note">현재 탭: {tab} · 이 화면은 실제 FINO 화면이 아니라 공통 컴포넌트 동작 확인용 임시 화면입니다.</p>

      <section>
        <p className="playground__section-title">Button</p>
        <div className="playground__row">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="primary" disabled>
            Disabled
          </Button>
        </div>
      </section>

      <section>
        <p className="playground__section-title">Status Badge</p>
        <div className="playground__row">
          <StatusBadge tone="neutral">neutral</StatusBadge>
          <StatusBadge tone="info">info</StatusBadge>
          <StatusBadge tone="success">success</StatusBadge>
          <StatusBadge tone="warning">warning</StatusBadge>
          <StatusBadge tone="danger">danger</StatusBadge>
        </div>
      </section>

      <section className="playground__stack">
        <p className="playground__section-title">Card</p>
        <Card onClick={() => setModalOpen(true)}>
          <p className="playground__card-title">Card → Modal 열기</p>
          <p className="playground__card-desc">클릭하면 Modal 컴포넌트가 열립니다.</p>
        </Card>
        <Card onClick={() => setSheetOpen(true)}>
          <p className="playground__card-title">Card → Bottom Sheet 열기</p>
          <p className="playground__card-desc">클릭하면 Bottom Sheet 컴포넌트가 열립니다.</p>
        </Card>
        <Card onClick={() => navigate('/detail')}>
          <p className="playground__card-title">Card → 화면 전환</p>
          <p className="playground__card-desc">Header의 뒤로가기 버튼을 확인할 수 있는 화면으로 이동합니다.</p>
        </Card>
      </section>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Modal 예시"
        footer={
          <>
            <Button variant="outline" fullWidth onClick={() => setModalOpen(false)}>
              취소
            </Button>
            <Button variant="primary" fullWidth onClick={() => setModalOpen(false)}>
              확인
            </Button>
          </>
        }
      >
        Modal 컴포넌트 동작 확인용 내용입니다.
      </Modal>

      <BottomSheet
        isOpen={isSheetOpen}
        onClose={() => setSheetOpen(false)}
        title="Bottom Sheet 예시"
        footer={
          <Button variant="primary" fullWidth onClick={() => setSheetOpen(false)}>
            닫기
          </Button>
        }
      >
        <p className="playground__card-desc">Bottom Sheet 컴포넌트 동작 확인용 내용입니다.</p>
      </BottomSheet>
    </div>
  )
}
