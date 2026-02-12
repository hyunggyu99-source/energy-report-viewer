/**
 * =============================================
 * parser.js — HTM 보고서 파서
 * =============================================
 * EnergyPlus의 eplustbl.htm 파일에서 에너지 데이터를 추출합니다.
 * 순수 함수로 구성되어 다른 모듈에 의존하지 않습니다.
 */

// ── 숫자 파싱 (쉼표, 대시 등 처리) ──
export function parseNumber(str) {
  if (!str) return 0;
  const clean = str.replace(/,/g, '').trim();
  if (clean === '' || clean === '-' || clean === '\u2014') return 0;
  const num = parseFloat(clean);
  return isNaN(num) ? 0 : num;
}
const pn = parseNumber;

// ── HTML 코멘트로 테이블 찾기 ──
function findTableByComment(htmlText, doc, commentSubstr) {
  const allComments = htmlText.match(/<!-- FullName:[^>]+-->/g) || [];
  let pos = -1;
  for (const comment of allComments) {
    if (comment.includes(commentSubstr)) { pos = htmlText.indexOf(comment); break; }
  }
  if (pos === -1) return null;
  const after = htmlText.substring(pos);
  const ts = after.indexOf('<table'); if (ts === -1) return null;
  const te = after.indexOf('</table>', ts); if (te === -1) return null;
  return new DOMParser().parseFromString(after.substring(ts, te + 8), 'text/html').querySelector('table');
}

// ── 패턴으로 여러 테이블 찾기 ──
function findAllTablesByComment(htmlText, doc, pattern) {
  const results = [];
  const allComments = htmlText.match(/<!-- FullName:[^>]+-->/g) || [];
  for (const comment of allComments) {
    if (!comment.includes(pattern)) continue;
    const pos = htmlText.indexOf(comment);
    const after = htmlText.substring(pos);
    const ts = after.indexOf('<table'); if (ts === -1) continue;
    const te = after.indexOf('</table>', ts); if (te === -1) continue;
    const table = new DOMParser().parseFromString(after.substring(ts, te + 8), 'text/html').querySelector('table');
    const nameMatch = comment.match(/FullName:([^_]+)_([^_]+)_/);
    results.push({ table, systemName: nameMatch ? nameMatch[2] : 'Unknown', comment });
  }
  return results;
}

// ── 초기화 테이블 공통 파서 ──
function parseGenericInitTable(htmlText, doc, commentKey) {
  const table = findTableByComment(htmlText, doc, commentKey);
  if (!table) return [];
  const rows = table.querySelectorAll('tr');
  const headers = [];
  if (rows[0]) rows[0].querySelectorAll('td').forEach(td => headers.push(td.textContent.trim()));
  const data = [];
  for (let i = 1; i < rows.length; i++) {
    const cells = rows[i].querySelectorAll('td');
    const obj = {};
    for (let j = 0; j < cells.length && j < headers.length; j++) obj[headers[j] || 'idx'] = cells[j].textContent.trim();
    data.push(obj);
  }
  return data;
}

/**
 * HTM 보고서 파싱 — 메인 함수
 * @param {string} htmlText - HTM 파일의 전체 텍스트
 * @param {string} fileName - 파일 이름
 * @returns {object} 파싱된 보고서 데이터
 */
export function parseHTM(htmlText, fileName) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlText, 'text/html');
  const report = {
    fileName, metadata: {}, annualEndUse: {}, annualFuelUse: {},
    monthlyConsumption: {}, monthlyPeakDemand: {}, endUseByFuel: {},
    buildingArea: {}, zoneSummary: [], comfortSummary: {},
    windowWallRatio: {}, siteSourceEnergy: {},
    airLoopLoadSummary: {},
    initSummary: { version:null, timestepsPerHour:null, location:{}, buildingInfo:{}, zoneSizing:[], systemSizing:[], componentSizing:[] },
    warmupConvergence: { allPassed:true, zones:[] },
    zoneDetail: [],
  };

  // 메타데이터 추출
  const pm = htmlText.match(/Program Version:<b>([^<]+)<\/b>/); if(pm) report.metadata.program=pm[1].trim();
  const bm = htmlText.match(/Building: <b>([^<]+)<\/b>/); if(bm) report.metadata.building=bm[1].trim();
  const em = htmlText.match(/Environment: <b>([^<]+)<\/b>/); if(em) report.metadata.environment=em[1].trim();
  const tm = htmlText.match(/Simulation Timestamp: <b>([\s\S]*?)<\/b>/); if(tm) report.metadata.simTimestamp=tm[1].replace(/\s+/g,' ').trim();
  const hm = htmlText.match(/Values gathered over\s+([\d.]+)\s+hours/); if(hm) report.metadata.simHours=parseFloat(hm[1]);

  // 버튼 기반 테이블 (End Use, Monthly)
  const buttons = doc.querySelectorAll('button[data-toggle="collapse"]');
  buttons.forEach(btn => {
    const title = btn.textContent.trim().replace(/\s+/g, ' ');
    const targetId = btn.getAttribute('data-target');
    if (!targetId) return;
    const tableDiv = doc.querySelector(targetId);
    if (!tableDiv) return;
    const table = tableDiv.querySelector('table');
    if (!table) return;
    if (title.includes('End Use - view table')) {
      const rows = table.querySelectorAll('tr');
      rows.forEach((row, i) => { if(i===0) return; const c=row.querySelectorAll('td');
        if(c.length>=2) { const n=c[0].textContent.trim(); report.annualEndUse[n]=pn(c[1].textContent); }
      });
    } else if (title.includes('Energy Use - view table')) {
      const rows = table.querySelectorAll('tr');
      rows.forEach((row, i) => { if(i===0) return; const c=row.querySelectorAll('td');
        if(c.length>=2) { report.annualFuelUse[c[0].textContent.trim()]=pn(c[1].textContent); }
      });
    } else if (title.includes('Consumption') && title.includes('view table')) {
      const fuel = title.includes('Electricity')?'Electricity':title.includes('Natural Gas')?'Natural Gas':title.includes('District Cooling')?'District Cooling':title.includes('District Heating')?'District Heating':title.split('(')[0].trim();
      const result = {};
      table.querySelectorAll('tr').forEach((row, i) => { if(i===0) return; const c=row.querySelectorAll('td');
        if(c.length>=13) { const eu=c[0].textContent.trim(); const m=[]; for(let j=1;j<=12;j++) m.push(pn(c[j].textContent)); result[eu]={monthly:m, total:c.length>13?pn(c[13].textContent):null}; }
      });
      report.monthlyConsumption[fuel] = result;
    } else if (title.includes('Peak Demand') && title.includes('view table')) {
      const fuel = title.includes('Electricity')?'Electricity':title.includes('Natural Gas')?'Natural Gas':title.split('(')[0].trim();
      const result = {};
      table.querySelectorAll('tr').forEach((row, i) => { if(i===0) return; const c=row.querySelectorAll('td');
        if(c.length>=13) { const eu=c[0].textContent.trim(); const m=[]; for(let j=1;j<=12;j++) m.push(pn(c[j].textContent)); result[eu]={monthly:m, total:c.length>13?pn(c[13].textContent):null}; }
      });
      report.monthlyPeakDemand[fuel] = result;
    }
  });

  // 상세 테이블들
  const sseT = findTableByComment(htmlText, doc, 'Site and Source Energy');
  if (sseT) sseT.querySelectorAll('tr').forEach((row,i) => { if(i===0) return; const c=row.querySelectorAll('td');
    if(c.length>=4) report.siteSourceEnergy[c[0].textContent.trim()]={totalEnergy:pn(c[1].textContent),perTotalArea:pn(c[2].textContent),perCondArea:pn(c[3].textContent)};
  });
  const baT = findTableByComment(htmlText, doc, 'Building Area');
  if (baT) baT.querySelectorAll('tr').forEach((row,i) => { if(i===0) return; const c=row.querySelectorAll('td');
    if(c.length>=2) report.buildingArea[c[0].textContent.trim()]=pn(c[1].textContent);
  });
  const euT = findTableByComment(htmlText, doc, 'Entire Facility_End Uses');
  if (euT) { const hdr=[]; const hr=euT.querySelector('tr'); if(hr) hr.querySelectorAll('td').forEach(td=>hdr.push(td.textContent.trim()));
    euT.querySelectorAll('tr').forEach((row,i) => { if(i===0) return; const c=row.querySelectorAll('td');
      if(c.length>=2) { const eu=c[0].textContent.trim().replace(/\u00a0/g,''); if(!eu) return; const fd={};
        for(let j=1;j<c.length&&j<hdr.length;j++) fd[hdr[j].replace(/\[.*\]/,'').trim()]=pn(c[j].textContent);
        report.endUseByFuel[eu]=fd; }
    });
  }
  const zsT = findTableByComment(htmlText, doc, 'Entire Facility_Zone Summary');
  if (zsT) { const hdr=[]; const hr=zsT.querySelector('tr'); if(hr) hr.querySelectorAll('td').forEach(td=>hdr.push(td.textContent.trim()));
    zsT.querySelectorAll('tr').forEach((row,i) => { if(i===0) return; const c=row.querySelectorAll('td');
      if(c.length>=2) { const z={}; for(let j=0;j<c.length&&j<hdr.length;j++) z[hdr[j]||'Zone']=c[j].textContent.trim(); report.zoneSummary.push(z); }
    });
  }
  const cmfT = findTableByComment(htmlText, doc, 'Comfort and Setpoint Not Met Summary');
  if (cmfT) cmfT.querySelectorAll('tr').forEach((row,i) => { if(i===0) return; const c=row.querySelectorAll('td');
    if(c.length>=2) report.comfortSummary[c[0].textContent.trim()]=pn(c[1].textContent);
  });

  // AirLoop Component Load Summary
  const sysNames = new Set();
  findAllTablesByComment(htmlText, doc, 'AirLoop Component Load Summary').forEach(r => sysNames.add(r.systemName));
  for (const sn of sysNames) {
    const sys = { cooling:{}, heating:{} };
    const parseLoadComp = t => { const comps=[]; t.querySelectorAll('tr').forEach((row,i) => { if(i===0) return; const c=row.querySelectorAll('td');
      if(c.length>=7) comps.push({name:c[0].textContent.trim(),sensibleInstant:pn(c[1]?.textContent),sensibleDelayed:pn(c[2]?.textContent),latent:pn(c[4]?.textContent),total:pn(c[5]?.textContent),pctGrandTotal:pn(c[6]?.textContent)});
    }); return comps; };
    const parsePeakCond = t => { const cond={}; t.querySelectorAll('tr').forEach((row,i) => { if(i===0) return; const c=row.querySelectorAll('td');
      if(c.length>=2) { const k=c[0].textContent.trim(), v=c[1].textContent.trim(); cond[k]=isNaN(parseFloat(v))?v:pn(v); }
    }); return cond; };
    let t;
    t=findTableByComment(htmlText,doc,'AirLoop Component Load Summary_'+sn+'_Estimated Cooling Peak Load Components'); if(t) sys.cooling.components=parseLoadComp(t);
    t=findTableByComment(htmlText,doc,'AirLoop Component Load Summary_'+sn+'_Cooling Peak Conditions'); if(t) sys.cooling.peakConditions=parsePeakCond(t);
    t=findTableByComment(htmlText,doc,'AirLoop Component Load Summary_'+sn+'_Estimated Heating Peak Load Components'); if(t) sys.heating.components=parseLoadComp(t);
    t=findTableByComment(htmlText,doc,'AirLoop Component Load Summary_'+sn+'_Heating Peak Conditions'); if(t) sys.heating.peakConditions=parsePeakCond(t);
    report.airLoopLoadSummary[sn] = sys;
  }

  // Init Summary
  let t;
  t=findTableByComment(htmlText,doc,'Initialization Summary_Entire Facility_Version');
  if(t) { const c=t.querySelectorAll('tr:nth-child(2) td'); if(c.length>=2) report.initSummary.version=c[1].textContent.trim(); }
  t=findTableByComment(htmlText,doc,'Initialization Summary_Entire Facility_Site:Location');
  if(t) { const c=t.querySelectorAll('tr:nth-child(2) td');
    if(c.length>=6) report.initSummary.location={name:c[1].textContent.trim(),latitude:pn(c[2].textContent),longitude:pn(c[3].textContent),elevation:pn(c[5]?.textContent)};
  }
  t=findTableByComment(htmlText,doc,'Initialization Summary_Entire Facility_Zone Sizing Information');
  if(t) { const rows=t.querySelectorAll('tr');
    for(let i=1;i<rows.length;i++) { const c=rows[i].querySelectorAll('td');
      if(c.length>=13) report.initSummary.zoneSizing.push({
        zoneName:c[1].textContent.trim(), loadType:c[2].textContent.trim(),
        calcDesLoad:pn(c[3].textContent), userDesLoad:pn(c[4].textContent),
        calcDesAirFlow:pn(c[5].textContent), userDesAirFlow:pn(c[6].textContent),
        designDayName:c[7].textContent.trim(), dateTimeOfPeak:c[8].textContent.trim(),
        tempAtPeak:pn(c[9].textContent), floorArea:pn(c[11]?.textContent),
      });
    }
  }
  t=findTableByComment(htmlText,doc,'Initialization Summary_Entire Facility_System Sizing Information');
  if(t) { const rows=t.querySelectorAll('tr');
    for(let i=1;i<rows.length;i++) { const c=rows[i].querySelectorAll('td');
      if(c.length>=9) report.initSummary.systemSizing.push({
        systemName:c[1].textContent.trim(), loadType:c[2].textContent.trim(),
        userDesCapacity:pn(c[4].textContent), calcDesAirFlow:pn(c[5].textContent),
        userDesAirFlow:pn(c[6].textContent),
      });
    }
  }

  // Zone Detail 구성
  const _zi = parseGenericInitTable(htmlText,doc,'Initialization Summary_Entire Facility_Zone Information');
  const _ig = parseGenericInitTable(htmlText,doc,'Initialization Summary_Entire Facility_Zone Internal Gains Nominal');
  const _pp = parseGenericInitTable(htmlText,doc,'Initialization Summary_Entire Facility_People Internal Gains Nominal');
  const _lt = parseGenericInitTable(htmlText,doc,'Initialization Summary_Entire Facility_Lights Internal Gains Nominal');
  const _eq = parseGenericInitTable(htmlText,doc,'Initialization Summary_Entire Facility_ElectricEquipment Internal Gains Nominal');
  const _inf = parseGenericInitTable(htmlText,doc,'Initialization Summary_Entire Facility_ZoneInfiltration Airflow Stats Nominal');

  const zm = {}; const skip = new Set(['Total','Conditioned Total','Unconditioned Total','Not Part of Total']);
  report.zoneSummary.forEach(z => {
    const n = z['']||z['Zone']||Object.values(z)[0]; if(!n||skip.has(n)) return;
    zm[n] = { name:n, area:pn(z['Area [ft2]']), conditioned:z['Conditioned (Y/N)'],
      partOfTotal:z['Part of Total Floor Area (Y/N)'],
      volume:pn(z['Volume [ft3]']), multipliers:pn(z['Multipliers']),
      grossWallArea:pn(z['Above Ground Gross Wall Area [ft2]']), windowArea:pn(z['Window Glass Area [ft2]']),
      lightingDensity:pn(z['Lighting [Btu/h-ft2]']), areaPerPerson:pn(z['People [ft2 per person]']),
      plugDensity:pn(z['Plug and Process [Btu/h-ft2]']),
      ceilingHeight:0, people:{}, lights:{}, equipment:{}, infiltration:{},
      sizing:{cooling:null,heating:null}, totalLoadDensity:0 };
  });
  _zi.forEach(r => { const n=r['Zone Name']; if(!n||!zm[n]) return;
    zm[n].ceilingHeight=pn(r['Ceiling Height {ft}']); zm[n].volume=pn(r['Volume {ft3}'])||zm[n].volume; });
  _ig.forEach(r => { const n=r['Zone Name']; if(!n||!zm[n]) return;
    zm[n].people.count=pn(r['# Occupants']); zm[n].people.areaPerPerson=pn(r['Area per Occupant {ft2/person}']);
    zm[n].lightingDensity=pn(r['Interior Lighting {Btu/h-ft2}'])||zm[n].lightingDensity;
    zm[n].plugDensity=pn(r['Electric Load {Btu/h-ft2}'])||zm[n].plugDensity;
    zm[n].totalLoadDensity=pn(r['Sum Loads per Area {Btu/h-ft2}']); });
  _pp.forEach(r => { const n=r['Zone Name']; if(!n||!zm[n]) return;
    zm[n].people.count=pn(r['Number of People {}'])||zm[n].people.count;
    zm[n].people.scheduleName=r['Schedule Name']; });
  _lt.forEach(r => { const n=r['Zone Name']; if(!n||!zm[n]) return;
    zm[n].lights.density=pn(r['Lights/Floor Area {Btu/h-ft2}']); zm[n].lights.scheduleName=r['Schedule Name']; });
  _eq.forEach(r => { const n=r['Zone Name']; if(!n||!zm[n]) return;
    zm[n].equipment.density=pn(r['Equipment/Floor Area {Btu/h-ft2}']); zm[n].equipment.scheduleName=r['Schedule Name']; });
  _inf.forEach(r => { const n=r['Zone Name']; if(!n||!zm[n]) return;
    zm[n].infiltration.flowRate=pn(r['Design Volume Flow Rate {ft3/min}']); zm[n].infiltration.ach=pn(r['ACH - Air Changes per Hour']); });
  report.initSummary.zoneSizing.forEach(zs => { const n=zs.zoneName; if(!n||!zm[n]) return;
    if(zs.loadType==='Cooling') zm[n].sizing.cooling={designLoad:zs.calcDesLoad,designAirFlow:zs.calcDesAirFlow,peakDate:zs.dateTimeOfPeak,peakTemp:zs.tempAtPeak};
    else if(zs.loadType==='Heating') zm[n].sizing.heating={designLoad:zs.userDesLoad,designAirFlow:zs.userDesAirFlow,peakDate:zs.dateTimeOfPeak,peakTemp:zs.tempAtPeak};
  });
  report.zoneDetail = Object.values(zm);
  return report;
}
