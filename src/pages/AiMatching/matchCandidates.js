import itemWallet from '../../assets/home/item-wallet.png'
import walletSample2 from '../../assets/lost-register/samples/wallet-2.png'
import candidateWalletHorizontal from '../../assets/ai-matching/candidate-wallet-horizontal.jpg?url'
import candidateWalletVertical from '../../assets/ai-matching/candidate-wallet-vertical.jpg?url'
import candidateLost112Receipt from '../../assets/ai-matching/candidate-lost112-receipt.png?url'

export const MATCH_CANDIDATES = [
  {
    id: 'match-1',
    similarity: 74,
    photo: itemWallet,
    gallery: [itemWallet, walletSample2],
    title: '검정 반지갑 습득',
    feature: '검정색 Matin Kim 가죽 반지갑',
    time: '오늘 오전 9~12시',
    location: '서울 마포구 홍대입구역',
    matchReasons: ['색상 일치', '형태 유사', '분실 위치 300m 이내'],
  },
  {
    id: 'match-2',
    similarity: 64,
    photo: candidateWalletHorizontal,
    gallery: [candidateWalletHorizontal, candidateWalletVertical, candidateLost112Receipt],
    title: '홍대입구에서 검정색 반지갑 습득',
    feature: '검정색 반지갑',
    time: '오늘 오후 5시',
    location: '서울 마포구 홍대입구역',
    matchReasons: ['색상 일치', '분실 위치 300m 이내'],
  },
]
