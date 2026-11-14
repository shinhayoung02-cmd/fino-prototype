import { useContext } from 'react'
import { AppStateContext } from './appStateContext'

export default function useAppState() {
  return useContext(AppStateContext)
}
