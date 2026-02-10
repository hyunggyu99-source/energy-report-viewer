# Annual Building Systems Analysis

**연간 건물 에너지 분석 (Annual Building Systems)**

OpenStudio / EnergyPlus의 Annual Building Systems HTM 보고서를 시각적으로 분석하는 웹 대시보드입니다. 건물 관리자, 소유자, 에너지 컨설턴트가 복잡한 시뮬레이션 결과를 쉽게 이해할 수 있도록 설계되었습니다.

> **[Live Demo](https://jihyunan-dev.github.io/annual-building-systems-analysis/)** — 브라우저에서 바로 사용 가능

---

## Features / 주요 기능

### Overview / 개요
- Total site energy, heating, cooling, EUI summary cards
- End-use energy breakdown (pie chart)
- Fuel type breakdown (bar chart) — click to jump to monthly detail
- Monthly energy trend line chart

### Monthly Analysis / 월별 분석
- Monthly energy by end use (stacked bar)
- Monthly peak demand (line chart)
- Monthly data table with cross-highlight on hover/click
- Data context panel explaining the numbers in plain language

### Report Comparison / 보고서 비교
- Compare 2+ reports side-by-side (total energy, heating, cooling, all end uses, monthly trend)
- Click chart bars to navigate to that report's monthly detail
- Zone-level comparison for zones with matching names across reports

### Building Details / 건물 상세
- Building information (location, program, area, WWR)
- Detailed end use by fuel type table
- Zone summary with clickable zone names
- Comfort & setpoint summary

### Zone Explorer / 존 탐색기
- Visual zone cards with area, occupancy, WWR indicators
- Detailed zone information panel (envelope, internal loads, HVAC sizing, infiltration)
- Free-form zone comparison — compare any 2+ zones regardless of name or report
- Multi-report zone switching with color-coded report indicators
- Tutorial guide for first-time users

### Developer API / 개발자 API
- Export structured JSON data (Energy Report, Peak Load, HVAC Sizing, Simulation Info)
- Export CSV for spreadsheet analysis
- Designed for digital twin integration

### Other Features / 기타
- Bilingual UI: English / Korean
- Unit toggle: IP (Imperial) / SI (Metric)
- Drag & drop file input
- Floating section navigator for quick scrolling
- Scroll-to-top button
- All processing happens client-side — no server, no data upload

---

## Usage / 사용 방법

1. **Open** the app in a web browser (use the Live Demo link above or open `index.html` locally)
2. **Drag & drop** one or more Annual Building Systems `.htm` report files onto the drop zone
3. **Explore** the data through the tabs: Overview, Monthly Analysis, Comparison, Building Details, Zone Explorer, Insights, Developer API

> **Note:** This tool is designed for **Annual Building Systems** reports from OpenStudio/EnergyPlus. HVAC reports are not supported by this tool.

---

## 사용 방법 (한국어)

1. 위의 Live Demo 링크를 클릭하거나 `index.html`을 브라우저에서 엽니다
2. Annual Building Systems HTM 보고서 파일을 드래그 앤 드롭합니다 (여러 파일 비교 지원)
3. 개요, 월별 분석, 비교, 건물 상세, 존 탐색기 등 탭을 통해 데이터를 탐색합니다

---

## Tech Stack / 기술 스택

- **HTML / CSS / JavaScript** — Single-page application, no build step required
- **[Chart.js](https://www.chartjs.org/)** v4.4.7 — Interactive charts (pie, bar, line)
- **[chartjs-plugin-datalabels](https://chartjs-plugin-datalabels.netlify.app/)** v2.2.0 — Data labels on charts
- All dependencies loaded via CDN — no `npm install` needed

---

## Supported Report Format / 지원 보고서 형식

This tool parses the HTML (`.htm`) output from:

- **OpenStudio** — Annual Building Systems report
- **EnergyPlus** — `eplustbl.htm` (Annual Building Utility Performance Summary tables)

The report file typically contains tables such as:
- Site and Source Energy
- End Uses / End Uses By Subcategory
- Building Area
- Utility Use Per Conditioned Floor Area
- Zone Summary / Zone Information
- AirLoop Component Load Summary
- Initialization Summary

---

## Local Development / 로컬 개발

No build tools are required. Simply open `index.html` in a browser:

```bash
# Clone the repository
git clone https://github.com/jihyunan-dev/annual-building-systems-analysis.git

# Open in browser
start index.html   # Windows
open index.html     # macOS
```

---

## License / 라이선스

MIT License

---

## Acknowledgments / 감사

- [OpenStudio](https://openstudio.net/) and [EnergyPlus](https://energyplus.net/) by U.S. Department of Energy
- [Chart.js](https://www.chartjs.org/) for data visualization
