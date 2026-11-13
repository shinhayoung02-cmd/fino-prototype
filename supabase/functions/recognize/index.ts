// 물건 특징 뽑기 (출시판). api/recognize.js(Vercel, 프로토타입)를 옮겨 와서 사진 대신 설명 글도 받는다.
// POST { image?: base64 jpeg, text?: string } → { category, color, brand, material, form, features, name, description } | 429 { quota: true }
// 로그인한 사용자만(verify_jwt 기본값). GEMINI_API_KEY는 Supabase 함수 secret에만.
const MODELS = ['gemini-flash-latest', 'gemini-flash-lite-latest']
const CATEGORIES = [
  '지갑', '카드지갑', '명함지갑', '동전지갑', '신용카드', '교통카드', '신분증', '운전면허증', '여권', '학생증', '사원증', '현금', '상품권', '서류', '통장',
  '가방', '백팩', '숄더백', '토트백', '크로스백', '클러치', '파우치', '쇼핑백', '에코백', '캐리어', '노트북 가방',
  '휴대폰', '스마트워치', '이어폰', '헤드폰', '보조배터리', '충전기', '충전 케이블', '태블릿', '노트북', '카메라', '전자담배', 'USB 메모리', '마우스', '게임기', '전자사전', '휴대용 선풍기', '블루투스 스피커', '차량 블랙박스',
  '열쇠/키', '자동차 키', '현관 열쇠', '도어락 카드키', '키링',
  '반지', '목걸이', '귀걸이', '팔찌', '시계', '헤어핀', '헤어밴드', '브로치', '넥타이', '벨트', '머플러', '장갑',
  '안경', '선글라스', '안경집',
  '모자', '외투', '재킷', '후드티', '티셔츠', '바지', '치마', '양말', '운동화', '구두', '슬리퍼', '부츠',
  '우산', '양산', '텀블러', '물병', '도시락통', '손수건', '마스크', '화장품', '립스틱', '향수', '거울', '빗', '라이터', '담배', '약',
  '책', '노트', '다이어리', '필통', '필기구', '계산기', '악보',
  '인형', '장난감', '피규어', '야구공', '농구공', '축구공', '배드민턴 라켓', '테니스 라켓', '골프용품', '악기', '유모차', '킥보드', '자전거', '헬멧',
  '반려동물 용품',
  '기타',
]

const PROMPT = (source: string) => `분실물 ${source} 속 물건 하나를 한국어로 판단해 칸별로 채워.
- category: 목록 중 가장 구체적으로 맞는 것 하나
- color: "검정색"처럼 "~색". 알 수 없으면 null
- brand: 로고·각인·글에 실제로 있을 때만, 표기 그대로 (예: Matin Kim, BMW). 없으면 null (추측 금지)
- material: 가죽, 플라스틱, 금속 등. 모르면 null
- form: 구체적 형태 (예: 반지갑, 숄더백, AirPods Pro, 스마트키)
- features: 눈에 띄는 특징 0~3개, 각각 짧은 명사구 (예: "우측 하단 흠집"). 색상·브랜드·소재·형태를 반복하지 말 것`

const nullableString = { type: 'STRING', nullable: true }
const SCHEMA = {
  type: 'OBJECT',
  properties: {
    category: { type: 'STRING', enum: CATEGORIES },
    color: nullableString,
    brand: nullableString,
    material: nullableString,
    form: { type: 'STRING' },
    features: { type: 'ARRAY', items: { type: 'STRING' }, maxItems: 3 },
  },
  required: ['category', 'color', 'brand', 'material', 'form', 'features'],
}

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}
const json = (status: number, body: unknown) => new Response(JSON.stringify(body), { status, headers: { ...cors, 'Content-Type': 'application/json' } })

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors })
  if (req.method !== 'POST') return json(405, { error: 'method' })
  const { image, text } = await req.json().catch(() => ({}))
  const hasImage = typeof image === 'string' && image.length > 0 && image.length < 4_000_000
  const hasText = typeof text === 'string' && text.trim().length > 0 && text.length < 2000
  if (!hasImage && !hasText) return json(400, { error: 'image or text required' })

  const parts = hasImage
    ? [{ inline_data: { mime_type: 'image/jpeg', data: image } }, { text: PROMPT('사진') }]
    : [{ text: `${PROMPT('설명')}\n\n설명: ${text}` }]
  const body = JSON.stringify({ contents: [{ parts }], generationConfig: { responseMimeType: 'application/json', responseSchema: SCHEMA } })

  let r: Response | null = null
  for (const model of MODELS) {
    r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': Deno.env.get('GEMINI_API_KEY')! },
      body,
      signal: AbortSignal.timeout(20000),
    }).catch(() => null)
    if (r && r.status < 500) break
  }
  if (!r) return json(504, { error: 'timeout' })
  if (r.status === 429) return json(429, { quota: true })
  if (!r.ok) return json(502, { error: 'gemini' })

  try {
    const data = await r.json()
    const f = JSON.parse(data.candidates[0].content.parts[0].text)
    const description = [[f.color, f.brand, f.material, f.form].filter(Boolean).join(' '), ...(f.features ?? [])].filter(Boolean).join(' · ')
    return json(200, { ...f, name: f.category === '기타' ? f.form : f.category, description })
  } catch {
    return json(502, { error: 'unparseable' })
  }
})
