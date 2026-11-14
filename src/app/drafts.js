import { ITEM_PROFILES } from '../data/itemProfiles'

// 등록 화면 입력값(draft)의 초기 상태
export const INITIAL_LOST_DRAFT = {
  photos: [],
  name: '',
  description: '',
  timeRange: null,
  location: null,
  featureAnswers: ['', '', ''],
}

export const INITIAL_FOUND_DRAFT = {
  name: ITEM_PROFILES['wallet-normal'].category,
  description: ITEM_PROFILES['wallet-normal'].description,
  timeRange: null,
  location: null,
  itemKey: 'wallet-normal',
}

export const INITIAL_FOUND_LEFT_DRAFT = {
  photos: [],
  name: '',
  description: '',
  timeRange: null,
  location: null,
}

export const INITIAL_FOUND_STATION_DRAFT = {
  ...INITIAL_FOUND_LEFT_DRAFT,
  lost112Photos: [],
  lost112Number: '',
}
