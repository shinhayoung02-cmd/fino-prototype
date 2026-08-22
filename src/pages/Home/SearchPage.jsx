import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import iconRemoveCircle from '../../assets/location-picker/icon-remove-circle.svg'
import iconSearch from '../../assets/home/icon-search.svg'
import iconSearchLg from '../../assets/ai-matching/icon-search-lg.svg'
import './SearchPage.css'

const SUGGESTED_TERMS = ['지갑', '지갑 분실', '지갑 습득', '검정 지갑', '카드지갑']

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

  const showSuggestions = !submittedQuery && query.trim().length > 0
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
          {SUGGESTED_TERMS.map((term) => (
            <button
              type="button"
              key={term}
              className="search-page__suggestion-row"
              onClick={() => handleSuggestionClick(term)}
            >
              <img src={iconSearch} alt="" className="search-page__suggestion-icon" />
              <span className="search-page__suggestion-text">{term}</span>
            </button>
          ))}
        </div>
      )}

      {showResults && (
        <div className="search-page__empty">
          <img src={iconSearchLg} alt="" className="search-page__empty-icon" />
          <p className="search-page__empty-title">&lsquo;{submittedQuery}&rsquo; (으)로 검색한 결과입니다.</p>
          <p className="search-page__empty-desc">
            &lsquo;{submittedQuery}&rsquo; 에 대한 검색 결과가
            <br />
            없습니다.
          </p>
        </div>
      )}
    </div>
  )
}
