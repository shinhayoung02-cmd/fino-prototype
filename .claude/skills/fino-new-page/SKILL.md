---
name: fino-new-page
description: FINO(분실물 찾기 서비스) 앱에 새 페이지·화면을 만들 때 사용. Figma "당근밭" 화면 설계의 기존 화면을 복제해 내용만 바꾸고, 기존 코드 구조(pages·use*Routes·stepRoute·공통 컴포넌트)대로 구현한다. "새 페이지 만들어줘", "새 화면 추가", "FINO 화면 설계" 요청 시 사용.
---

# FINO 새 페이지 만들기 가이드 (AI 작업자용)

> 이 문서를 받은 AI는 **이 문서 전체를 먼저 읽고**, 아래 절차대로 새 페이지를 만든다.
> 목표: 지금까지 만든 FINO 화면·코드와 **같은 레이아웃·무드·코드 구조**로 새 페이지를 추가하는 것. 새 디자인을 창작하는 게 아니다.

FINO = 분실물·습득물을 등록하면 AI가 매칭해 주인에게 돌려주는 **독립 서비스**. (당근마켓 서비스가 아님 — 문구에 '당근마켓' 쓰지 말 것.)

---

## 0. 시작 전 준비물 (없으면 사용자에게 먼저 요청)

| 필요한 것 | 내용 |
|---|---|
| Figma 접근 | 파일 **"당근밭"** — fileKey `J649XUdG8BHW346xMCZJxs`, 보기 이상 권한 + AI에 **Figma MCP** 연결 |
| 코드 | GitHub `shinhayoung02-cmd/fino-prototype` clone, `dev` 브랜치 기준 |
| 실행 | `npm install` → `npm run dev` (http://localhost:5173) |
| 이 문서 | 레포 루트 `NEW_PAGE_GUIDE.md` + `CLAUDE.md`(코딩 지침 4개) |

키·비밀번호·DB 접속 정보는 문서·코드·커밋·대화에 절대 쓰지 않는다.

---

## 1. 절대 규칙

1. **기존 화면 기반.** 새 화면은 반드시 Figma `화면 설계`(5:5)에 있는 화면 중 가장 비슷한 것을 골라 **복제(clone) 후 글자·내용만 바꾼다.** 새 헤더 문구·임의 카드 배치·새 레이아웃 창작 금지.
2. **비슷한 화면이 없으면 만들기 전에 사용자에게 묻는다.** "이 화면(노드 ID)을 기반으로 할게요" 하고 후보를 보여준다.
3. **Figma 수치 = 최종 스펙.** 크기·위치·padding·gap·정렬·폰트·radius·색을 `get_design_context`로 직접 확인해서 그대로 옮긴다. 눈대중·"더 예쁘게" 수정 금지.
   - 충돌 시 우선순위: Figma 시각 결과 → Figma 실측값 → 프로젝트 공통 컴포넌트 → 일반 React/CSS 관례.
4. **요청받은 화면만 수정.** 다른 화면·공통 컴포넌트·카피·플로우를 임의로 바꾸지 않는다. 공통 컴포넌트와 배치가 다르면 **그 화면에서만** 오버라이드한다.
5. **프레임 이름을 믿지 말 것.** 당근밭 파일은 프레임 이름이 복붙으로 오염돼 있다(같은 이름 17개 중 1개만 맞은 사례). 반드시 스크린샷/`get_design_context`로 내용을 확인한다.
6. Figma 전체 `get_metadata`는 너무 커서 실패한다 → **항상 특정 node-id로 좁혀서** 조회.

---

## 2. Figma 기준 노드

| 용도 | 노드 ID | 비고 |
|---|---|---|
| **화면 설계** (기준 캔버스) | `5:5` | 복제 원본은 여기서 고른다 |
| 신규 기능 최신 와이어프레임 | Section 3 `1343:56438` | 보관함·퀴즈·로그인 등 최근 화면 |
| 퀴즈 단계형 레이아웃 원본 | Section 4 `1409:49946` | '1-Click 비공개 퀴즈' |
| User Flow 최신 | `1414:2288` (User Flow 페이지 `5:3`) | v3 |
| 사용하지 말 것 | `0:1` 페이지, 와이어프레임 페이지 `115:13396`의 회색 무드 | 낡은 스크래치 |

자주 쓰는 원본 화면:

| 화면 유형 | 원본 노드 |
|---|---|
| 등록 폼 홈 | `361:83358` |
| 입력 완료 폼 | `361:84138` |
| 시간 선택 바텀시트 | `469:25625` |
| 지도 위치 선택 | `361:83619` |
| 카메라 접근 허용 시트 | `369:98583` |
| 목록(카드 리스트) | AI 매칭 후보 `1028:33812` |
| 채팅방 | `1389:53102` |
| 텍스트 링크 스타일 | '사진 촬영이 어려워요' `227:6962` |
| 로그인 | `1471:29054` (Section 3) |

### Figma에 새 화면 놓을 때
- 원본 프레임을 clone → 새 기능 섹션(현재 Section 3)에 배치 → 글자만 교체.
- 화면을 PNG 캡처 이미지로 넣지 말 것 — 사용자가 Figma에서 바로 고칠 수 있게 **실제 요소**로.
- 글꼴: 앱 글꼴은 **Pretendard**. 단 Figma MCP 환경에서는 Pretendard를 로드할 수 없어 **새로 쓴 글자만 Noto Sans KR**로 둔다(코드에서는 Pretendard로 나옴).
- 인스턴스 clone 직후 내부 텍스트가 `findAll`에 안 잡히면 `I<인스턴스ID>;<하위ID>` 형식 ID로 접근.
- 오토레이아웃 프레임에 요소를 추가할 땐 `layoutPositioning = 'ABSOLUTE'`.

---

## 3. 화면 공통 규칙 (확정된 결정)

- **하단 네비:** 뒤로가기가 있는 화면엔 하단 네비 없음. 예외 — 네비 탭 목적지(`/matching`, `/chat`, `/my`)는 뒤로가기 없이 네비 표시.
- **네비 없는 화면 하단 여백:** 하단 버튼 아래 ~ 화면 끝 **34px** (버튼 ~ 홈 인디케이터 21px). `AppShell`의 `app-shell--no-nav`가 자동 처리 — 새 페이지의 하단 래퍼 클래스가 여백을 가지면 `src/layout/AppShell/AppShell.css`의 `:is(...)` 목록에 추가.
- **요약 카드 글자 크기 고정** (메타 한 줄 + 상태 뱃지 + 제목 + 설명 구조의 카드): 메타 12 / 뱃지 11 / 제목 16 / 설명 13px. Figma 값이 달라도 이 값을 쓴다.
- 문장 톤: "~해주세요 / ~했어요" 존댓말, 기존 화면 문구 톤 유지.

---

## 4. 코드 구조 (React 19 + Vite + react-router 7, SEED Design)

```
src/
  pages/<기능>/<화면>.jsx (+ .css)   ← 새 화면은 여기
  routes/use*Routes.jsx               ← 라우트 등록 (영역별 파일)
  routes/useStepRoute.jsx             ← 뒤로가기 화면용 헬퍼
  layout/Screens/                     ← SubStepScreen(뒤로가기·네비 없음), BackTabScreen/TabScreen(네비 있음)
  components/common/                  ← Button, Card, BottomSheet, Modal, Header, TextField, StatusBadge, ResultDialog ...
  app/                                ← 전역 상태(useAppState), paths.js, constants.js, drafts.js, trySave.js, hooks/
  lib/supabase.js                     ← DB·로그인·사진 업로드 함수 (saveItem, fetchMyProfile 등)
  data/                               ← 시연용 데이터
```

라우트 영역:

| 파일 | 영역 |
|---|---|
| `useMainRoutes` | 홈 등 메인 |
| `useLostRoutes` | 분실물 등록 (`/lost/...`) |
| `useFoundRegisterRoutes` / `useFoundMatchRoutes` | 습득물 등록 / 습득자 매칭·퀴즈 (`/found/...`) |
| `useMatchingRoutes` | 분실자 매칭·소유권 (`/matching/...`) |
| `useChatRoutes` | 채팅 |
| `useMyRoutes` | 마이페이지·보관함·프로필 (`/my/...`) |

### 새 페이지 추가 순서
1. **이미 있는지 먼저 검색** — 비슷한 페이지·컴포넌트·CSS 클래스를 grep. 있으면 재사용(예: 프로필 수정은 등록 폼 `LostItemRegister.css` 레이아웃과 `TextField`를 재사용함).
2. `src/pages/<기능>/<화면>.jsx` 작성. 파일 위에 한 줄 주석으로 무엇인지 적는다. 예:
   ```jsx
   // 프로필 수정 — 분실물 등록 폼(LostItemRegister) 레이아웃 재사용
   ```
3. 해당 영역 `use*Routes.jsx`에 등록.
   - 뒤로가기 화면: `stepRoute('/my/profile', { title: '프로필 수정', backTo: '/my', hasMenu: false }, <ProfileEdit />)`
   - 네비 있는 탭 화면: `BackTabScreen` / `TabScreen`으로 감싼다 (`useMyRoutes.jsx`의 `/my` 참고).
4. 여러 파일에서 쓰는 경로는 `src/app/paths.js`에 상수로.
5. 데이터 저장은 `src/lib/supabase.js`의 기존 함수 사용, 실패 시 `alert('저장하지 못했어요. 다시 시도해주세요.')` + 화면 유지 (`trySave` 패턴).
6. 실서비스 도메인(withfino.com)에서 숨겨야 하는 시연용 UI는 `IS_LIVE`(`src/app/constants.js`)로 분기.
7. 확인: `npm run lint`, `npm run build` 통과 + 브라우저에서 Figma와 나란히 비교.

### 구현 후 검증 체크리스트 (Figma와 1:1 비교)
헤더 위치 · 제목/설명 위치 · 카드 크기 · 좌우 여백 · 요소 간 간격 · CTA 위치 · 하단 콘텐츠 위치 · 네비 유무/위치 · 텍스트 줄바꿈 · 전체 세로 배치.
차이가 있으면 추측으로 고치지 말고 Figma 수치를 다시 확인한 뒤 한 번에 수정.

---

## 5. Git·배포

- 작업은 **새 브랜치** → `dev`로 PR. `main` = 실서비스(withfino.com) 자동 배포이므로 직접 push 금지.
- 흐름: 내 브랜치 → `dev` (미리보기 주소에서 검수) → `dev` → `main` PR 병합.
- 커밋 메시지: 영어 한 줄, `영역: 무엇을 했는지` 형식 (예: `Profile: extract TextField and useMyProfile to remove duplication`).
- 남의 코드 대규모 변경은 PR 설명에 이유를 쓰고 해당 담당자 리뷰를 받는다.

---

## 6. 작업 요청 받았을 때 AI의 첫 응답 형식

1. 만들 화면이 무엇인지 한 줄 요약.
2. 기반으로 쓸 **Figma 원본 화면 노드 ID**와 **코드 원본 파일** 제시 ("이 화면 기반으로 만들게요").
3. 확실하면 바로 진행, 애매하면(맞는 원본이 없거나 플로우가 바뀜) 사용자 확인 후 진행.
4. 끝나면: 바뀐 파일, 새 라우트 경로, Figma 노드 ID를 짧게 보고.
