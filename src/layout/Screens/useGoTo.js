import { useNavigate } from 'react-router-dom'

// 하단 탭 선택 상태를 맞추면서 이동
export default function useGoTo(path, onSelectTab) {
  const navigate = useNavigate()
  return () => {
    onSelectTab(path)
    navigate(path)
  }
}
