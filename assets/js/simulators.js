/**
 * VED PATEL PORTFOLIO — INTERACTIVE LAB SIMULATORS
 * 1. CareMind AI (Dual-Engine Clinical Decision Support)
 * 2. TechResque (<100ms Instant Provider Auto-Assignment)
 * 3. Predictive Microgrid (Quantile Regression P10/P50/P90 & Battery Shaving)
 * 4. DevSecOps SIEM (ELK Stack & SSH Brute-Force Detection)
 */

window.LabSimulators = (function () {
  let initialized = false;

  function init() {
    if (initialized) return;
    initialized = true;

    initCareMindSim();
    initTechResqueSim();
    initMicrogridSim();
    initSiemSim();
    initPlaygroundTabs();
  }

  /* -------------------------------------------------------------
     TAB SWITCHING LOGIC
     ------------------------------------------------------------- */
  function initPlaygroundTabs() {
    const tabs = document.querySelectorAll('.playground-tab-btn');
    const panels = document.querySelectorAll('.sim-panel');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetId = tab.getAttribute('data-target');

        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));

        tab.classList.add('active');
        const targetPanel = document.getElementById(targetId);
        if (targetPanel) {
          targetPanel.classList.add('active');
        }

        // If microgrid is selected, trigger redraw
        if (targetId === 'sim-microgrid') {
          updateMicrogridChart();
        }
      });
    });
  }

  /* -------------------------------------------------------------
     1. CAREMIND AI SIMULATOR
     ------------------------------------------------------------- */
  function initCareMindSim() {
    const toggles = document.querySelectorAll('.symptom-toggle');
    const crpSlider = document.getElementById('cm-crp-input');
    const ddimerSlider = document.getElementById('cm-ddimer-input');
    const crpVal = document.getElementById('cm-crp-val');
    const ddimerVal = document.getElementById('cm-ddimer-val');
    const runBtn = document.getElementById('cm-run-inference');
    const terminal = document.getElementById('cm-llm-terminal');

    if (!runBtn) return;

    toggles.forEach(btn => {
      btn.addEventListener('click', () => {
        btn.classList.toggle('active');
      });
    });

    if (crpSlider && crpVal) {
      crpSlider.addEventListener('input', () => {
        crpVal.textContent = `${crpSlider.value} mg/L`;
      });
    }

    if (ddimerSlider && ddimerVal) {
      ddimerSlider.addEventListener('input', () => {
        ddimerVal.textContent = `${ddimerSlider.value} µg/mL`;
      });
    }

    runBtn.addEventListener('click', () => {
      runBtn.disabled = true;
      runBtn.innerHTML = '<span class="status-indicator"></span> Running Dual-Engine...';

      // Gather active symptoms
      const activeSymptoms = Array.from(document.querySelectorAll('.symptom-toggle.active'))
        .map(el => el.getAttribute('data-symptom'));

      const crp = parseFloat(crpSlider ? crpSlider.value : 0.8);
      const ddimer = parseFloat(ddimerSlider ? ddimerSlider.value : 0.2);

      // Calculate confidence scores based on multi-label classifier math
      let respScore = 20;
      let inflamScore = 15;
      let cardiacScore = 10;

      if (activeSymptoms.includes('cough')) respScore += 35;
      if (activeSymptoms.includes('sob')) { respScore += 25; cardiacScore += 25; }
      if (activeSymptoms.includes('fever')) { respScore += 15; inflamScore += 30; }
      if (activeSymptoms.includes('joint_pain')) inflamScore += 45;
      if (activeSymptoms.includes('chest_pain')) cardiacScore += 45;

      if (crp > 5.0) inflamScore += 20;
      if (ddimer > 0.5) cardiacScore += 20;

      respScore = Math.min(96, Math.max(12, respScore));
      inflamScore = Math.min(94, Math.max(8, inflamScore));
      cardiacScore = Math.min(92, Math.max(5, cardiacScore));

      // Update progress bars
      setTimeout(() => {
        document.getElementById('cm-bar-resp').style.width = `${respScore}%`;
        document.getElementById('cm-val-resp').textContent = `${respScore}%`;

        document.getElementById('cm-bar-inflam').style.width = `${inflamScore}%`;
        document.getElementById('cm-val-inflam').textContent = `${inflamScore}%`;

        document.getElementById('cm-bar-cardiac').style.width = `${cardiacScore}%`;
        document.getElementById('cm-val-cardiac').textContent = `${cardiacScore}%`;

        // Ollama Llama-3.1 Pydantic JSON Streaming
        const topDiagnosis = respScore >= inflamScore && respScore >= cardiacScore
          ? "Acute Bronchial / Respiratory Presentation"
          : (inflamScore >= cardiacScore ? "Systemic Inflammatory / Autoimmune Pattern" : "Cardiopulmonary Stress Indicator");

        const simulatedReport = 
`[Ollama/Llama-3.1 vLLM engine :: schema-validated]
{
  "triage_summary": "${topDiagnosis}",
  "biomarker_correlation": "CRP: ${crp} mg/L, D-Dimer: ${ddimer} µg/mL",
  "active_symptoms": [${activeSymptoms.map(s => `"${s}"`).join(', ')}],
  "safety_guardrail": "VALIDATED - No contradictory contraindicated therapies detected.",
  "recommendation": "Order focused differential panel. Circuit-breaker health: NOMINAL (p99 142ms)."
}`;

        streamText(terminal, simulatedReport, () => {
          runBtn.disabled = false;
          runBtn.innerHTML = '⚡ Re-Run Inference';
        });
      }, 350);
    });
  }

  function streamText(container, text, callback) {
    container.textContent = '';
    let i = 0;
    const interval = setInterval(() => {
      container.textContent += text[i];
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        if (callback) callback();
      }
    }, 9);
  }

  /* -------------------------------------------------------------
     2. TECHRESQUE SIMULATOR (<100ms AUTO-ASSIGNMENT)
     ------------------------------------------------------------- */
  const providers = [
    { id: 'p1', name: 'Alex Chen', specialty: 'electrician', rating: 4.9, activeJobs: 0, status: 'AVAILABLE' },
    { id: 'p2', name: 'Maria Garcia', specialty: 'plumber', rating: 4.8, activeJobs: 1, status: 'AVAILABLE' },
    { id: 'p3', name: 'Liam O\'Connor', specialty: 'hvac', rating: 4.9, activeJobs: 0, status: 'AVAILABLE' },
    { id: 'p4', name: 'Priya Sharma', specialty: 'electrician', rating: 5.0, activeJobs: 0, status: 'AVAILABLE' },
    { id: 'p5', name: 'David Miller', specialty: 'plumber', rating: 4.7, activeJobs: 2, status: 'AVAILABLE' },
    { id: 'p6', name: 'Elena Rostova', specialty: 'hvac', rating: 4.9, activeJobs: 1, status: 'AVAILABLE' }
  ];

  let totalDispatches = 1420;

  function initTechResqueSim() {
    const dispatchBtn = document.getElementById('tr-btn-dispatch');
    const serviceSelect = document.getElementById('tr-service-select');
    const latencyEl = document.getElementById('tr-metric-latency');
    const counterEl = document.getElementById('tr-metric-counter');

    if (!dispatchBtn) return;

    renderProviders();

    dispatchBtn.addEventListener('click', () => {
      const selectedSpec = serviceSelect.value;
      const startTime = performance.now();

      dispatchBtn.disabled = true;
      dispatchBtn.innerHTML = '<span class="status-indicator"></span> Hashing Candidates...';

      // Simulate Sub-100ms backend match
      const matchingProviders = providers.filter(p => p.specialty === selectedSpec);
      const chosen = matchingProviders[Math.floor(Math.random() * matchingProviders.length)];

      setTimeout(() => {
        const endTime = performance.now();
        const latencyMs = Math.round((endTime - startTime + Math.random() * 25));

        // Highlight chosen provider card
        const cards = document.querySelectorAll('.provider-sim-card');
        cards.forEach(card => card.classList.remove('assigned'));

        const targetCard = document.querySelector(`.provider-sim-card[data-id="${chosen.id}"]`);
        if (targetCard) {
          targetCard.classList.add('assigned');
          const statusBadge = targetCard.querySelector('.p-status');
          if (statusBadge) {
            statusBadge.textContent = 'ASSIGNED (JUST NOW)';
            statusBadge.style.color = 'var(--accent-emerald-light)';
          }
        }

        totalDispatches++;
        if (counterEl) counterEl.textContent = totalDispatches.toLocaleString();
        if (latencyEl) latencyEl.textContent = `${latencyMs}ms`;

        dispatchBtn.disabled = false;
        dispatchBtn.innerHTML = `⚡ Dispatch New Request (${latencyMs}ms)`;
      }, 65); // real quick execution
    });
  }

  function renderProviders() {
    const container = document.getElementById('tr-provider-grid');
    if (!container) return;

    container.innerHTML = providers.map(p => `
      <div class="provider-sim-card" data-id="${p.id}">
        <div class="p-header">
          <span class="p-name">${p.name}</span>
          <span class="badge badge-cyan">${p.specialty.toUpperCase()}</span>
        </div>
        <div class="p-spec">★ ${p.rating.toFixed(1)} &bull; ${p.activeJobs} active jobs</div>
        <div class="p-status">STATUS: ${p.status}</div>
      </div>
    `).join('');
  }

  /* -------------------------------------------------------------
     3. PREDICTIVE MICROGRID & BATTERY OPTIMIZER
     ------------------------------------------------------------- */
  function initMicrogridSim() {
    const solarSlider = document.getElementById('mg-solar-slider');
    const demandSlider = document.getElementById('mg-demand-slider');
    const solarVal = document.getElementById('mg-solar-val');
    const demandVal = document.getElementById('mg-demand-val');

    if (solarSlider && solarVal) {
      solarSlider.addEventListener('input', () => {
        solarVal.textContent = `${solarSlider.value} W/m²`;
        updateMicrogridChart();
      });
    }

    if (demandSlider && demandVal) {
      demandSlider.addEventListener('input', () => {
        demandVal.textContent = `${demandSlider.value} kW`;
        updateMicrogridChart();
      });
    }

    updateMicrogridChart();
  }

  function updateMicrogridChart() {
    const solarInput = document.getElementById('mg-solar-slider');
    const demandInput = document.getElementById('mg-demand-slider');
    const chart = document.getElementById('mg-chart-svg');
    const batteryFill = document.getElementById('mg-battery-fluid');
    const socLabel = document.getElementById('mg-soc-label');
    const savingsLabel = document.getElementById('mg-savings-label');

    if (!chart) return;

    const solar = parseFloat(solarInput ? solarInput.value : 650);
    const demand = parseFloat(demandInput ? demandInput.value : 750);

    // Calculate solar generation factor
    const solarGenKW = (solar / 1000) * 850;
    const netLoad = Math.max(-100, Math.round(demand - solarGenKW));

    // Battery dispatch logic
    let batterySoc = 60;
    let savingsPercent = 21.5;
    let savingsDollars = 1240;

    if (netLoad < 100) {
      // Excess solar, charge battery
      batterySoc = Math.min(95, Math.round(60 + (100 - netLoad) * 0.25));
      savingsPercent = 28.4;
      savingsDollars = 1680;
    } else if (netLoad > 600) {
      // High peak demand, discharge battery to shave peak
      batterySoc = Math.max(25, Math.round(60 - (netLoad - 600) * 0.12));
      savingsPercent = 18.2;
      savingsDollars = 1450;
    }

    if (batteryFill) batteryFill.style.height = `${batterySoc}%`;
    if (socLabel) socLabel.textContent = `${batterySoc}%`;
    if (savingsLabel) savingsLabel.textContent = `${savingsPercent}% ($${savingsDollars.toLocaleString()}/day)`;

    // Redraw SVG Curve representing P10, P50, P90
    const pointsP50 = [];
    const pointsP10 = [];
    const pointsP90 = [];

    const hours = 24;
    for (let h = 0; h <= hours; h++) {
      const x = (h / hours) * 500;
      // Diurnal curve
      const solarCurve = Math.sin((Math.PI * Math.max(0, h - 5)) / 14);
      const hourSolar = (h >= 6 && h <= 19) ? solarCurve * (solar / 1000) * 800 : 0;
      const baseHourLoad = demand * (0.5 + 0.5 * Math.sin((h / 24) * Math.PI));
      const hourNet = Math.max(0, baseHourLoad - hourSolar);

      const yP50 = 160 - (hourNet / 1200) * 120;
      const yP10 = yP50 + 15;
      const yP90 = yP50 - 15;

      pointsP50.push(`${x},${yP50}`);
      pointsP10.push(`${x},${yP10}`);
      pointsP90.push(`${x},${yP90}`);
    }

    const p50D = `M ${pointsP50.join(' L ')}`;
    const p10D = `M ${pointsP10.join(' L ')}`;
    const p90D = `M ${pointsP90.join(' L ')}`;

    chart.innerHTML = `
      <defs>
        <linearGradient id="bandGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.25"/>
          <stop offset="100%" stop-color="#10b981" stop-opacity="0.05"/>
        </linearGradient>
      </defs>
      <!-- Quantile Uncertainty Band P10-P90 -->
      <polygon points="${pointsP90.join(' ')} ${pointsP10.reverse().join(' ')}" fill="url(#bandGrad)" />
      <!-- P10 Bound -->
      <path d="${p10D}" fill="none" stroke="rgba(6, 182, 212, 0.4)" stroke-dasharray="3,3" stroke-width="1.5"/>
      <!-- P90 Bound -->
      <path d="${p90D}" fill="none" stroke="rgba(6, 182, 212, 0.4)" stroke-dasharray="3,3" stroke-width="1.5"/>
      <!-- P50 Median Prediction -->
      <path d="${p50D}" fill="none" stroke="#06b6d4" stroke-width="2.5"/>
      <!-- Grid axes -->
      <line x1="0" y1="160" x2="500" y2="160" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
      <text x="10" y="20" fill="#64748b" font-size="11" font-family="monospace">P90 Forecast Upper Bound</text>
      <text x="10" y="150" fill="#06b6d4" font-size="11" font-family="monospace">P50 Net-Load: ${netLoad} kW</text>
    `;
  }

  /* -------------------------------------------------------------
     4. DEVSECOPS SIEM & SSH BRUTE-FORCE SIMULATOR
     ------------------------------------------------------------- */
  function initSiemSim() {
    const stream = document.getElementById('siem-stream-box');
    const attackBtn = document.getElementById('siem-trigger-attack');
    const blockCountEl = document.getElementById('siem-blocks-count');

    if (!attackBtn || !stream) return;

    let blockedCounter = 27;

    // Normal ambient logs
    const initialLogs = [
      { time: '16:42:01', type: 'info', msg: 'sshd[1092]: Connection from 10.0.1.15 port 54102 Accepted publickey' },
      { time: '16:42:15', type: 'info', msg: 'nginx[441]: GET /api/v1/health HTTP/1.1 200 OK 0.002s' },
      { time: '16:42:30', type: 'info', msg: 'docker-daemon: Container caremind-fastapi status HEALTHY' }
    ];

    initialLogs.forEach(log => appendLog(stream, log));

    attackBtn.addEventListener('click', () => {
      attackBtn.disabled = true;
      attackBtn.innerHTML = '<span class="status-indicator" style="background:var(--accent-rose)"></span> Attack In Progress...';

      let step = 0;
      const attackInterval = setInterval(() => {
        step++;
        const now = new Date().toTimeString().split(' ')[0];

        if (step <= 4) {
          appendLog(stream, {
            time: now,
            type: 'alert',
            msg: `sshd[3320]: Failed password for root from 185.220.101.44 port ${48210 + step} ssh2`
          });
        } else if (step === 5) {
          blockedCounter++;
          if (blockCountEl) blockCountEl.textContent = blockedCounter;

          appendLog(stream, {
            time: now,
            type: 'blocked',
            msg: `[SIEM ALERT] Elasticsearch Rule #SEC-409 TRIGGERED: SSH Brute-Force threshold breached (5 attempts in <3s). IP 185.220.101.44 ISOLATED & DROPPED via iptables.`
          });

          clearInterval(attackInterval);
          attackBtn.disabled = false;
          attackBtn.innerHTML = '🛡️ Simulate SSH Brute-Force Attack';
        }
      }, 400);
    });
  }

  function appendLog(container, { time, type, msg }) {
    const entry = document.createElement('div');
    entry.className = `siem-log-entry ${type}`;
    entry.innerHTML = `<span style="color:var(--text-muted);font-family:monospace">[${time}]</span> <span>${msg}</span>`;
    container.appendChild(entry);
    container.scrollTop = container.scrollHeight;
  }

  return {
    init: init
  };
})();
