# Energy 3D Viewer — 코드 구조 참조 문서

`energy-3d-viewer.html` 파일의 전체 코드를 섹션별로 설명합니다.

> 이 파일은 약 3,085줄의 단일 HTML 파일로, HTML(구조) + CSS(스타일) + JavaScript(동작) 세 부분으로 구성됩니다.

---

## 목차

1. [파일 전체 구조](#1-파일-전체-구조)
2. [HTML 구조 (1~418줄)](#2-html-구조)
3. [CSS 스타일 (8~263줄)](#3-css-스타일)
4. [JavaScript 코드 (428~3082줄)](#4-javascript-코드)
   - [4.1 전역 상태 변수 (STATE)](#41-전역-상태-변수)
   - [4.2 단위/언어 시스템](#42-단위언어-시스템)
   - [4.3 Three.js 초기화](#43-threejs-초기화)
   - [4.4 파일 로드 (GLB, JSON, HTM)](#44-파일-로드)
   - [4.5 에너지 분석 요약](#45-에너지-분석-요약)
   - [4.6 3D Space 빌드](#46-3d-space-빌드)
   - [4.7 해석 표면 (Analytical Surfaces)](#47-해석-표면)
   - [4.8 Zone 매칭](#48-zone-매칭)
   - [4.9 색상 시스템 (Coloring)](#49-색상-시스템)
   - [4.10 Space 목록 & 선택](#410-space-목록--선택)
   - [4.11 속성 패널 (Properties)](#411-속성-패널)
   - [4.12 마우스 상호작용](#412-마우스-상호작용)
   - [4.13 모델 표시/도구 모음](#413-모델-표시도구-모음)
   - [4.14 UI 새로고침 & 토글](#414-ui-새로고침--토글)
   - [4.15 접기/펼치기 패널](#415-접기펼치기-패널)
   - [4.16 HTM 파서](#416-htm-파서)
   - [4.17 초기화 (드롭존 연결)](#417-초기화)

---

## 1. 파일 전체 구조

```
energy-3d-viewer.html
│
├── <head>                          ← 메타데이터 + Chart.js CDN 로드
│   └── <style>                     ← CSS 전체 (약 260줄)
│
├── <body>
│   └── <div class="app">           ← 전체 레이아웃
│       ├── <div class="sidebar">   ← 왼쪽 사이드바 (파일 로드 + 설정 + 목록)
│       └── <div class="viewport">  ← 오른쪽 3D 뷰포트
│           ├── <canvas>            ← Three.js 3D 렌더링 영역
│           ├── 속성 패널            ← 선택한 요소의 상세 정보
│           ├── 도구 모음            ← Reset, Model, Spaces 등 버튼
│           ├── 범례                ← 색상 범례 바
│           ├── 상세 패널            ← 오른쪽 플로팅 패널
│           └── 환영 오버레이        ← 첫 화면 안내 카드
│
└── <script type="module">          ← JavaScript 전체 (약 2,650줄)
```

---

## 2. HTML 구조

### 사이드바 (sidebar) — 265~368줄

```
사이드바
├── 헤더 (타이틀 + IP/SI 토글 + 한국어/EN 토글)
├── 섹션 1: 3D 모델 (GLB) — 드래그 영역
├── 섹션 2: Space 데이터 (JSON) — 드래그 영역
├── 섹션 3: Energy Report (HTM) — 드래그 영역 + 칩(Chip) 목록
├── 에너지 분석 요약 — 탭(개요/에너지사용/월별/비교) + 차트
├── 설정 — 건물 모델, 색상 기준, 투명도 등
└── Space 목록 — 클릭하면 선택
```

### 뷰포트 (viewport) — 371~417줄

```
뷰포트
├── <canvas> — Three.js가 그리는 3D 화면
├── 속성 패널 (props-panel) — Revit 스타일의 좌측 플로팅
├── 도구 모음 — Reset, Model, Spaces, Surfaces, Axes, Labels 버튼
├── 범례 (legend) — 히트맵 색상 바
├── 상세 패널 (right-panel) — 선택 Space의 에너지 데이터
├── 툴팁 (tooltip) — 마우스 호버 시 정보
├── 상태 바 (status-bar) — 하단 상태 메시지
└── 환영 오버레이 — 처음 열면 보이는 안내 화면
```

---

## 3. CSS 스타일

### 주요 CSS 클래스 목록

| 클래스명 | 용도 | 위치 |
|---------|------|------|
| `.app` | 전체 레이아웃 (flex) | 18줄 |
| `.sidebar` | 왼쪽 패널 (360px 고정) | 19줄 |
| `.viewport` | 3D 뷰포트 영역 (나머지 공간) | 20줄 |
| `.drop-box` | 파일 드래그 영역 (점선 테두리) | 29~39줄 |
| `.drop-box.loaded` | 파일 로드 완료 (녹색 테두리) | 38줄 |
| `.space-item` | Space 목록 아이템 | 58~67줄 |
| `.space-item.selected` | 선택된 Space (파란 테두리) | 63줄 |
| `.right-panel` | 오른쪽 상세 패널 (뷰포트 위) | 70~76줄 |
| `.props-panel` | 속성 패널 (뷰포트 좌측) | 209~258줄 |
| `.panel-header` | 접기/펼치기 섹션 헤더 | 192~206줄 |
| `.panel-body.collapsed` | 접힌 상태 (높이 0) | 203줄 |
| `.analysis-tab` | 분석 탭 버튼 (개요/에너지/월별/비교) | 126~128줄 |
| `.toggle-btn` | IP/SI, 한국어/EN 토글 버튼 | 186~188줄 |

### CSS 변수 (테마 색상) — 9~15줄

```css
--bg: #0f172a;          /* 배경색 (진한 남색) */
--panel: #1e293b;       /* 패널 배경 */
--text: #e2e8f0;        /* 기본 텍스트 (밝은 회색) */
--primary: #3b82f6;     /* 주요 색상 (파란색) */
--accent: #f59e0b;      /* 강조 색상 (주황색) */
--success: #10b981;     /* 성공 (녹색) */
--danger: #ef4444;      /* 위험/난방 (빨간색) */
```

---

## 4. JavaScript 코드

### 4.1 전역 상태 변수

**위치: 431~441줄**

```javascript
// ── 데이터 저장소 ──
spacesData      // JSON에서 읽은 Space 데이터 전체
htmReports      // HTM 보고서 배열 (최대 2개)
activeReportIdx // 현재 활성화된 보고서 인덱스 (0 또는 1)
matchedData     // Space ↔ HTM Zone 매칭 결과 배열
selectedSpace   // 현재 선택된 Space의 GUID

// ── 3D 표시 상태 ──
showAxes        // 좌표축 보이기 여부
showLabels      // 라벨 보이기 여부
spacesVisible   // Space 박스 보이기 여부
surfacesVisible // 해석 표면 보이기 여부

// ── Three.js 객체 ──
scene           // 3D 장면 (모든 물체가 담긴 공간)
camera          // 카메라 (사용자 시점)
renderer        // 렌더러 (화면에 그리는 엔진)
controls        // 마우스 컨트롤 (회전/줌)
raycaster       // 광선 캐스터 (마우스 클릭 감지)
mouse           // 마우스 좌표

// ── 3D 메시 배열 ──
spaceMeshes     // Space 박스 메시 배열 [{mesh, edges, space, idx}]
surfaceMeshes   // 해석 표면 메시 배열 [{mesh, edges, surface, idx}]
labelSprites    // 라벨 스프라이트 배열
glbGroup        // GLB 모델 그룹
modelCenter     // 모델 중심점 좌표
```

### 4.2 단위/언어 시스템

**위치: 442~706줄**

```javascript
// ── 현재 설정 ──
currentUnit  // 'IP' (미국식) 또는 'SI' (국제 표준)
currentLang  // 'ko' (한국어) 또는 'en' (영어)

// ── 단위 변환 상수 (CONV) ── 449~461줄
// ft² → m², ft³ → m³, Btu → kWh 등 변환 계수

// ── 범용 단위 포매터 U(val, type) ── 469~505줄
// 입력값(IP 단위)을 currentUnit에 따라 표시
// 예: U(100, 'area_ft2') → SI이면 "9.3 m²", IP이면 "100 ft²"

// ── 치수 포매터 ── 686~706줄
// fmtLen(ft)  → 길이 표시 (IP: "10.00 ft", SI: "3.05 m")
// fmtArea(m2) → 면적 표시 (IP: "107.6 ft²", SI: "10.0 m²")
// fmtVol(m3)  → 체적 표시 (IP: "353.1 ft³", SI: "10.0 m³")
// ※ SI/IP 토글 하나로 에너지 값 + 치수 모두 한번에 변환됨

// ── 언어 사전 (LANG) ── 519~657줄
// LANG.ko = { subtitle: '...', glb_title: '...', ... }
// LANG.en = { subtitle: '...', glb_title: '...', ... }
// L(key) 함수로 현재 언어의 텍스트 가져옴
```

### 4.3 Three.js 초기화

**위치: 710~760줄**

```javascript
// 즉시 실행 함수로 3D 엔진 초기화
(function init() {
  // 1. Scene (장면) 생성 — 모든 3D 물체가 들어가는 공간
  // 2. Camera (카메라) 생성 — 원근감 있는 PerspectiveCamera
  // 3. Renderer (렌더러) 생성 — WebGL로 화면에 그림
  // 4. OrbitControls — 마우스 드래그=회전, 스크롤=줌
  // 5. 조명 추가 — AmbientLight(전체) + DirectionalLight(방향)
  // 6. 그리드 + 좌표축 추가
  // 7. Raycaster — 마우스 클릭이 어떤 물체를 가리키는지 판별
  // 8. 이벤트 리스너 등록 (마우스, 리사이즈)
  // 9. 애니메이션 루프 시작 (매 프레임 렌더링)
})();
```

### 4.4 파일 로드

**위치: 762~948줄**

#### 파일 드래그/클릭 설정 (setupDrop) — 765줄
```javascript
// 드래그&드롭 + 클릭 이벤트를 설정하는 공통 함수
// dropBox에 파일을 놓거나 클릭하면 handler 함수가 호출됨
```

#### GLB 로드 (handleGLB) — 787줄
```javascript
// 1. FileReader로 파일 읽기 (ArrayBuffer)
// 2. GLTFLoader로 3D 모델 파싱
// 3. Revit Z축↑ → Three.js Y축↑ 로 90도 회전
// 4. 모델 중심을 원점(0,0,0)으로 이동
// 5. 모든 메시를 반투명으로 설정
// 6. 카메라를 모델에 맞게 위치 조정
// 7. Space 데이터가 있으면 자동으로 buildSpaces() 호출
```

#### JSON 로드 (handleJSON) — 849줄
```javascript
// 1. FileReader로 파일 읽기 (텍스트)
// 2. JSON 파싱
// 3. buildSpaces() 호출 → 3D 박스 생성
// 4. HTM 데이터가 있으면 matchZones() 호출
```

#### HTM 로드 (handleHTM) — 877줄
```javascript
// 1. FileReader로 파일 읽기 (텍스트)
// 2. parseHTM() 으로 에너지 데이터 추출
// 3. 최대 2개 보고서까지 저장 (비교 기능 지원)
// 4. matchZones() 호출 → Space ↔ Zone 매칭
// 5. renderAnalysisSummary() → 분석 요약 표시
// 6. autoCollapseHTMExpandAnalysis() → HTM 섹션 접기, 분석 섹션 펼치기
```

#### HTM 로드 후 자동 패널 정리 (autoCollapseHTMExpandAnalysis) — 911줄
```javascript
// HTM 파일을 로드하면 자동으로:
// 1. "Energy Report (HTM)" 섹션을 접음
// 2. "에너지 분석 요약" 섹션을 펼침
// 3. 차트 렌더링 후 패널 높이를 재계산하여 그래프가 바로 보이게 함
```

### 4.5 에너지 분석 요약

**위치: 984~1339줄**

```javascript
// renderAnalysisSummary() — 메인 렌더링 함수
// 탭 바 생성 (개요 | 에너지 사용 | 월별 | 비교)
// 선택된 탭에 따라 적절한 렌더 함수 호출

// renderOverviewTab()  — 건물정보, 에너지, 면적, 쾌적, AirLoop
// renderEndUseTab()    — 연간 에너지 사용량 + 연료별 분해
// renderMonthlyTab()   — 월별 소비 테이블
// renderCompareTab()   — 2개 보고서 비교 (Zone별 차이)

// renderEndUsePie()    — 도넛 차트 (Chart.js)
// renderMonthlyBar()   — 막대 차트 (Chart.js)
// destroyCharts()      — 기존 차트 인스턴스 삭제
```

### 4.6 3D Space 빌드

**위치: 1341~1567줄**

```javascript
// getUnitScale() — JSON 버전에 따른 좌표 단위 결정
//   v1.1 = feet (scale 1.0), v1.0 = meters (scale 1/0.3048)

// buildSurfaceBoundsMap() — 해석 표면으로부터 Space별 경계 계산
//   JSON의 analyticalSurfaces에서 각 spaceName별로
//   모든 꼭짓점의 min/max를 구해 정밀한 경계 박스 생성
//   MEP Space 이름과 해석 표면 이름을 매칭 (4가지 전략)

// buildSpaces() — 핵심 함수: 3D 박스 생성
//   1. 좌표 변환: Revit Z-up → Three.js Y-up
//   2. 오프셋 계산: GLB 모델 중심에 맞춤
//   3. 모델 엔벨로프 계산: GLB 또는 해석 표면 전체 범위
//   4. 각 Space별 루프:
//      - 해석 표면 경계 사용 (있으면) / BBox 사용 (없으면)
//      - 모델 엔벨로프로 클램핑 (건물 밖으로 삐져나가지 않도록)
//      - BoxGeometry + MeshPhongMaterial → 반투명 박스
//      - EdgesGeometry → 와이어프레임 테두리
//      - 라벨 스프라이트 생성 (Space 이름)
//   5. 카메라 위치 조정 (fitCameraToSpaces)
//   6. 색상 업데이트 (updateColors)
//   7. 해석 표면 빌드 (buildAnalyticalSurfaces)
```

### 4.7 해석 표면

**위치: 1570~1656줄**

```javascript
// buildAnalyticalSurfaces() — 열해석 경계면 3D 생성
//   벽, 바닥, 지붕, 창문 등을 다각형(polygon)으로 생성
//   각 표면 유형별 색상:
//     외벽=파란색, 내벽=보라색, 지붕=빨간색, 
//     바닥=회색, 창문=하늘색, 문=주황색 등
//   삼각형 팬(triangle fan)으로 다각형 메시 생성

// updateSurfaceDisplay() — 표면 표시 모드 변경
//   'colored' = 타입별 색상, 'wireframe' = 선만, 'hidden' = 숨기기
```

### 4.8 Zone 매칭

**위치: 1690~1820줄**

```javascript
// matchZones() — Space(Revit)와 Zone(EnergyPlus)을 연결
//   Space와 Zone의 이름이 다를 수 있어서 여러 전략으로 매칭:
//
//   전략 1: zoneMatchKey로 정확 매칭
//     "6F STAIRWELL 6 STAIRWELL 6" == "6F STAIRWELL 6 STAIRWELL 6"
//
//   전략 2: 끝의 중복 번호 제거 후 매칭
//     "1 STAIRWELL 1" → "1 STAIRWELL"로 시도
//
//   전략 3: HVAC 네이밍 패턴 매칭
//     "6F_OPENWORKSPACE_VAV-1" → 층=6F, 타입=OPENWORKSPACE
//
//   전략 4: 층+Space Type 조합 매칭
//     Space의 "6F" + "Stairway" ↔ Zone의 "6F STAIRWELL"
//
//   전략 5: 부분 문자열 포함 매칭
//     Zone 이름에 Space 이름이 포함되어 있는지 확인
//
//   매칭 결과를 matchedData 배열에 저장
//   → 3D 색상, 상세 패널, Space 목록 등에 사용
```

### 4.9 색상 시스템

**위치: 1821~1907줄**

```javascript
// updateColors() — Space 박스 색상 업데이트
//   색상 기준(colorMetric)에 따라 다른 방식:
//
//   [수치형] area, volume, lightingDensity, plugDensity, totalLoad...
//     → 최소~최대 범위 계산
//     → 히트맵 색상 (파란색~빨간색 그라데이션)
//     → heatColor(t) 함수: 0.0(파랑) ~ 1.0(빨강)
//
//   [카테고리형] spaceType, level, conditioned
//     → 카테고리별 고유 색상 배정
//     → CAT_COLORS 팔레트 사용

// updateLegendNum() — 수치형 범례 바 그리기
// updateLegendCat() — 카테고리형 범례 바 그리기
```

### 4.10 Space 목록 & 선택

**위치: 1909~1935줄**

```javascript
// renderSpaceList() — 사이드바 Space 목록 HTML 생성
//   각 Space를 클릭 가능한 아이템으로 렌더링
//   선택 상태, 매칭 상태, 면적 표시

// selectSpace(guid) — Space 선택 시 실행 ★★★ (핵심 함수)
//   1. 선택된 Space: 높은 투명도 + 금색 테두리 + renderOrder 999
//   2. 비선택 Space: 매우 낮은 투명도 (dim 처리)
//   3. 카메라가 선택한 Space 방향으로 이동
//   4. 속성 패널 + 상세 패널 업데이트

// clearSelection() — 선택 해제
//   모든 Space를 원래 상태로 복원
//   updateColors() 호출로 색상 다시 적용
```

### 4.11 속성 패널

**위치: 2092~2310줄**

```javascript
// showPropertiesForSpace(guid) — Space 속성 표시
//   Revit 스타일의 카테고리별 속성 테이블:
//   - 치수: 면적, 체적, 가로×세로×높이
//   - Identity: 이름, 번호, GUID
//   - 공간 위치: 층, BBox 좌표
//   - Energy Analysis: Space Type, 공조여부, Zone 매칭
//   - 해석 속성: Zone 면적/체적/천장높이 (HTM 데이터)
//   - 내부 부하: 재실인원, 조명밀도, 기기밀도
//   - 설계 부하: 냉방/난방 설계 부하, 풍량, 피크일자
//   - 침기: 유량, ACH
//
//   드롭다운에 관련 해석 표면 목록 표시 (전환 가능)

// showPropertiesForSurface(surfIdx) — 표면 속성 표시
//   표면 이름, 유형, 인접 공간, 꼭짓점 좌표 등
//   드롭다운에서 부모 Space로 전환 가능
```

### 4.12 마우스 상호작용

**위치: 2389~2488줄**

```javascript
// onMouseMove(e) — 마우스 이동 시
//   Raycaster로 마우스가 가리키는 3D 물체 감지
//   → Space: 테두리 강조 + 툴팁 (이름, 면적, 부하)
//   → Surface: 테두리 강조 + 툴팁 (타입, 인접 공간)
//   선택 상태에 따라 호버 해제 시 dim/bright 유지

// onMouseClick(e) — 마우스 클릭 시
//   Space 클릭 → selectSpace(guid) 호출
//   Surface 클릭 → selectSurface(surfIdx) 호출
//   빈 곳 클릭 → clearSelection() 호출
```

### 4.13 모델 표시/도구 모음

**위치: 2493~2554줄**

```javascript
// updateModelDisplay() — GLB 모델 표시 모드 변경
//   solid(불투명), transparent(반투명), wireframe(선), hidden(숨김)

// 도구 모음 버튼 이벤트:
//   btnReset    → 카메라 초기 위치로
//   btnModel    → 건물 모델 표시/숨김 토글
//   btnSpaces   → Space 박스 표시/숨김 토글
//   btnSurfaces → 해석 표면 표시/숨김 토글
//   btnAxes     → 좌표축 표시/숨김 토글
//   btnLabels   → 라벨 표시/숨김 토글
```

### 4.14 UI 새로고침 & 토글

**위치: 2577~2689줄**

```javascript
// refreshUI() — 전체 UI 갱신 (단위/언어 변경 시)
//   1. 모든 정적 텍스트를 현재 언어로 업데이트
//   2. 드롭박스 라벨 업데이트
//   3. 설정 옵션 텍스트 업데이트
//   4. 환영 카드 텍스트 업데이트
//   5. 분석 요약, Space 목록, 상세 패널 재렌더링
//   6. 패널 높이 재계산

// setupToggles() — 토글 버튼 이벤트 설정
//   IP/SI 토글: currentUnit 변경 → refreshUI()
//   한국어/EN 토글: currentLang 변경 → refreshUI()
```

### 4.15 접기/펼치기 패널

**위치: 2690~2812줄**

```javascript
// initPanels() — 사이드바 섹션을 접기/펼치기 패널로 변환
//   각 섹션(GLB, JSON, HTM, 분석, 설정)에 대해:
//   1. panel-header (클릭하면 접기/펼치기) 생성
//   2. panel-body (내용물 래퍼) 생성
//   3. max-height 애니메이션으로 부드러운 열고 닫기
//   4. 드래그로 섹션 순서 변경 기능
//
//   Space 목록도 별도의 접기/펼치기 패널로 생성
```

### 4.16 HTM 파서

**위치: 2821~3057줄**

```javascript
// parseHTM(htmlText, fileName) — HTM 보고서 파싱 (가장 긴 함수)
//   EnergyPlus의 eplustbl.htm 파일에서 데이터 추출:
//
//   추출 데이터:
//   - metadata: 프로그램명, 건물명, 환경 등
//   - annualEndUse: 연간 에너지 사용 (난방/냉방/조명/장비...)
//   - endUseByFuel: 연료별 에너지 분해
//   - monthlyConsumption: 월별 소비량 (12개월)
//   - siteSourceEnergy: 사이트/소스 에너지
//   - buildingArea: 건물 면적
//   - comfortSummary: 쾌적 요약
//   - zoneDetail: Zone별 상세 (면적, 체적, 부하, 침기 등)
//   - initSummary: 초기화 데이터 (위치, 장비, 시스템 사이징)
//   - airLoopLoadSummary: AirLoop 부하 요약
//
//   파싱 방법: HTML 코멘트 태그로 테이블 위치 찾기
//   <!-- FullName:AnnualBuildingUtilityPerformanceSummary_... -->
//   → 바로 다음 <table>을 DOMParser로 파싱

// 보조 함수:
//   parseNumber(str) — "1,234.5" → 1234.5
//   findTableByComment() — 코멘트로 테이블 찾기
//   findAllTablesByComment() — 패턴으로 여러 테이블 찾기
//   parseGenericInitTable() — 초기화 테이블 공통 파서
```

### 4.17 초기화

**위치: 3059~3082줄**

```javascript
// setupDrop() 호출로 GLB, JSON 드롭존 설정
// HTM 드롭존은 다중 파일 지원을 위해 별도 설정
//   drop 이벤트에서 .htm/.html 파일만 필터링
//   input[multiple]로 여러 파일 선택 가능
```

---

## 최근 추가/수정된 주요 코드

### `autoCollapseHTMExpandAnalysis()` — 911줄
```
HTM 로드 후 자동으로 패널 상태를 정리하는 함수.
HTM 섹션 접기 → 분석 섹션 펼치기 → 차트 재렌더링 → 높이 재계산
```

### `selectSpace()` 3D 하이라이트 — 1896줄
```
선택한 Space를 밝게, 나머지를 어둡게 만드는 코드.
금색 테두리(0xfbbf24) + renderOrder 999로 앞에 표시.
빈 공간 클릭 시 clearSelection()에서 updateColors()로 복원.
```

### `fmtLen/fmtArea/fmtVol` SI/IP 통합 — 687줄
```
기존: getUnit() → unitSelect 드롭다운 참조 (별도 동작)
수정: currentUnit → IP/SI 토글과 직접 연동
```

### `clampToEnvelope()` 바운딩박스 클리핑 — 1472줄
```
GLB 모델 경계 안으로 Space 박스를 제한하는 함수.
건물 밖으로 삐져나가는 문제 해결.
```

### Properties 드롭다운 개선 — 2105줄
```
기존: "Spaces (1)" 고정 텍스트
수정: Space 이름 + 관련 해석 표면 목록 표시, 전환 가능
```

---

## 데이터 흐름 다이어그램

```
[GLB 파일] → handleGLB() → glbGroup (3D 모델)
                               ↓
                          modelCenter (중심점)
                               ↓
[JSON 파일] → handleJSON() → spacesData → buildSpaces()
                               ↓              ↓
                          buildSurfaceBoundsMap()
                               ↓
                          spaceMeshes[] (3D 박스들)
                               ↓
[HTM 파일] → handleHTM() → parseHTM() → htmReports[]
                               ↓
                          matchZones() → matchedData[]
                               ↓
                          updateColors() (히트맵 적용)
                               ↓
                    ┌──────────┼──────────┐
                    ↓          ↓          ↓
              renderSpaceList  rightPanel  propsPanel
              (사이드바 목록)   (상세 패널)  (속성 패널)
```

---

*이 문서는 energy-3d-viewer.html의 코드 구조를 한국어로 설명합니다.*
*마지막 업데이트: 2026-02-12*
