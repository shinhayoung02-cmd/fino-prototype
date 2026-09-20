import {
  SidePanelRoot,
  SidePanelContent,
  SidePanelBody,
} from '../../../../seed-design/ui/side-panel'
import './NavMenu.css'

const FLOW_GROUPS = [
  {
    id: 'all',
    label: '전체 플로우',
    items: [
      { label: '분실 홈', path: '/' },
      { label: '내 주변 습득물 지도', path: '/map' },
      { label: 'AI 매칭', path: '/matching' },
      { label: '매칭 결과 상세', path: '/matching/result' },
      { label: '소유권 확인 요청됨', path: '/matching/result/ownership' },
      { label: '분실자 매칭 대기 화면', path: '/matching/waiting' },
      { label: '복수 청구자', path: '/matching/result/ownership/claimants' },
      { label: '소유권 확인(퀴즈 결과)', path: '/matching/quiz-result' },
      { label: '소유권 확인됨', path: '/matching/result/ownership/confirmed' },
      { label: '주인 확인 완료', path: '/matching/result/ownership/verified' },
      { label: '퀴즈 검증 실패(재검증 요청)', path: '/matching/result/ownership/quiz-failed' },
      { label: '감사 방식 선택', path: '/matching/result/ownership/thanks' },
      { label: '전달 방식 선택', path: '/matching/result/ownership/delivery' },
      { label: '일반 택배', path: '/matching/result/ownership/parcel/general' },
      { label: '일반 택배 - 주소 입력', path: '/matching/result/ownership/parcel/general/address' },
      {
        label: '일반 택배 - 제안 내용 확인',
        path: '/matching/result/ownership/proposal-confirm',
        state: { deliveryMethod: 'parcel' },
      },
      {
        label: '일반 택배 - 발송 대기',
        path: '/matching/result/ownership/proposal-sent',
        state: { deliveryMethod: 'parcel' },
      },
      { label: '편의점 택배', path: '/matching/result/ownership/parcel/store' },
      { label: '편의점 택배 - 정보 입력', path: '/matching/result/ownership/parcel/store/info' },
      { label: '편의점 택배 - 내 근처 편의점', path: '/matching/result/ownership/parcel/store/location' },
      {
        label: '편의점 택배 - 받을 편의점 선택',
        path: '/matching/result/ownership/parcel/store/location/select',
      },
      {
        label: '편의점 택배 - 제안 내용 확인',
        path: '/matching/result/ownership/proposal-confirm',
        state: { deliveryMethod: 'parcel-store' },
      },
      {
        label: '편의점 택배 - 발송 대기',
        path: '/matching/result/ownership/proposal-sent',
        state: { deliveryMethod: 'parcel-store' },
      },
      { label: '대면 직거래', path: '/matching/result/ownership/in-person' },
      { label: '대면 직거래 - 장소 선택', path: '/matching/result/ownership/in-person/location' },
      { label: '제안 내용 확인', path: '/matching/result/ownership/proposal-confirm' },
      { label: '제안 발송됨(습득자 확인 대기)', path: '/matching/result/ownership/proposal-sent' },
      { label: '대면 직거래 - 만남 확정', path: '/matching/result/ownership/in-person/status' },
      { label: '대면 직거래 - 수령 완료', path: '/matching/result/ownership/in-person/receipt' },
      { label: '소유권 증빙 제출', path: '/matching/result/ownership/evidence' },
      { label: '증빙 자료 업로드', path: '/matching/result/ownership/evidence/upload' },
      { label: '증빙 자료 검토', path: '/matching/result/ownership/evidence/review' },
      { label: '증빙 제출 완료', path: '/matching/result/ownership/evidence/submitted' },
      { label: '습득자 확인중', path: '/matching/result/ownership/finder-review' },
      { label: '소유권 확인(승인됨)', path: '/matching/result/ownership/approved' },
      { label: '분실물 등록', path: '/lost/new' },
      { label: '분실 위치 선택', path: '/lost/new/location' },
      { label: '비공개 특징 퀴즈', path: '/lost/new/next' },
      { label: '퀴즈 최종 검토', path: '/lost/new/review' },
      { label: '등록 완료', path: '/lost/new/done' },
      { label: '채팅 목록', path: '/chat' },
      { label: '작성글 관리', path: '/my' },
      { label: '검색 결과', path: '/search' },
    ],
  },
  {
    id: 'loser-1',
    label: '분실자 플로우_1',
    description: '분실물 등록',
    items: [
      { label: '분실 홈', path: '/' },
      { label: '분실물 등록', path: '/lost/new' },
      { label: '분실 위치 선택', path: '/lost/new/location' },
      { label: '비공개 특징 퀴즈', path: '/lost/new/next' },
      { label: '퀴즈 최종 검토', path: '/lost/new/review' },
      { label: '등록 완료', path: '/lost/new/done' },
    ],
  },
  {
    id: 'loser-2',
    label: '분실자 플로우(다중 분실자/퀴즈 실패)',
    description: '복수 청구자 동시 주장 · 증빙 제출',
    items: [
      { label: 'AI 매칭', path: '/matching' },
      { label: '매칭 결과 상세', path: '/matching/result' },
      { label: '소유권 확인 요청됨', path: '/matching/result/ownership' },
      { label: '분실자 매칭 대기 화면', path: '/matching/waiting' },
      { label: '복수 청구자', path: '/matching/result/ownership/claimants' },
      { label: '소유권 증빙 제출', path: '/matching/result/ownership/evidence' },
      { label: '증빙 자료 업로드', path: '/matching/result/ownership/evidence/upload' },
      { label: '증빙 자료 검토', path: '/matching/result/ownership/evidence/review' },
      { label: '증빙 제출 완료', path: '/matching/result/ownership/evidence/submitted' },
      { label: '습득자 확인중', path: '/matching/result/ownership/finder-review' },
      { label: '소유권 확인(승인됨)', path: '/matching/result/ownership/approved' },
    ],
  },
  {
    id: 'loser-3',
    label: '분실자 플로우(동시 주장 X)',
    description: 'AI 매칭 완료 → 주인 확인 완료 (동시 주장 없는 단일 매칭 경로)',
    items: [
      { label: 'AI 매칭', path: '/matching' },
      { label: '매칭 결과 상세', path: '/matching/result' },
      { label: '소유권 확인 요청됨', path: '/matching/result/ownership' },
      { label: '분실자 매칭 대기 화면', path: '/matching/waiting' },
      { label: '주인 확인 완료', path: '/matching/result/ownership/verified' },
    ],
  },
  {
    id: 'loser-3b',
    label: '분실자 플로우(동시 주장 X · 퀴즈 실패)',
    description: 'AI 매칭 완료 → 퀴즈 검증 실패 → 재검증 요청(2차 증빙 제출)',
    items: [
      { label: 'AI 매칭', path: '/matching' },
      { label: '매칭 결과 상세', path: '/matching/result' },
      { label: '소유권 확인 요청됨', path: '/matching/result/ownership' },
      { label: '분실자 매칭 대기 화면', path: '/matching/waiting' },
      { label: '퀴즈 검증 실패', path: '/matching/result/ownership/quiz-failed' },
      { label: '소유권 증빙 제출(2차)', path: '/matching/result/ownership/evidence' },
      { label: '증빙 자료 업로드', path: '/matching/result/ownership/evidence/upload' },
      { label: '증빙 자료 검토', path: '/matching/result/ownership/evidence/review' },
      { label: '증빙 제출 완료', path: '/matching/result/ownership/evidence/submitted' },
      { label: '습득자 확인중', path: '/matching/result/ownership/finder-review' },
      { label: '소유권 확인(승인됨)', path: '/matching/result/ownership/approved' },
    ],
  },
  {
    id: 'loser-4',
    label: '분실자 플로우_4',
    description: '감사·전달 방식 선택 및 반환 절차 (동시 주장 X · 다중 분실자 분기 이후 공통)',
    items: [
      { label: '감사 방식 선택', path: '/matching/result/ownership/thanks' },
      { label: '전달 방식 선택', path: '/matching/result/ownership/delivery' },
      { label: '일반 택배', path: '/matching/result/ownership/parcel/general' },
      { label: '일반 택배 - 주소 입력', path: '/matching/result/ownership/parcel/general/address' },
      {
        label: '일반 택배 - 제안 내용 확인',
        path: '/matching/result/ownership/proposal-confirm',
        state: { deliveryMethod: 'parcel' },
      },
      {
        label: '일반 택배 - 발송 대기',
        path: '/matching/result/ownership/proposal-sent',
        state: { deliveryMethod: 'parcel' },
      },
      { label: '편의점 택배', path: '/matching/result/ownership/parcel/store' },
      { label: '편의점 택배 - 정보 입력', path: '/matching/result/ownership/parcel/store/info' },
      { label: '편의점 택배 - 내 근처 편의점', path: '/matching/result/ownership/parcel/store/location' },
      {
        label: '편의점 택배 - 받을 편의점 선택',
        path: '/matching/result/ownership/parcel/store/location/select',
      },
      {
        label: '편의점 택배 - 제안 내용 확인',
        path: '/matching/result/ownership/proposal-confirm',
        state: { deliveryMethod: 'parcel-store' },
      },
      {
        label: '편의점 택배 - 발송 대기',
        path: '/matching/result/ownership/proposal-sent',
        state: { deliveryMethod: 'parcel-store' },
      },
      { label: '대면 직거래', path: '/matching/result/ownership/in-person' },
      { label: '대면 직거래 - 장소 선택', path: '/matching/result/ownership/in-person/location' },
      { label: '제안 내용 확인', path: '/matching/result/ownership/proposal-confirm' },
      { label: '제안 발송됨(습득자 확인 대기)', path: '/matching/result/ownership/proposal-sent' },
      { label: '대면 직거래 - 만남 확정', path: '/matching/result/ownership/in-person/status' },
      { label: '대면 직거래 - 수령 완료', path: '/matching/result/ownership/in-person/receipt' },
    ],
  },
  {
    id: 'chat',
    label: '채팅',
    items: [{ label: '채팅 목록', path: '/chat' }],
  },
  {
    id: 'etc',
    label: '기타',
    items: [
      { label: '작성글 관리', path: '/my' },
      { label: '검색 결과', path: '/search' },
      { label: 'Playground', path: '/playground' },
      { label: 'Detail Preview', path: '/detail' },
    ],
  },
]

export default function NavMenu({
  isOpen,
  onClose,
  onNavigate,
  isMultipleClaimantsFlow,
  onToggleMultipleClaimantsFlow,
  isQuizFailFlow,
  onToggleQuizFailFlow,
  isFoundRestrictedFlow,
  onToggleFoundRestrictedFlow,
  isFoundMultipleClaimantsFlow,
  onToggleFoundMultipleClaimantsFlow,
}) {
  return (
    <div className="nav-menu-scope">
      <SidePanelRoot
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) onClose?.()
        }}
        direction="right"
      >
        <SidePanelContent
          title="플로우 설정"
          className="nav-menu__content"
          style={{ width: '80%', maxWidth: '80%' }}
        >
          <SidePanelBody>
            <div className="nav-menu__settings">
              <button
                type="button"
                className={`nav-menu__switch-row${isMultipleClaimantsFlow ? ' nav-menu__switch-row--on' : ''}`}
                role="switch"
                aria-checked={isMultipleClaimantsFlow}
                onClick={() => onToggleMultipleClaimantsFlow?.()}
              >
                <span className="nav-menu__switch-label">
                  <span className="nav-menu__switch-title">다중 분실자 포함 플로우</span>
                  <span className="nav-menu__switch-desc">
                    {isMultipleClaimantsFlow
                      ? '같은 물건을 찾는 사람이 여러 명일 때'
                      : '같은 물건을 찾는 사람이 여러 명일 때'}
                  </span>
                </span>
                <span className="nav-menu__switch-track">
                  <span className="nav-menu__switch-thumb" />
                </span>
              </button>
              <button
                type="button"
                className={`nav-menu__switch-row${isQuizFailFlow ? ' nav-menu__switch-row--on' : ''}`}
                role="switch"
                aria-checked={isQuizFailFlow}
                onClick={() => onToggleQuizFailFlow?.()}
              >
                <span className="nav-menu__switch-label">
                  <span className="nav-menu__switch-title">퀴즈 실패 플로우</span>
                  <span className="nav-menu__switch-desc">
                    {isQuizFailFlow
                      ? '주인 확인이 한 번에 되지 않았을 때'
                      : '주인 확인이 한 번에 되지 않았을 때'}
                  </span>
                </span>
                <span className="nav-menu__switch-track">
                  <span className="nav-menu__switch-thumb" />
                </span>
              </button>
              <p className="nav-menu__settings-hint">
                아래 스위치는 습득자 플로우에서만 사용해요.
              </p>
              <button
                type="button"
                className={`nav-menu__switch-row${isFoundRestrictedFlow ? ' nav-menu__switch-row--on' : ''}`}
                role="switch"
                aria-checked={isFoundRestrictedFlow}
                onClick={() => onToggleFoundRestrictedFlow?.()}
              >
                <span className="nav-menu__switch-label">
                  <span className="nav-menu__switch-title">개인 보관 불가 물건 </span>
                  <span className="nav-menu__switch-desc">
                    {isFoundRestrictedFlow
                      ? '직접 보관할 수 없는 물건일 경우'
                      : '직접 보관할 수 없는 물건일 경우'}
                  </span>
                </span>
                <span className="nav-menu__switch-track">
                  <span className="nav-menu__switch-thumb" />
                </span>
              </button>
              <button
                type="button"
                className={`nav-menu__switch-row${isFoundMultipleClaimantsFlow ? ' nav-menu__switch-row--on' : ''}`}
                role="switch"
                aria-checked={isFoundMultipleClaimantsFlow}
                onClick={() => onToggleFoundMultipleClaimantsFlow?.()}
              >
                <span className="nav-menu__switch-label">
                  <span className="nav-menu__switch-title">다중 분실자 플로우(습득자)</span>
                  <span className="nav-menu__switch-desc">같은 물건을 찾는 사람이 여러 명일 때</span>
                </span>
                <span className="nav-menu__switch-track">
                  <span className="nav-menu__switch-thumb" />
                </span>
              </button>
            </div>
          </SidePanelBody>
        </SidePanelContent>
      </SidePanelRoot>
    </div>
  )
}
