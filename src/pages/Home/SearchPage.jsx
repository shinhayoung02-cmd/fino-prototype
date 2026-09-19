import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import iconRemoveCircle from '../../assets/location-picker/icon-remove-circle.svg'
import iconSearch from '../../assets/home/icon-search.svg'
import iconChevronRight from '../../assets/home/icon-chevron-right.svg'
import iconSearchLg from '../../assets/ai-matching/icon-search-lg.svg'
import './SearchPage.css'

// 분실물 검색어 사전 (ㄱ~ㅎ, 항목별 5개) - 입력한 검색어와 일치하는 단어를 찾아 추천해요.
const SEARCH_DICTIONARY = [
  '가방', '강아지', '골프채', '교통카드', '귀걸이',
  '노트북', '넥타이', '노트', '나침반', '네임택',
  '담요', '도장', '드론', '다이어리', '등산화',
  '라이터', '러닝화', '렌즈', '리모컨', '롱패딩',
  '목도리', '모자', '마우스', '만년필', '메모리카드',
  '반지', '백팩', '보조배터리', '부채', '블루투스이어폰',
  '신발', '선글라스', '손목시계', '스마트폰', '서류가방',
  '우산', '이어폰', '열쇠', '유모차', '안경',
  '지갑', '지갑 분실', '지갑 습득', '검정 지갑', '카드지갑',
  '책', '충전기', '체육복', '청바지', '초시계',
  '카메라', '컴퓨터', '키보드', '카드', '카시트',
  '태블릿', '텀블러', '타이머', '티셔츠', '트렁크',
  '팔찌', '파우치', '프린터', '펜', '편지',
  '헤드폰', '핸드폰', '헬멧', '화장품', '향수',
]

// 초성 검색 ("ㅈㄱ" 입력 시 "지갑"도 매칭되도록)
const CHOSUNG_LIST = [
  'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ',
  'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
]

function getChosung(str) {
  let result = ''
  for (const ch of str) {
    const code = ch.charCodeAt(0) - 0xac00
    result += code >= 0 && code <= 11171 ? CHOSUNG_LIST[Math.floor(code / 588)] : ch
  }
  return result
}

const isChosungQuery = (str) => [...str].every((ch) => CHOSUNG_LIST.includes(ch))

function matchesQuery(term, query) {
  return isChosungQuery(query) ? getChosung(term).includes(query) : term.includes(query)
}

export default function SearchPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') ?? '')
  const [submittedQuery, setSubmittedQuery] = useState(null)
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    const trimmed = query.trim()
    if (trimmed) setSubmittedQuery(trimmed)
  }

  const handleSuggestionClick = (term) => {
    setQuery(term)
    setSubmittedQuery(term)
  }

  const trimmedQuery = query.trim()
  const matchedTerms = trimmedQuery
    ? SEARCH_DICTIONARY.filter((term) => matchesQuery(term, trimmedQuery)).slice(0, 5)
    : []
  const showSuggestions = !submittedQuery && matchedTerms.length > 0
  const showResults = Boolean(submittedQuery)

  return (
    <div className="search-page">
      <div className="search-page__header">
        <form className="search-page__field" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            className="search-page__input"
            placeholder="잃어버린 물건을 검색해보세요"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setSubmittedQuery(null)
            }}
          />
          {query && (
            <button
              type="button"
              className="search-page__clear"
              aria-label="지우기"
              onClick={() => {
                setQuery('')
                setSubmittedQuery(null)
                inputRef.current?.focus()
              }}
            >
              <img src={iconRemoveCircle} alt="" />
            </button>
          )}
        </form>
        <button type="button" className="search-page__cancel" onClick={() => navigate('/')}>
          취소
        </button>
      </div>

      {showSuggestions && (
        <div className="search-page__suggestions">
          <p className="search-page__suggestions-title">추천 검색어</p>
          {matchedTerms.map((term) => (
            <button
              type="button"
              key={term}
              className="search-page__suggestion-row"
              onClick={() => handleSuggestionClick(term)}
            >
              <img src={iconSearch} alt="" className="search-page__suggestion-icon" />
              <span className="search-page__suggestion-text">{term}</span>
              <img src={iconChevronRight} alt="" className="search-page__suggestion-chevron" />
            </button>
          ))}
        </div>
      )}

      {showResults && (
        <div className="search-page__empty">
          <img src={iconSearchLg} alt="" className="search-page__empty-icon" />
          <div className="search-page__empty-content">
            <p className="search-page__empty-title">&lsquo;{submittedQuery}&rsquo; (으)로 검색한 결과입니다.</p>
            <p className="search-page__empty-desc">
              &lsquo;{submittedQuery}&rsquo; 에 대한 검색 결과가
              <br />
              없습니다.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
