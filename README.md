# Energy Report Viewer

EnergyPlus 에너지해석 보고서(HTM)를 웹 기반으로 시각화하는 도구입니다.
브라우저에서 HTML 파일을 열기만 하면 별도 설치 없이 동작합니다.

---

## 빠른 시작

### 1. 3D 에너지 뷰어

Revit Space와 에너지 보고서 Zone을 3D로 매칭하여 히트맵으로 시각화합니다.

| 항목 | 링크 |
|---|---|
| 뷰어 | `energy-3d-viewer.html` (브라우저에서 더블클릭) |
| 데모 | `0212_DEMO_Energy3DViewer.html` (샘플 데이터 내장, 바로 실행) |

**입력 파일**: `model.glb` (Revit 3D) + `energy-spaces.json` (Space 데이터) + `eplustbl.htm` (에너지 보고서 1~2개)

**데모 영상**

https://github.com/hyunggyu99-source/energy-report-viewer/releases/download/v0.1-demo/Energy_3D_Viewer1.mp4

https://github.com/hyunggyu99-source/energy-report-viewer/releases/download/v0.1-demo/Energy_3D_Viewer2.mp4

### 2. 보고서 비교 대시보드

HTM 보고서를 드래그 앤 드롭하면 차트/테이블로 자동 시각화합니다.

| 항목 | 링크 |
|---|---|
| 대시보드 | `index.html` (브라우저에서 더블클릭) |

**입력 파일**: `eplustbl.htm` 1~2개를 드래그 앤 드롭

---

## 주요 기능

### 3D 에너지 뷰어

| 기능 | 설명 |
|------|------|
| 3D 모델 렌더링 | GLB를 Three.js로 렌더링 — 회전, 줌, 클릭 |
| Space 3D 박스 | 각 공간(Space)을 BBox 기반 3D 박스로 시각화 |
| Zone 자동 매칭 | Space 이름 ↔ HTM Zone 이름을 4단계 전략으로 자동 매칭 |
| 히트맵 색상 | 면적, 체적, 조명밀도, 총부하, 냉방/난방부하 기준 시각화 |
| 속성 패널 | 선택 공간의 치수, 에너지, 부하 등 상세 속성 표시 |
| 보고서 비교 | HTM 2개 로드 시 공간별 변화량(증감률) 비교 |

### 보고서 비교 대시보드

| 탭 | 기능 |
|----|------|
| Overview | End-Use 에너지 비율, 연료별 에너지, KPI 요약 |
| Monthly Analysis | 월별 에너지 소비 추이 |
| Comparison | 보고서 2개 비교 — 항목별 증감률 자동 계산 |
| Zone Explorer | Zone별 면적/체적/부하 상세 조회 |
| Insights | 에너지 사용 패턴, 문제점 자동 도출 |

---

## 기술 스택

| 기술 | 용도 |
|------|------|
| HTML / CSS / JavaScript | 프론트엔드 전체 (단일 HTML 파일) |
| Three.js | 3D 렌더링 (WebGL) |
| Chart.js | 차트 (파이, 막대, 라인) |

## Credits

- **3D GLB Export / 웹 뷰어 기반 코드**: 예나님
- **보고서 파싱, 비교 대시보드, 3D 뷰어 확장**: 지형규
