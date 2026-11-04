// POST { image: base64 jpeg } → { name, description, ...fields } | 429 { quota: true }
// GEMINI_API_KEY는 Vercel 환경변수에만 둔다 (브라우저에 노출 금지).
// AI는 칸별 값만 주고, 문장은 itemProfiles.js와 같은 형식으로 여기서 조립한다.
// 무료 서버가 붐비면(503) 다음 모델로 넘어간다
const MODELS = ['gemini-flash-latest', 'gemini-flash-lite-latest']
// 경찰청 LOST112 분류를 자주 잃어버리는 물건 단위로 쪼갠 목록. 이름(name)으로 그대로 쓰인다.
const CATEGORIES = [
  // 지갑·카드·서류
  '지갑', '카드지갑', '명함지갑', '동전지갑', '신용카드', '교통카드', '신분증', '운전면허증', '여권', '학생증', '사원증', '현금', '상품권', '서류', '통장',
  // 가방
  '가방', '백팩', '숄더백', '토트백', '크로스백', '클러치', '파우치', '쇼핑백', '에코백', '캐리어', '노트북 가방',
  // 휴대폰·전자기기
  '휴대폰', '스마트워치', '이어폰', '헤드폰', '보조배터리', '충전기', '충전 케이블', '태블릿', '노트북', '카메라', '전자담배', 'USB 메모리', '마우스', '게임기', '전자사전', '휴대용 선풍기', '블루투스 스피커', '차량 블랙박스',
  // 열쇠
  '열쇠/키', '자동차 키', '현관 열쇠', '도어락 카드키', '키링',
  // 귀금속·액세서리
  '반지', '목걸이', '귀걸이', '팔찌', '시계', '헤어핀', '헤어밴드', '브로치', '넥타이', '벨트', '머플러', '장갑',
  // 안경
  '안경', '선글라스', '안경집',
  // 의류·신발
  '모자', '외투', '재킷', '후드티', '티셔츠', '바지', '치마', '양말', '운동화', '구두', '슬리퍼', '부츠',
  // 생활용품
  '우산', '양산', '텀블러', '물병', '도시락통', '손수건', '마스크', '화장품', '립스틱', '향수', '거울', '빗', '라이터', '담배', '약',
  // 책·문구
  '책', '노트', '다이어리', '필통', '필기구', '계산기', '악보',
  // 장난감·취미
  '인형', '장난감', '피규어', '야구공', '농구공', '축구공', '배드민턴 라켓', '테니스 라켓', '골프용품', '악기', '유모차', '킥보드', '자전거', '헬멧',
  // 반려동물
  '반려동물 용품',
  '기타',
]
// '기타'면 이름은 form(구체적 형태)으로 쓴다
const BROAD = new Set(['기타'])

const PROMPT = `분실물 사진 속 물건 하나를 한국어로 판단해 칸별로 채워.
- category: 목록 중 가장 구체적으로 맞는 것 하나
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
    return res.status(200).json({ ...fields, name: BROAD.has(fields.category) ? fields.form : fields.category, description: toDescription(fields) })
  } catch {
    return res.status(502).json({ error: 'unparseable' })
  }
}
