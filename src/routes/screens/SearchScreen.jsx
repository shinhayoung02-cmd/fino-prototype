import { useLocation } from 'react-router-dom'
import AppShell from '../../layout/AppShell/AppShell'
import Header from '../../components/common/Header/Header'
import SearchPage from '../../pages/Home/SearchPage'
import iconSettingsGear from '../../assets/my-page/icon-settings-gear.svg'

export default function SearchScreen() {
  const location = useLocation()
  return (
    <AppShell
      key={location.pathname}
      header={
        <Header
          title="검색어를 입력해주세요"
          showBack
          rightSlot={
            <button type="button" className="header__icon-btn" aria-label="설정">
              <img src={iconSettingsGear} alt="" style={{ width: 19.2, height: 19.2 }} />
            </button>
          }
        />
      }
    >
      <SearchPage />
    </AppShell>
  )
}
