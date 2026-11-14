// localStorage JSON 읽기·쓰기. 저장할 수 없는 환경(시크릿 모드 등)이어도 화면은 그대로 동작하게 예외를 삼킨다
export function readJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback
  } catch {
    return fallback
  }
}

export function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // 저장 실패해도 화면 표시엔 영향 없음
  }
}
