/**
 * VED PATEL — PORTFOLIO MAIN CONTROLLER
 * Handles Modals, Command Palette (Cmd+K), Toast System,
 * GitHub API live data, Resume Viewer, and Smooth Interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Dev Audio Haptics
  if (window.DevAudio) {
    window.DevAudio.init();
  }

  // Initialize Dynamic Spotlight Cursor Glow
  if (window.DevSpotlight) {
    window.DevSpotlight.init();
  }

  // Initialize Dev Terminal if present
  if (window.DevTerminal) {
    window.DevTerminal.init();
  }

  initNavigation();
  initCodeTabs();
  initProjectModals();
  initResumeModal();
  initCommandPalette();
  initToastSystem();
  initGitHubStats();
  initContactForm();
});

/* ===================================================================
   PROJECT DATA FOR WALKTHROUGH MODALS
   =================================================================== */
const PROJECTS_DATA = {
  caremind: {
    title: 'CareMind AI — Clinical Decision Support Platform',
    badge: 'FLAGSHIP AI & SYSTEMS',
    role: 'Lead Architect & ML Infrastructure',
    repo: 'https://github.com/patelved546513546',
    image: 'assets/images/caremind.jpg',
    summary: 'A multi-modal clinical intelligence platform integrating dual-engine inference: a PyTorch multi-label neural classifier for disease scoring and a locally hosted Ollama Llama-3.1 model constrained by Pydantic schemas for automated report generation.',
    metrics: [
      { label: 'Container Stack', value: '5 Services' },
      { label: 'Inference Queue', value: 'Async CPU Safe' },
      { label: 'Telemetry', value: 'Prometheus + Grafana' },
      { label: 'Test Guardrails', value: '100% Negation Safe' }
    ],
    architecture: `
      <div class="arch-flow-diagram">
        <div class="flow-step-node"><span>1. Client Request (Text, Pain Body-Map, OCR Lab Values)</span><span class="badge badge-cyan">REST / JSON</span></div>
        <div class="flow-arrow-down">↓ (FastAPI Ingestion & Schema Normalization)</div>
        <div class="flow-step-node"><span>2. Dual-Engine Dispatch: PyTorch Classifier + Ollama LLM</span><span class="badge badge-emerald">Parallel Async</span></div>
        <div class="flow-arrow-down">↓ (Circuit-Breaker & Deterministic Fallback Cache)</div>
        <div class="flow-step-node"><span>3. Safety Test Guardrail (Contradiction Check & Unit Normalize)</span><span class="badge badge-amber">Validated</span></div>
        <div class="flow-arrow-down">↓ (Scraped by Prometheus Exporter)</div>
        <div class="flow-step-node"><span>4. Docker Compose 5-Service Monitoring in Grafana Dashboard</span><span class="badge badge-violet">Live Observability</span></div>
      </div>
    `,
    highlights: [
      'Engineered an async CPU inference queue with circuit-breaker timeout handling and deterministic fallback caching.',
      'Containerized the entire 5-service stack (FastAPI, Node.js/Express, Ollama, Prometheus, Grafana) via Docker Compose.',
      'Constructed a multimodal input pipeline fusing symptoms, pain coordinates, and OCR lab values (CBC, lipid, metabolic, thyroid) with automated unit normalization across lab formats.',
      'Validated using an automated safety test suite covering negation handling and contradictory medical advice.'
    ],
    tech: ['Python', 'FastAPI', 'PyTorch', 'Ollama (Llama-3.1)', 'Node.js/Express', 'Docker Compose', 'Prometheus', 'Grafana']
  },

  techresque: {
    title: 'TechResque — Instant Service Auto-Assignment Platform',
    badge: 'DISTRIBUTED BACKEND',
    role: 'Full-Stack & Systems Developer',
    repo: 'https://github.com/patelved546513546/TECHRESQUE',
    image: 'assets/images/techresque.jpg',
    summary: 'A modern on-demand service booking engine featuring sub-100ms algorithmic provider auto-assignment, multi-specialty filtering, real-time status transitions, and fair workload distribution.',
    metrics: [
      { label: 'Dispatch Latency', value: '<84ms' },
      { label: 'Notification SLA', value: '<5s' },
      { label: 'Specialties', value: '6 Supported' },
      { label: 'State Workflow', value: '4 Lifecycle Stages' }
    ],
    architecture: `
      <div class="arch-flow-diagram">
        <div class="flow-step-node"><span>1. User Selects Category & Triggers Booking</span><span class="badge badge-cyan">Express API</span></div>
        <div class="flow-arrow-down">↓ (<100ms Query Filter)</div>
        <div class="flow-step-node"><span>2. Provider Pool Matching: Specialty + Real-Time Availability</span><span class="badge badge-emerald">O(1) Memory Hash</span></div>
        <div class="flow-arrow-down">↓ (Fair Uniform Distribution Engine)</div>
        <div class="flow-step-node"><span>3. Auto-Assign: Lifecycle changes to 'assigned'</span><span class="badge badge-amber">WebSocket Broadcast</span></div>
        <div class="flow-arrow-down">↓ (<5s SLA)</div>
        <div class="flow-step-node"><span>4. Push Alert Dispatched to Provider Mobile/Web View</span><span class="badge badge-violet">Confirmed</span></div>
      </div>
    `,
    highlights: [
      'Implemented an algorithmic matching engine ensuring unbiased job rotation among available certified technicians.',
      'Engineered end-to-end service states: requested → assigned → in_progress → completed with audit logging.',
      'Optimized backend query execution to consistently match and assign orders in under 100 milliseconds.',
      'Designed responsive UI modeled after tier-1 platforms (Urban Company).'
    ],
    tech: ['JavaScript', 'Node.js', 'Express', 'MongoDB', 'WebSockets', 'REST APIs', 'Tailwind CSS']
  },

  microgrid: {
    title: 'Predictive Solar + EV Microgrid Energy Dispatch',
    badge: 'MACHINE LEARNING & OPTIMIZATION',
    role: 'ML Engineer & Optimization Author',
    repo: 'https://github.com/patelved546513546/-microgrid-forecast-dispatch',
    image: 'assets/images/microgrid.jpg',
    summary: 'A predictive energy management framework forecasting net-load quantile bands (P10/P50/P90) using machine learning on real Ausgrid solar home data, driving a battery storage optimization model to shave peak demands and electricity costs.',
    metrics: [
      { label: 'RMSE Improvement', value: '90% (20.75 → 2.03)' },
      { label: 'Forecast MAPE', value: '≈ 2.51%' },
      { label: 'Quantile Coverage', value: '76% (Target 80%)' },
      { label: 'Data Source', value: 'Ausgrid & Open-Meteo' }
    ],
    architecture: `
      <div class="arch-flow-diagram">
        <div class="flow-step-node"><span>1. Historical Data Ingestion (Ausgrid 300-home Solar Load)</span><span class="badge badge-cyan">Pandas / NumPy</span></div>
        <div class="flow-arrow-down">↓ (Live Open-Meteo Irradiance Weather API)</div>
        <div class="flow-step-node"><span>2. Quantile Regression ML Model Training (P10, P50, P90)</span><span class="badge badge-emerald">Pinball Loss</span></div>
        <div class="flow-arrow-down">↓ (Net-Load Uncertainty Forecast)</div>
        <div class="flow-step-node"><span>3. Battery Arbitrage & Peak Shaving Linear Optimizer</span><span class="badge badge-amber">State of Charge Control</span></div>
        <div class="flow-arrow-down">↓ (Interactive Telemetry)</div>
        <div class="flow-step-node"><span>4. Real-Time Streamlit Interactive Analytics Dashboard</span><span class="badge badge-violet">Live Visuals</span></div>
      </div>
    `,
    highlights: [
      'Achieved a 90% error reduction over baseline (RMSE dropped from 20.75 down to 2.03) with a Mean Absolute Percentage Error of ~2.51%.',
      'Modeled uncertainty bands across P10 (10th percentile), P50 (median), and P90 (90th percentile) to prevent grid blackouts.',
      'Integrated battery dispatch algorithms that charge during high solar surplus and discharge during peak tariff hours.',
      'Deployed interactive Streamlit application for scenario modeling and cost savings analysis.'
    ],
    tech: ['Python', 'Scikit-Learn', 'Quantile Regression', 'Streamlit', 'Open-Meteo API', 'Pandas', 'NumPy']
  },

  cybersec: {
    title: 'Enterprise DevSecOps SIEM & Vulnerability Lab',
    badge: 'SECURITY & OBSERVABILITY',
    role: 'Security Engineer',
    repo: 'https://github.com/patelved546513546/cybersec-tools',
    image: 'assets/images/cybersec.jpg',
    summary: 'A hands-on cybersecurity and observability practice lab deploying an ELK stack (Elasticsearch, Logstash, Kibana) for SSH brute force attack detection, syslog ingestion, and Metasploitable2 vulnerability analysis on Kali Linux.',
    metrics: [
      { label: 'SIEM Pipeline', value: 'ELK Stack' },
      { label: 'Detection Rules', value: 'Brute-Force & Scans' },
      { label: 'Target Machine', value: 'Metasploitable2' },
      { label: 'Tooling', value: 'Kali, Metasploit, Nmap' }
    ],
    architecture: `
      <div class="arch-flow-diagram">
        <div class="flow-step-node"><span>1. Linux Host Auth Logs & Network Traffic Generated</span><span class="badge badge-cyan">/var/log/auth.log</span></div>
        <div class="flow-arrow-down">↓ (Beats / Logstash Pipeline Filtering)</div>
        <div class="flow-step-node"><span>2. Grok Parsing & Elasticsearch Indexing</span><span class="badge badge-emerald">JSON Schema</span></div>
        <div class="flow-arrow-down">↓ (Rule Detection Threshold Engine)</div>
        <div class="flow-step-node"><span>3. Trigger Real-Time Brute Force Alert & IP Isolation</span><span class="badge badge-amber">Automated Defense</span></div>
        <div class="flow-arrow-down">↓ (Kibana Dashboards)</div>
        <div class="flow-step-node"><span>4. Visual Security Intelligence & Attack Timeline</span><span class="badge badge-violet">SIEM Telemetry</span></div>
      </div>
    `,
    highlights: [
      'Built a central logging architecture with Logstash grok patterns extracting IP, user, and status from SSH auth logs.',
      'Configured Kibana visualization dashboards highlighting geo-location threat origins and repeat failed access vectors.',
      'Conducted vulnerability enumeration, service scanning, and penetration testing drills using Kali Linux and Metasploit against Metasploitable2 test targets.',
      'Documented remediation baselines for Linux server hardening and firewall iptables configuration.'
    ],
    tech: ['Elasticsearch', 'Logstash', 'Kibana', 'Kali Linux', 'Metasploit', 'Nmap', 'Bash Scripting', 'Linux Hardening']
  },

  newsbot: {
    title: 'Automated Multi-Channel News Bot with Groq AI',
    badge: 'AI AUTOMATION & WORKERS',
    role: 'Backend Automation Author',
    repo: 'https://github.com/patelved546513546/NEWS_BOT',
    image: 'assets/images/techresque.jpg',
    summary: 'An automated news aggregation and dispatch bot ingesting RSS feeds from major international sources (BBC, CNN, Al Jazeera, Reuters, Reddit), synthesizing summaries via Groq LLM, and broadcasting alerts across Email SMTP, Telegram, and WhatsApp.',
    metrics: [
      { label: 'Feeds Ingested', value: '5 Global Sources' },
      { label: 'LLM Engine', value: 'Groq Cloud API' },
      { label: 'Broadcast SLA', value: 'Every 15 mins' },
      { label: 'Channels', value: 'Email, TG, WhatsApp' }
    ],
    architecture: `
      <div class="arch-flow-diagram">
        <div class="flow-step-node"><span>1. Scheduled RSS Ingestion (BBC, CNN, Reuters, Reddit)</span><span class="badge badge-cyan">Python Feedparser</span></div>
        <div class="flow-arrow-down">↓ (Deduplication & Article Content Scraping)</div>
        <div class="flow-step-node"><span>2. Groq AI High-Speed Summarization Engine</span><span class="badge badge-emerald">Ultra-Low Latency</span></div>
        <div class="flow-arrow-down">↓ (Multi-Channel Dispatch Queue)</div>
        <div class="flow-step-node"><span>3. Broadcast to Gmail SMTP, Telegram Bot API & WhatsApp</span><span class="badge badge-amber">Multi-Tenant</span></div>
        <div class="flow-arrow-down">↓ (Flask Health Check)</div>
        <div class="flow-step-node"><span>4. Monitoring Endpoint for Uptime & Heartbeat Verification</span><span class="badge badge-violet">Render Deployed</span></div>
      </div>
    `,
    highlights: [
      'Engineered multi-source news parser extracting headlines and content across international news providers.',
      'Integrated Groq AI LLM inference to summarize breaking articles into concise 2-sentence executive briefs.',
      'Implemented tri-channel notification engine (Gmail SMTP, Telegram Bot, CallMeBot WhatsApp API).',
      'Provided Flask health check route for monitoring daemon uptime.'
    ],
    tech: ['Python', 'Groq API', 'Flask', 'SMTP', 'Telegram Bot API', 'WhatsApp API', 'Cron']
  },

  emailbot: {
    title: 'Smart Email Scheduler Bot with APScheduler',
    badge: 'BACKGROUND JOBS',
    role: 'Backend Developer',
    repo: 'https://github.com/patelved546513546/Email_reminder_BOT',
    image: 'assets/images/techresque.jpg',
    summary: 'A Flask web application with integrated APScheduler background workers for precision scheduling and automated dispatch of emails, with UI job cancellation and customizable message templates.',
    metrics: [
      { label: 'Job Framework', value: 'APScheduler' },
      { label: 'UI Control', value: 'Job Queue Panel' },
      { label: 'Execution', value: 'Background Async' },
      { label: 'Storage', value: 'Job Store' }
    ],
    architecture: `
      <div class="arch-flow-diagram">
        <div class="flow-step-node"><span>1. User Selects Delivery Timestamp & Content</span><span class="badge badge-cyan">Flask UI</span></div>
        <div class="flow-arrow-down">↓ (Job Store Registration)</div>
        <div class="flow-step-node"><span>2. Background Worker Scheduling (APScheduler)</span><span class="badge badge-emerald">Cron / Interval</span></div>
        <div class="flow-arrow-down">↓ (Trigger Time Reached)</div>
        <div class="flow-step-node"><span>3. Automated SMTP Delivery & UI Job Queue Removal</span><span class="badge badge-amber">Completed</span></div>
      </div>
    `,
    highlights: [
      'Designed dynamic calendar picker and time selector for week-ahead scheduling.',
      'Implemented job cancellation mechanisms from the web dashboard.',
      'Configured background worker process to prevent HTTP thread blocking during SMTP connection establishment.'
    ],
    tech: ['Python', 'Flask', 'APScheduler', 'SMTP', 'HTML5', 'CSS3']
  }
};

/* ===================================================================
   NAVIGATION & SCROLL SPY
   =================================================================== */
function initNavigation() {
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const navLinksContainer = document.querySelector('.nav-links');

  if (mobileToggle && navLinksContainer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navLinksContainer.style.display === 'flex';
      navLinksContainer.style.display = isOpen ? 'none' : 'flex';
      if (!isOpen) {
        navLinksContainer.style.flexDirection = 'column';
        navLinksContainer.style.position = 'absolute';
        navLinksContainer.style.top = '68px';
        navLinksContainer.style.left = '0';
        navLinksContainer.style.right = '0';
        navLinksContainer.style.background = 'var(--bg-glass-heavy)';
        navLinksContainer.style.padding = '20px';
        navLinksContainer.style.borderBottom = '1px solid var(--border-subtle)';
      }
    });
  }

  // Active section scroll spy
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ===================================================================
   MULTI-FILE CODE TABS & COPY FUNCTIONALITY
   =================================================================== */
function initCodeTabs() {
  document.addEventListener('click', (e) => {
    // 1. Code Tab Switching
    const tabBtn = e.target.closest('.file-tab-btn');
    if (tabBtn) {
      const container = tabBtn.closest('.code-window, .bento-card, .code-file-viewer, .skill-pillar-card');
      if (!container) return;

      const targetTab = tabBtn.getAttribute('data-tab');
      // Update active button within this container
      container.querySelectorAll('.file-tab-btn').forEach(btn => btn.classList.remove('active'));
      tabBtn.classList.add('active');

      // Update active pane within this container
      container.querySelectorAll('.file-tab-pane').forEach(pane => {
        if (pane.getAttribute('data-tab') === targetTab) {
          pane.classList.add('active');
        } else {
          pane.classList.remove('active');
        }
      });

      if (window.DevAudio) {
        window.DevAudio.playClick();
      }
      return;
    }

    // 2. Copy Code to Clipboard
    const copyBtn = e.target.closest('.copy-code-btn');
    if (copyBtn) {
      const container = copyBtn.closest('.code-window, .bento-card, .code-file-viewer, .skill-pillar-card');
      if (!container) return;

      const activePane = container.querySelector('.file-tab-pane.active');
      const codeElement = activePane ? activePane.querySelector('code') : container.querySelector('code');
      if (!codeElement) return;

      const textToCopy = codeElement.innerText;
      navigator.clipboard.writeText(textToCopy).then(() => {
        if (window.DevAudio) window.DevAudio.playSuccess();
        const origContent = copyBtn.innerHTML;
        copyBtn.innerHTML = `
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>Copied!</span>
        `;
        copyBtn.style.borderColor = 'var(--accent-emerald)';
        copyBtn.style.color = 'var(--accent-emerald)';

        if (typeof showToast === 'function') {
          showToast('Code snippet copied to clipboard! 📋', 'success');
        }

        setTimeout(() => {
          copyBtn.innerHTML = origContent;
          copyBtn.style.borderColor = '';
          copyBtn.style.color = '';
        }, 2200);
      }).catch(() => {
        if (typeof showToast === 'function') {
          showToast('Failed to copy. Please manually select text.', 'info');
        }
      });
    }
  });
}

/* ===================================================================
   PROJECT WALKTHROUGH MODALS
   =================================================================== */
function initProjectModals() {
  const modal = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const contentArea = document.getElementById('modal-content');
  const projectCards = document.querySelectorAll('.project-card[data-project]');

  if (!modal || !contentArea) return;

  projectCards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Don't open if clicked directly on an external link
      if (e.target.closest('a') && !e.target.classList.contains('deep-dive-btn')) {
        return;
      }

      const projectId = card.getAttribute('data-project');
      const data = PROJECTS_DATA[projectId];
      if (!data) return;

      renderProjectModal(data);
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  function renderProjectModal(data) {
    document.getElementById('modal-title').textContent = data.title;
    contentArea.innerHTML = `
      <div style="position:relative; border-radius: var(--radius-lg); overflow:hidden; border: 1px solid var(--border-subtle); max-height: 280px;">
        <img src="${data.image}" alt="${data.title}" style="width:100%; height:100%; object-fit:cover;">
        <div style="position:absolute; bottom: 12px; left: 16px; display:flex; gap:8px;">
          <span class="badge badge-cyan">${data.badge}</span>
          <span class="badge badge-emerald">${data.role}</span>
        </div>
      </div>

      <div>
        <h4 style="font-size: 1.1rem; margin-bottom: 8px;">Executive Engineering Overview</h4>
        <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6;">${data.summary}</p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px;">
        ${data.metrics.map(m => `
          <div style="padding: 12px; background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: var(--radius-md);">
            <div style="font-size: 0.72rem; text-transform:uppercase; color: var(--text-muted);">${m.label}</div>
            <div style="font-size: 1.1rem; font-weight: 700; font-family: var(--font-mono); color: var(--accent-cyan-light);">${m.value}</div>
          </div>
        `).join('')}
      </div>

      <div>
        <h4 style="font-size: 1.1rem; margin-bottom: 12px;">Dual-Engine & Pipeline Architecture</h4>
        ${data.architecture}
      </div>

      <div>
        <h4 style="font-size: 1.1rem; margin-bottom: 10px;">Engineering Key Results & Reliability</h4>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px;">
          ${data.highlights.map(h => `
            <li style="position:relative; padding-left: 20px; font-size: 0.9rem; color: var(--text-secondary);">
              <span style="position:absolute; left:0; color: var(--accent-cyan);">▹</span> ${h}
            </li>
          `).join('')}
        </ul>
      </div>

      <div>
        <h4 style="font-size: 1.1rem; margin-bottom: 10px;">Technologies & Tools</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
          ${data.tech.map(t => `<span class="badge">${t}</span>`).join('')}
        </div>
      </div>

      <div style="display: flex; gap: 12px; padding-top: 16px; border-top: 1px solid var(--border-subtle);">
        <a href="${data.repo}" target="_blank" rel="noopener noreferrer" class="btn btn-cyan" style="flex: 1;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          Inspect GitHub Repository
        </a>
        <button class="btn btn-secondary" onclick="document.getElementById('project-modal').classList.remove('open'); document.body.style.overflow=''; location.hash='#playgrounds';">
          ⚡ Try Simulator
        </button>
      </div>
    `;
  }
}

/* ===================================================================
   RESUME VIEWER MODAL
   =================================================================== */
function initResumeModal() {
  const modal = document.getElementById('resume-modal');
  const triggerBtns = document.querySelectorAll('.resume-trigger-btn');
  const closeBtn = document.getElementById('resume-close-btn');

  if (!modal) return;

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ===================================================================
   COMMAND PALETTE (CMD+K / CTRL+K)
   =================================================================== */
function initCommandPalette() {
  const modal = document.getElementById('cmd-k-modal');
  const trigger = document.querySelector('.cmd-k-trigger');
  const input = document.getElementById('cmd-k-search');
  const list = document.getElementById('cmd-k-list');

  if (!modal || !input || !list) return;

  const COMMANDS = [
    { name: 'CareMind AI — Clinical Decision Platform', action: () => openProject('caremind'), type: 'Case Study' },
    { name: 'TechResque — Auto-Assignment Platform', action: () => openProject('techresque'), type: 'Case Study' },
    { name: 'Predictive Solar + EV Microgrid', action: () => openProject('microgrid'), type: 'Case Study' },
    { name: 'Enterprise DevSecOps & SIEM Lab', action: () => openProject('cybersec'), type: 'Case Study' },
    { name: 'Launch CareMind AI Simulator', action: () => switchSim('tab-caremind'), type: 'Simulator' },
    { name: 'Launch TechResque <100ms Dispatcher', action: () => switchSim('tab-techresque'), type: 'Simulator' },
    { name: 'Launch Microgrid Solar/Battery Optimizer', action: () => switchSim('tab-microgrid'), type: 'Simulator' },
    { name: 'Launch DevSecOps SIEM Threat Telemetry', action: () => switchSim('tab-siem'), type: 'Simulator' },
    { name: 'Open edX Migration Experience', action: () => jumpTo('#experience'), type: 'Experience' },
    { name: 'Download / View Resume PDF', action: () => openResume(), type: 'Action' },
    { name: 'Copy Ved\'s Email (patelved5258@gmail.com)', action: () => copyEmail(), type: 'Action' },
    { name: 'Open GitHub Profile (@patelved546513546)', action: () => window.open('https://github.com/patelved546513546', '_blank'), type: 'External' },
    { name: 'Open LinkedIn Profile (/in/vedpatel5258)', action: () => window.open('https://linkedin.com/in/vedpatel5258', '_blank'), type: 'External' }
  ];

  function openPalette() {
    modal.classList.add('open');
    input.value = '';
    renderItems(COMMANDS);
    setTimeout(() => input.focus(), 50);
  }

  function closePalette() {
    modal.classList.remove('open');
  }

  if (trigger) trigger.addEventListener('click', openPalette);

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (modal.classList.contains('open')) {
        closePalette();
      } else {
        openPalette();
      }
    } else if (e.key === 'Escape' && modal.classList.contains('open')) {
      closePalette();
    }
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closePalette();
  });

  input.addEventListener('input', () => {
    const query = input.value.toLowerCase().trim();
    const filtered = COMMANDS.filter(c => c.name.toLowerCase().includes(query) || c.type.toLowerCase().includes(query));
    renderItems(filtered);
  });

  function renderItems(items) {
    if (items.length === 0) {
      list.innerHTML = `<li style="padding:16px; color:var(--text-muted); text-align:center;">No matching commands found</li>`;
      return;
    }

    list.innerHTML = items.map((cmd, idx) => `
      <li class="cmd-k-item ${idx === 0 ? 'selected' : ''}" data-idx="${idx}">
        <span>${cmd.name}</span>
        <span class="item-type">${cmd.type}</span>
      </li>
    `).join('');

    list.querySelectorAll('.cmd-k-item').forEach((itemEl, idx) => {
      itemEl.addEventListener('click', () => {
        closePalette();
        items[idx].action();
      });
    });
  }

  function openProject(id) {
    const card = document.querySelector(`.project-card[data-project="${id}"]`);
    if (card) card.click();
  }

  function switchSim(tabId) {
    const tab = document.getElementById(tabId);
    if (tab) {
      tab.click();
      jumpTo('#playgrounds');
    }
  }

  function jumpTo(selector) {
    const target = document.querySelector(selector);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function openResume() {
    const modal = document.getElementById('resume-modal');
    if (modal) modal.classList.add('open');
  }
}

/* ===================================================================
   TOAST NOTIFICATION & CLIPBOARD SYSTEM
   =================================================================== */
function initToastSystem() {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
}

function showToast(message, type = 'info') {

  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span class="status-indicator" style="background:${type === 'success' ? 'var(--accent-emerald)' : 'var(--accent-cyan)'}"></span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

function copyEmail() {
  const email = 'patelved5258@gmail.com';
  navigator.clipboard.writeText(email).then(() => {
    showToast(`Copied ${email} to clipboard! 📋`, 'success');
  }).catch(() => {
    showToast('Failed to copy. Please manually select the email.', 'info');
  });
}
window.copyEmail = copyEmail;

/* ===================================================================
   GITHUB API LIVE TELEMETRY
   =================================================================== */
function initGitHubStats() {
  const username = 'patelved546513546';
  const liveRepoBadge = document.getElementById('github-live-stat');

  // Try cache first
  const cached = localStorage.getItem('vp_gh_stats');
  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      if (Date.now() - parsed.timestamp < 1000 * 60 * 30) { // 30 mins
        updateGitHubUI(parsed.data);
        return;
      }
    } catch(e) {}
  }

  fetch(`https://api.github.com/users/${username}`)
    .then(res => res.json())
    .then(data => {
      if (data && data.public_repos !== undefined) {
        localStorage.setItem('vp_gh_stats', JSON.stringify({
          data: data,
          timestamp: Date.now()
        }));
        updateGitHubUI(data);
      }
    })
    .catch(err => {
      console.log('GitHub API offline fallback:', err);
    });

  function updateGitHubUI(data) {
    if (liveRepoBadge) {
      liveRepoBadge.textContent = `${data.public_repos} Repositories Online`;
    }
  }
}

/* ===================================================================
   CONTACT FORM DISPATCH
   =================================================================== */
function initContactForm() {
  const form = document.getElementById('quick-contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const message = document.getElementById('contact-message').value;

    const mailtoUrl = `mailto:patelved5258@gmail.com?subject=Portfolio Inquiry from ${encodeURIComponent(name)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
    window.location.href = mailtoUrl;

    showToast('Opening default email client... ✉️', 'success');
    form.reset();
  });
}
