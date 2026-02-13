# 디스코드 공유 메시지 초안

아래 내용을 복사하여 디스코드에 붙여넣으세요.

---

## 메시지 본문 (복사용)

```
워크샵 중 바쁘실 텐데, 편하실 때 확인해 주시면 감사하겠습니다.

에너지 해석 탭 활용 방안을 알아보면서 개인적으로 정리한 내용을 공유드립니다.

[지형규] https://github.com/hyunggyu99-source/Revit-Study-Personal/blob/main/README.md

1. 리서치 문서
- 에너지 시뮬레이션 엔진 비교 (DOE-2.2 vs EnergyPlus)
- Air System / Zone Equipment 세팅 분석
- 스케줄(재실 인원, 전기 소비량 등) 커스터마이징 가능 범위 정리
- 에너지 단위 설정, 데이터 가용성 가이드 등 총 9건

2. 웹 대시보드 (HTM 보고서를 업로드하면 시각화)
- Annual Building Systems Analysis: https://hyunggyu99-source.github.io/Revit-Study-Personal/annual-building-systems/
- HVAC Mechanical Analysis Dashboard: https://hyunggyu99-source.github.io/Revit-Study-Personal/hvac-dashboard/

EnergyPlus가 출력하는 HTM 보고서를 파싱해서
피크 부하, 존별 상세, 장비 사이징, 보고서 간 비교 등을 웹에서 확인할 수 있도록 만들었습니다.
README에 샘플 HTM 파일과 사용 방법이 있어서 바로 체험해 보실 수 있습니다.

3. 3D 에너지 뷰어 — Revit Space와 에너지 보고서 Zone을 3D로 매칭
https://github.com/hyunggyu99-source/energy-report-viewer/blob/master/README.md

예나님이 만드신 3D 웹 뷰어를 기반으로,
에너지 해석 모델의 Space(Zone)를 3D에서 클릭하면 해석 보고서의 상세값이 매칭되도록 확장했습니다.
(데모 파일 + 영상 첨부합니다)

스케줄 변경이 보고서 값에 직접 반영되는 부분은 ㅇㅇ님이 검증해 주셔서, 활용안 보고서에 같이 정리된 상태입니다.

현재까지는 Revit 에너지 해석 탭이 설계 단계에서 보고서를 비교·활용하는 용도로 가능성이 있다고 보고 진행했는데,
혹시 회사에서 원하는 방향이 설계 단계 보고서보다는 실시간 데이터 연동 쪽일까요?
에너지해석 데이터를 Tandem 등으로 내보내는 것이 가능한지도 추가로 알아볼 수 있을 것 같아서, 방향을 여쭤봅니다.

편하실 때 의견 주시면 감사하겠습니다!
```

---

## 함께 첨부할 파일

| # | 파일 | 설명 |
|---|------|------|
| 1 | `0212_DEMO_Energy3DViewer.html` | 3D 뷰어 데모 (더블클릭으로 바로 실행) |
| 2 | `화면 녹화 중 2026-02-12 163909.mp4` | 3D 뷰어 영상 1 |
| 3 | `화면 녹화 중 2026-02-12 144627.mp4` | 3D 뷰어 영상 2 — 히트맵 색상 변경 |
| 4 | `화면 녹화 중 2026-02-12 144415.mp4` | 3D 뷰어 영상 3 — Space 클릭 상세값 매칭 |

> 영상은 용량 문제로 GitHub에 올리지 않았으므로 디스코드에 직접 첨부합니다.
