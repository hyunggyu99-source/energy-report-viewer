/**
 * =============================================
 * config.js — 설정, 상수, 언어 사전, 단위 변환
 * =============================================
 * 앱 전체에서 공유하는 설정값과 유틸리티 함수를 관리합니다.
 * 다른 모듈은 이 파일에서 필요한 것만 import 합니다.
 */

// =============================================
// [섹션 1] 전역 설정 변수
// =============================================
// export let 을 사용하면 다른 모듈에서 항상 최신값을 볼 수 있습니다.
export let currentUnit = 'IP';   // 'IP' (미국식) 또는 'SI' (국제표준)
export let currentLang = 'ko';   // 'ko' (한국어) 또는 'en' (영어)
export let dataUnits = null;     // JSON 데이터의 좌표 단위 ('feet' 또는 null=meters)

/** 단위 모드 변경 */
export function setUnit(u) { currentUnit = u; }
/** 언어 모드 변경 */
export function setLang(l) { currentLang = l; }
/** JSON 좌표 단위 설정 */
export function setDataUnits(u) { dataUnits = u; }

// =============================================
// [섹션 2] 단위 변환 상수
// =============================================
export const CONV = {
  ft2_m2: 0.092903,  m2_ft2: 10.7639,
  ft3_m3: 0.028317,  m3_ft3: 35.3147,
  ft_m: 0.3048,      m_ft: 3.28084,
  btu_kJ: 1.05506,   btu_Wh: 0.293071,
  btuh_W: 0.293071,  W_btuh: 3.41214,
  btuhft2_Wm2: 3.15459, Wm2_btuhft2: 0.316998,
  cfm_Ls: 0.4719,    Ls_cfm: 2.11888,
  F_C: f => (f - 32) * 5 / 9,
  C_F: c => c * 9 / 5 + 32,
};

export const FT_TO_MM  = 304.8;
export const M2_TO_FT2 = 10.7639;
export const M3_TO_FT3 = 35.3147;

// =============================================
// [섹션 3] 색상 팔레트
// =============================================

/** 해석 표면 유형별 색상 */
export const SURFACE_TYPE_COLORS = {
  ExteriorWall: 0x2563eb,     // 외벽 — 파란색
  InteriorWall: 0x7c3aed,     // 내벽 — 보라색
  Roof: 0xef4444,             // 지붕 — 빨간색
  InteriorFloor: 0x64748b,    // 내부 바닥 — 회색
  ExteriorFloor: 0x78716c,    // 외부 바닥 — 돌색
  UndergroundWall: 0x92400e,  // 지하벽 — 갈색
  UndergroundCeiling: 0x78350f,
  Window: 0x06b6d4,           // 창문 — 하늘색
  Door: 0xf59e0b,             // 문 — 주황색
  GlassDoor: 0x22d3ee,        // 유리문
  Skylight: 0x38bdf8,         // 천창
  Shade: 0x84cc16,            // 차양
  Air: 0xd4d4d8,              // 공기
};

/** 카테고리 색상 팔레트 (10색) */
export const CAT_COLORS = [
  '#ef4444','#f59e0b','#10b981','#3b82f6','#8b5cf6',
  '#ec4899','#14b8a6','#6366f1','#a855f7','#06b6d4'
];

// =============================================
// [섹션 4] 언어 사전 (한국어 / 영어)
// =============================================
export const LANG = {
ko: {
  subtitle:'Revit Space × EnergyPlus Zone Heatmap',
  glb_title:'1. 3D 모델 (GLB)', json_title:'2. Space 데이터 (JSON)',
  htm_title:'3. Energy Report (HTM) — 1~2개',
  glb_drop:'model.glb 드래그 또는 클릭', json_drop:'energy-spaces.json 드래그 또는 클릭',
  htm_drop:'eplustbl.htm 드래그 또는 클릭 (여러 개 가능)',
  analysis_title:'에너지 분석 요약',
  tab_overview:'개요', tab_enduse:'에너지 사용', tab_monthly:'월별', tab_compare:'비교',
  building_info:'건물 정보', building_name:'건물명', program:'프로그램',
  environment:'환경', location:'위치', zone_count:'Zone 수', cond_count:'조건',
  site_source:'사이트/소스 에너지', building_area_title:'건물 면적',
  comfort:'쾌적 요약', airloop:'AirLoop 시스템',
  annual_energy:'연간 에너지 사용량', fuel_energy:'연료별 에너지 사용',
  monthly_no_data:'월별 소비 데이터가 없습니다', monthly_suffix:'월별 소비',
  report_compare:'보고서 비교', report1:'보고서 1', report2:'보고서 2',
  zone_compare:'Zone 비교', common_zones:'공통 Zone',
  only_r1:'보고서1만', only_r2:'보고서2만', total_energy:'총 에너지',
  design_load_sum:'설계 부하 합계 (공통 Zone)', cooling:'냉방', heating:'난방',
  zone_load_top10:'Zone별 부하 비교 (상위 10)',
  model_label:'건물 모델', model_solid:'불투명', model_transparent:'반투명',
  model_wireframe:'와이어프레임', model_hidden:'숨기기', model_opacity:'모델 투명도',
  color_by:'색상 기준', space_opacity:'Space 투명도', wireframe:'와이어프레임',
  valid_only:'유효 공간만', surface_label:'해석 표면',
  surf_colored:'타입별 색상', surf_wire:'와이어프레임', surf_hidden:'숨기기', surface_opacity:'표면 투명도',
  color_spaceType:'Space Type', color_level:'층 (Level)', color_area:'면적', color_volume:'체적',
  color_conditioned:'공조 여부', color_lightingDensity:'조명밀도 (HTM)', color_plugDensity:'장비밀도 (HTM)',
  color_totalLoad:'총부하 (HTM)', color_coolingLoad:'냉방부하 (HTM)', color_heatingLoad:'난방부하 (HTM)',
  display_mode:'표시 모드',
  space_info:'공간 정보', zone_area:'Zone 면적', zone_volume:'Zone 체적',
  ceiling_h:'천장 높이', ext_wall:'외벽 면적', window_area:'창 면적', hvac_yn:'냉난방 여부',
  internal_gains:'내부 부하', occupancy:'재실 인원', persons:'명',
  area_pp:'인당 면적', pp_unit:'ft²/인',
  lighting_d:'조명 밀도', lighting_init:'조명 (Init)', equip_d:'기기 밀도', equip_init:'기기 (Init)',
  total_load_d:'총 부하 밀도', infiltration:'침기', flow_rate:'유량',
  design_loads:'설계 부하', cooling_design:'냉방 설계', cooling_af:'냉방 풍량',
  cooling_peak:'냉방 피크', peak_temp:'피크 온도',
  heating_design:'난방 설계', heating_af:'난방 풍량', heating_peak:'난방 피크',
  compare_label:'보고서 비교', no_zone:'에 해당 Zone 없음',
  dimensions:'치수 (가로 × 세로 × 높이)', energy_data:'에너지 데이터',
  welcome_title:'Energy 3D Viewer',
  welcome_desc:'Revit MEP Space와 EnergyPlus Zone 데이터를<br>3D 히트맵으로 시각화합니다.',
  step1:'<strong>model.glb</strong>를 드롭하세요 — Revit 3D 모델',
  step2:'<strong>energy-spaces.json</strong>을 드롭하세요 — Space 데이터',
  step3:'<strong>eplustbl.htm</strong> (선택) — Zone 에너지 데이터 히트맵',
  step_tip:'💡 JSON에 Analytical Surfaces가 포함되면<br>열해석 경계면(벽, 바닥, 지붕, 창문)도 표시됩니다.',
  match_load:'파일을 로드하세요', match_done:'zones 매칭 완료',
  match_ok:'매칭', match_fail:'매칭 실패 — 콘솔(F12)에서 Zone 이름 확인',
  loading:'로딩 중...', parse_error:'파싱 오류', read_fail:'파일 읽기 실패',
  reports_loaded:'개 보고서 로드됨', not_set:'미설정',
  controls_title:'설정', spaces_title:'Space 목록',
  props_title:'특성', props_none:'요소를 선택하세요',
  cat_dimensions:'치수', cat_identity:'Identity Data', cat_energy_analysis:'Energy Analysis',
  cat_analytical:'해석 속성', cat_phasing:'Phasing', cat_internal:'내부 부하',
  cat_sizing:'설계 부하', cat_infiltration:'침기', cat_location:'공간 위치',
  prop_name:'이름', prop_number:'번호', prop_guid:'GUID', prop_type:'유형',
  prop_area:'면적', prop_volume:'체적', prop_height:'높이',
  prop_width:'가로', prop_depth:'세로',
  prop_level:'층', prop_phase:'Phase', prop_conditioned:'공조 여부',
  prop_space_type:'Space Type', prop_occupancy:'설계 재실 인원',
  prop_surface_type:'Surface Type', prop_adj_space:'Adjacent Space',
  prop_vertices:'Vertices', prop_construction:'Analytic Construction',
  prop_originating:'Originating Element', prop_azimuth:'Azimuth', prop_tilt:'Tilt',
  prop_bbox_min:'BBox Min', prop_bbox_max:'BBox Max',
  prop_zone_match:'Zone Match Key', prop_htm_zone:'HTM Zone',
  months:['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
  months_short:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
},
en: {
  subtitle:'Revit Space × EnergyPlus Zone Heatmap',
  glb_title:'1. 3D Model (GLB)', json_title:'2. Space Data (JSON)',
  htm_title:'3. Energy Report (HTM) — 1-2 files',
  glb_drop:'Drag or click model.glb', json_drop:'Drag or click energy-spaces.json',
  htm_drop:'Drag or click eplustbl.htm (multiple)',
  analysis_title:'Energy Analysis Summary',
  tab_overview:'Overview', tab_enduse:'End Use', tab_monthly:'Monthly', tab_compare:'Compare',
  building_info:'Building Info', building_name:'Building', program:'Program',
  environment:'Environment', location:'Location', zone_count:'Zones', cond_count:'Cond.',
  site_source:'Site/Source Energy', building_area_title:'Building Area',
  comfort:'Comfort Summary', airloop:'AirLoop System',
  annual_energy:'Annual Energy Use', fuel_energy:'Energy Use by Fuel',
  monthly_no_data:'No monthly data available', monthly_suffix:'Monthly Consumption',
  report_compare:'Report Comparison', report1:'Report 1', report2:'Report 2',
  zone_compare:'Zone Comparison', common_zones:'Common Zones',
  only_r1:'Report 1 only', only_r2:'Report 2 only', total_energy:'Total Energy',
  design_load_sum:'Total Design Loads (Common Zones)', cooling:'Cooling', heating:'Heating',
  zone_load_top10:'Zone Load Comparison (Top 10)',
  model_label:'Building Model', model_solid:'Solid', model_transparent:'Transparent',
  model_wireframe:'Wireframe', model_hidden:'Hidden', model_opacity:'Model Opacity',
  color_by:'Color By', space_opacity:'Space Opacity', wireframe:'Wireframe',
  valid_only:'Valid Spaces Only', surface_label:'Analysis Surface',
  surf_colored:'Colored by Type', surf_wire:'Wireframe', surf_hidden:'Hidden', surface_opacity:'Surface Opacity',
  color_spaceType:'Space Type', color_level:'Level', color_area:'Area', color_volume:'Volume',
  color_conditioned:'Conditioned', color_lightingDensity:'Lighting (HTM)', color_plugDensity:'Equipment (HTM)',
  color_totalLoad:'Total Load (HTM)', color_coolingLoad:'Cooling (HTM)', color_heatingLoad:'Heating (HTM)',
  display_mode:'Display Mode',
  space_info:'Space Info', zone_area:'Zone Area', zone_volume:'Zone Volume',
  ceiling_h:'Ceiling Height', ext_wall:'Ext. Wall Area', window_area:'Window Area', hvac_yn:'HVAC',
  internal_gains:'Internal Gains', occupancy:'Occupants', persons:'',
  area_pp:'Area/Person', pp_unit:'ft²/person',
  lighting_d:'Lighting Density', lighting_init:'Lighting (Init)', equip_d:'Equipment Density', equip_init:'Equipment (Init)',
  total_load_d:'Total Load Density', infiltration:'Infiltration', flow_rate:'Flow Rate',
  design_loads:'Design Loads', cooling_design:'Cooling Design', cooling_af:'Cooling Airflow',
  cooling_peak:'Cooling Peak', peak_temp:'Peak Temp',
  heating_design:'Heating Design', heating_af:'Heating Airflow', heating_peak:'Heating Peak',
  compare_label:'Report Comparison', no_zone:' — Zone not found',
  dimensions:'Dimensions (W × D × H)', energy_data:'Energy Data',
  welcome_title:'Energy 3D Viewer',
  welcome_desc:'Visualize Revit MEP Space and EnergyPlus Zone data<br>as 3D heatmaps.',
  step1:'Drop <strong>model.glb</strong> — Revit 3D model',
  step2:'Drop <strong>energy-spaces.json</strong> — Space data',
  step3:'<strong>eplustbl.htm</strong> (optional) — Zone energy heatmap',
  step_tip:'💡 If JSON includes Analytical Surfaces,<br>thermal boundaries are also shown.',
  match_load:'Load files to begin', match_done:'zones matched',
  match_ok:'matched', match_fail:'Match failed — check zone names in console (F12)',
  loading:'Loading...', parse_error:'Parse error', read_fail:'File read failed',
  reports_loaded:'report(s) loaded', not_set:'Not set',
  controls_title:'Settings', spaces_title:'Space List',
  props_title:'Properties', props_none:'Select an element',
  cat_dimensions:'Dimensions', cat_identity:'Identity Data', cat_energy_analysis:'Energy Analysis',
  cat_analytical:'Analytical Properties', cat_phasing:'Phasing', cat_internal:'Internal Gains',
  cat_sizing:'Design Loads', cat_infiltration:'Infiltration', cat_location:'Spatial Location',
  prop_name:'Name', prop_number:'Number', prop_guid:'GUID', prop_type:'Type',
  prop_area:'Area', prop_volume:'Volume', prop_height:'Height',
  prop_width:'Width', prop_depth:'Depth',
  prop_level:'Level', prop_phase:'Phase', prop_conditioned:'Conditioned',
  prop_space_type:'Space Type', prop_occupancy:'Design Occupancy',
  prop_surface_type:'Surface Type', prop_adj_space:'Adjacent Space',
  prop_vertices:'Vertices', prop_construction:'Analytic Construction',
  prop_originating:'Originating Element', prop_azimuth:'Azimuth', prop_tilt:'Tilt',
  prop_bbox_min:'BBox Min', prop_bbox_max:'BBox Max',
  prop_zone_match:'Zone Match Key', prop_htm_zone:'HTM Zone',
  months:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
  months_short:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
}
};

// =============================================
// [섹션 5] 유틸리티 함수
// =============================================

/** 현재 언어로 텍스트 가져오기 */
export function L(key) { return LANG[currentLang]?.[key] ?? key; }

/** 상태 바에 메시지 출력 */
export function status(msg) {
  const el = document.getElementById('statusBar');
  if (el) el.textContent = msg;
  console.log('[Viewer]', msg);
}

// =============================================
// [섹션 6] 단위 변환 함수
// =============================================

/**
 * 범용 단위 포매터
 * @param {number} val - IP 단위 기준 값
 * @param {string} type - 'area_ft2', 'energy_kbtu', 'temp_F' 등
 * @returns {string} 현재 단위 설정에 맞게 변환된 문자열
 */
export function U(val, type) {
  if (val == null || isNaN(val)) return '—';
  const si = currentUnit === 'SI';
  switch (type) {
    case 'area_ft2':    return si ? (val*CONV.ft2_m2).toFixed(1)+' m²' : val.toLocaleString(undefined,{maximumFractionDigits:1})+' ft²';
    case 'vol_ft3':     return si ? (val*CONV.ft3_m3).toFixed(1)+' m³' : val.toLocaleString(undefined,{maximumFractionDigits:1})+' ft³';
    case 'len_ft':      return si ? (val*CONV.ft_m).toFixed(2)+' m' : val.toFixed(2)+' ft';
    case 'area_m2':     return si ? val.toFixed(1)+' m²' : (val*CONV.m2_ft2).toFixed(1)+' ft²';
    case 'vol_m3':      return si ? val.toFixed(1)+' m³' : (val*CONV.m3_ft3).toFixed(1)+' ft³';
    case 'energy_btu':  return si ? (val*CONV.btu_Wh/1e3).toFixed(2)+' kWh' : val.toLocaleString(undefined,{maximumFractionDigits:0})+' Btu';
    case 'energy_kbtu': return si ? (val*CONV.btu_Wh).toFixed(1)+' kWh' : val.toFixed(1)+' kBtu';
    case 'energy_mbtu': return si ? (val*CONV.btu_Wh/1e3).toFixed(2)+' MWh' : val.toFixed(2)+' MBtu';
    case 'load_btuh':   return si ? (val*CONV.btuh_W).toFixed(0)+' W' : val.toFixed(0)+' Btu/h';
    case 'load_kbtuh':  return si ? (val*CONV.btuh_W).toFixed(1)+' kW' : val.toFixed(1)+' kBtu/h';
    case 'density_btuhft2': return si ? (val*CONV.btuhft2_Wm2).toFixed(2)+' W/m²' : val.toFixed(2)+' Btu/h·ft²';
    case 'cfm':         return si ? (val*CONV.cfm_Ls).toFixed(1)+' L/s' : val.toFixed(0)+' CFM';
    case 'temp_F':      return si ? CONV.F_C(val).toFixed(1)+' °C' : val.toFixed(1)+' °F';
    case 'ach': return val.toFixed(2);
    case 'hr':  return val.toLocaleString()+' hr';
    case 'count': return val.toFixed(0);
    case 'pct': return val.toFixed(1)+'%';
    default: return String(val);
  }
}

/** 차트용 에너지 포매터 (Btu → 표시) */
export function UChart(val) {
  return currentUnit==='SI' ? (val*CONV.btu_Wh/1e3).toFixed(1)+' kWh' : (val/1e3).toFixed(1)+' kBtu';
}
export function UChartMega(val) {
  return currentUnit==='SI' ? (val*CONV.btu_Wh/1e6).toFixed(2)+' MWh' : (val/1e6).toFixed(2)+' MBtu';
}

/** 현재 단위 텍스트 반환 */
export function getUnit() { return currentUnit === 'SI' ? 'mm' : 'ft'; }

/** 길이 포매터 (ft 입력) */
export function fmtLen(ft) {
  if (currentUnit === 'SI') {
    const m = ft * 0.3048;
    return m >= 1 ? m.toFixed(2)+' m' : (ft*FT_TO_MM).toFixed(0)+' mm';
  }
  return ft.toFixed(2)+' ft';
}

/** 면적 포매터 (m² 입력) */
export function fmtArea(m2) {
  return currentUnit === 'SI' ? m2.toFixed(1)+' m²' : (m2*M2_TO_FT2).toFixed(1)+' ft²';
}

/** 체적 포매터 (m³ 입력) */
export function fmtVol(m3) {
  return currentUnit === 'SI' ? m3.toFixed(1)+' m³' : (m3*M3_TO_FT3).toFixed(1)+' ft³';
}

/** JSON 좌표 단위에 따른 스케일 팩터 */
export function getUnitScale() {
  if (dataUnits === 'feet') return 1.0;
  return 1 / 0.3048; // meters → feet
}
