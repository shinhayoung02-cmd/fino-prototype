// POST { image: base64 jpeg } → { name, description, ...fields } | 429 { quota: true }
// GEMINI_API_KEY는 Vercel 환경변수에만 둔다 (브라우저에 노출 금지).
// AI는 칸별 값만 주고, 문장은 itemProfiles.js와 같은 형식으로 여기서 조립한다.
// 무료 서버가 붐비면(503) 다음 모델로 넘어간다
const MODELS = ['gemini-flash-latest', 'gemini-flash-lite-latest']
const CATEGORIES = ['지갑', '가방', '이어폰', '열쇠/키', '휴대폰', '카드/신분증', '전자기기', '의류', '액세서리', '우산', '기타']

const PROMPT = `분실물 사진 속 물건 하나를 한국어로 판단해 칸별로 채워.
- category: 목록 중 하나
- color: "검정색"처럼 "~색"
- brand: 로고·각인이 실제로 보일 때만, 아니면 null (추측 금지)
- material: 가죽, 플라스틱, 금속 등. 모르면 null
- form: 구체적 형태 (예: 반지갑, 숄더백, AirPods Pro, 스마트키)
- features: 눈에 띄는 특징 1~3개, 각각 짧은 명사구 (예: "전면 실버 로고 플레이트"). 색상·브랜드·소재·형태를 반복하지 말 것`

const nullableString = { type: 'STRING', nullable: true }
const SCHEMA = {
  type: 'OBJECT',
  properties: {
    category: { type: 'STRING', enum: CATEGORIES },
    color: { type: 'STRING' },
    brand: nullableString,
    material: nullableString,
    form: { type: 'STRING' },
    features: { type: 'ARRAY', items: { type: 'STRING' }, maxItems: 3 },
  },
  required: ['category', 'color', 'brand', 'material', 'form', 'features'],
}

// "검정색 Matin Kim 가죽 반지갑 · 전면 실버 로고 플레이트"
const toDescription = (f) =>
  [[f.color, f.brand, f.material, f.form].filter(Boolean).join(' '), ...f.features].join(' · ')

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const image = req.body?.image
  if (typeof image !== 'string' || image.length > 4_000_000) return res.status(400).json({ error: 'bad image' })

  const body = JSON.stringify({
    contents: [{ parts: [{ inline_data: { mime_type: 'image/jpeg', data: image } }, { text: PROMPT }] }],
    generationConfig: { responseMimeType: 'application/json', responseSchema: SCHEMA },
  })
  let r
  for (const model of MODELS) {
    r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': process.env.GEMINI_API_KEY },
      body,
      signal: AbortSignal.timeout(20000),
    }).catch(() => null)
    if (r && r.status < 500) break
  }
  if (!r) return res.status(504).json({ error: 'timeout' })
  if (r.status === 429) return res.status(429).json({ quota: true })
  if (!r.ok) return res.status(502).json({ error: await r.text() })

  try {
    const data = await r.json()
    const fields = JSON.parse(data.candidates[0].content.parts[0].text)
    return res.status(200).json({ ...fields, name: fields.category, description: toDescription(fields) })
  } catch {
    return res.status(502).json({ error: 'unparseable' })
  }
}
