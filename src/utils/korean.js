// 한글 단어 받침 유무에 따라 목적격 조사(을/를)를 붙여준다.
export function withObjectParticle(word) {
  const trimmed = word.trim()
  const lastChar = trimmed.charAt(trimmed.length - 1)
  const code = lastChar.charCodeAt(0)

  if (code < 0xac00 || code > 0xd7a3) return `${trimmed}을`

  const hasBatchim = (code - 0xac00) % 28 !== 0
  return `${trimmed}${hasBatchim ? '을' : '를'}`
}
