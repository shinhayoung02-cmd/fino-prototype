# FINO — 당근마켓 분실물 찾기 서비스 (v2)

당근마켓 동네 기반으로 **분실물과 습득물을 AI가 연결해 주는** 서비스의 동작하는 프로토타입입니다.

- **시연:** https://fino-v2.vercel.app (모바일 화면 기준)
- **코드:** 이 브랜치 `fino-v2-updates`
- **AI 활용 정의서:** [AI_USAGE.md](AI_USAGE.md)

## 주요 기능

| 기능 | 설명 |
|---|---|
| 분실물 등록 | 사진 → AI 자동 인식 → 분실 시각·위치 → 비공개 특징 퀴즈 |
| 습득물 등록 | 직접 보관 / 길에 두고 옴 / 지구대·경찰서에 맡김, 3가지 흐름 |
| AI 사진 인식 | 직접 올린 사진을 Google Gemini가 판단해 물건 이름과 설명을 정해진 형식으로 채움 |
| AI 매칭 · 소유권 확인 | 매칭 결과 → 소유권 퀴즈 → 2차 검증 → 직접 전달 / 택배 / 편의점 택배 |
| 지도 | 카카오맵 기반 분실 위치·범위 선택, 지구대·우체통 찾기 |
| 데이터 저장 | 등록한 분실물·습득물을 Supabase DB에 저장, 홈 "최근 활동"에 표시 |

## AI 사진 인식

분실물 등록에서 사진 선택 창의 **"+"**를 눌러 직접 사진을 올리면 동작합니다.

- **처리 방식:** AI는 종류·색상·브랜드·소재·형태·특징을 칸별로만 반환하고, 문장은 서버가 같은 형식으로 조립합니다. 그래서 결과 형식이 항상 일정합니다.
  > 예: 검정색 Matin Kim 가죽 반지갑 · 전면 메탈 로고 장식 · 스티치 마감
- **물건 종류:** 경찰청 LOST112 분류를 바탕으로 약 120개로 세분화했습니다.
- **브랜드:** 로고가 실제로 보일 때만, 로고에 적힌 표기 그대로 적습니다. 보이지 않으면 추측하지 않습니다.
- **개인정보:** 처음 업로드할 때 사진이 AI로 전송된다는 안내에 동의를 받습니다.
- **무료 한도:** 한도를 다 쓰면 그날은 업로드 칸이 숨겨지고 샘플 사진으로 시연할 수 있습니다.
- **API 키:** Gemini 키는 Vercel 서버 함수(`api/recognize.js`)에만 있고, 브라우저에는 노출되지 않습니다.

## 기술 스택

- React 19 + Vite, React Router
- SEED Design (당근 디자인 시스템)
- Supabase (PostgreSQL) — REST API로 저장·조회
- Google Gemini API — 이미지 인식
- Vercel — 배포 + 서버 함수
- Kakao Maps JavaScript API

## 폴더 구조

```
api/recognize.js        Gemini 사진 인식 (Vercel 서버 함수)
src/pages/              화면 (LostItemRegister, FoundItemRegister, AiMatching, Home, Chat …)
src/lib/supabase.js     Supabase 저장·조회
src/lib/kakaoMaps.js    카카오맵 로더
src/data/               시연용 물건 프로필 데이터
supabase/schema.sql     DB 테이블 정의
```

## 로컬 실행

```bash
npm install
npm run dev
```

`.env.local` 파일에 아래 값을 넣습니다.

```
VITE_KAKAO_JS_KEY=...
VITE_SUPABASE_URL=...
VITE_SUPABASE_PUBLISHABLE_KEY=...
```

- **DB:** Supabase SQL Editor에서 `supabase/schema.sql`을 한 번 실행합니다.
- **AI 사진 인식:** 서버 함수라 `npm run dev`에서는 동작하지 않습니다. Vercel 환경변수에 `GEMINI_API_KEY`를 넣고 배포하거나, `vercel dev`로 실행합니다.

## 프로토타입 범위

- **매칭 흐름:** AI 매칭·소유권 확인·전달 흐름은 시연 시나리오로 동작합니다.
- **사진:** 올린 사진은 인식에만 쓰고 저장하지 않습니다.
- **로그인:** 없으며, DB는 시연용으로 누구나 등록·조회할 수 있게 열려 있습니다.

## 팀

- [@shinhayoung02-cmd](https://github.com/shinhayoung02-cmd)
- [@jeff2-you](https://github.com/jeff2-you)
- [@pyeeun0430-web](https://github.com/pyeeun0430-web)
