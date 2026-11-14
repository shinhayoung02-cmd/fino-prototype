import AppShell from '../../layout/AppShell/AppShell'
import Header from '../../components/common/Header/Header'
import DetailPreview from '../../pages/Playground/DetailPreview'

// 개발용 상세 화면 미리보기
export default function DetailScreen() {
  return (
    <AppShell header={<Header title="Detail Preview" showBack />}>
      <DetailPreview />
    </AppShell>
  )
}
