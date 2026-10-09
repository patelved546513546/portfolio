/**
 * VED PATEL — AUTHENTIC INTERACTIVE UNIX TERMINAL
 * Gives recruiters a real developer shell experience to inspect Ved's work.
 */

window.DevTerminal = (function () {
  const COMMANDS = {
    help: `Available commands:
  whoami       - About Ved Patel, current focus & background
  skills       - Breakdown of technical skills & tools
  projects     - List of flagship repositories & architectures
  docker ps    - Show containerized services (CareMind AI stack)
  experience   - Open edX internship & AICTE fellowships
  cat resume   - View education, GPA, and contact summary
  contact      - Email, LinkedIn, GitHub, and phone
  clear        - Clear terminal screen`,

    whoami: `VED PATEL
Role: Computer Engineering Student & Systems/DevOps Enthusiast
Location: Mehsana, Gujarat, India (Open to Relocation & Remote)
College: Ganpat University — U.V. Patel College of Engineering (CGPA: 7.26)
Focus: Linux Hosting, Docker Containerization, Python Automation,
       Applied ML Pipelines, and Self-Hosted Local AI (Ollama).`,

    skills: `==================== TECHNICAL ARSENAL ====================
Systems & DevOps:  Docker, Docker Compose, Linux Admin (Ubuntu/Debian),
                   Bash Scripting, Networking (TCP/IP, DNS), Open edX
AI/ML & Telemetry: PyTorch, FastAPI, Ollama (Llama-3.1), Prometheus,
                   Grafana, Quantile Regression ML, Scikit-Learn
Backend & DB:      Python Automation, Node.js, Express, MongoDB, SQL
Security & Tools:  Kali Linux, Metasploit, ELK Stack (Logstash, Kibana),
                   Git, GitHub, VS Code, Linux Server CLI`,

    projects: `=================== NOTABLE REPOSITORIES ===================
1. CareMind AI          [FastAPI + PyTorch + Ollama + Docker Compose]
   Dual-engine clinical decision platform running 5 containerized services.
   Repo: https://github.com/patelved546513546

2. TechResque           [Node.js + Express + MongoDB + WebSockets]
   On-demand service booking engine with <84ms auto-assignment algorithm.
   Repo: https://github.com/patelved546513546/TECHRESQUE

3. Microgrid Dispatch   [Python + Scikit-Learn + Streamlit + Open-Meteo]
   Quantile ML net-load forecasting on Ausgrid data (90% RMSE drop).
   Repo: https://github.com/patelved546513546/-microgrid-forecast-dispatch

4. DevSecOps SIEM Lab   [Elasticsearch + Logstash + Kibana + Kali Linux]
   SSH brute-force detection and syslog parsing pipeline.
   Repo: https://github.com/patelved546513546/cybersec-tools

5. Automated NEWS_BOT   [Python + Groq AI + Telegram + WhatsApp + SMTP]
   Repo: https://github.com/patelved546513546/NEWS_BOT

6. Email Reminder BOT   [Python + Flask + APScheduler]
   Repo: https://github.com/patelved546513546/Email_reminder_BOT`,

    'docker ps': `CONTAINER ID   IMAGE                 COMMAND                  CREATED         STATUS         PORTS                    NAMES
a4f9102c81bc   caremind-fastapi:1.0  "uvicorn main:app --h…"  2 hours ago     Up 2 hours     0.0.0.0:8000->8000/tcp   caremind-api
7b20e1189d2a   ollama/ollama:latest  "/bin/ollama serve"      2 hours ago     Up 2 hours     0.0.0.0:11434->11434/tcp caremind-ollama
9c88210fe401   prom/prometheus       "/bin/prometheus --c…"   2 hours ago     Up 2 hours     0.0.0.0:9090->9090/tcp   caremind-prometheus
3a410b09f422   grafana/grafana       "/run.sh"                2 hours ago     Up 2 hours     0.0.0.0:3000->3000/tcp   caremind-grafana
6e1194ab0882   node:20-alpine        "node server.js"         2 hours ago     Up 2 hours     0.0.0.0:5000->5000/tcp   caremind-express`,

    experience: `=================== WORK & INTERNSHIPS ===================
[Feb 2026 – May 2026]
Open edX LMS Administrator & Frontend Developer Intern
Ganpat University — IT Department, Mehsana, Gujarat
* Migrated Open edX to Ulmo release, configured MFEs and themes.
* Automated bulk student enrollment via Python automation scripts.
* Administered Linux hosting environment & SMTP mail configuration.

[Sep 2025 – Oct 2025]
Vodafone Idea (VOIS) — Edunet Foundation (AICTE Virtual)
* Conversational Data Analysis with Large Language Models.

[Sep 2025 – Oct 2025]
IBM SkillsBuild — Edunet Foundation (AICTE Virtual)
* AI & Cloud Technology workflows and model scaling fundamentals.`,

    'cat resume': `VED PATEL — B.Tech Computer Engineering (2023 - Present)
College: Ganpat University (UVPCE) | CGPA: 7.26
Email: patelved5258@gmail.com | Phone: +91-7383544236
GitHub: github.com/patelved546513546 | LinkedIn: linkedin.com/in/vedpatel5258
Certifications: Google Cloud Cybersecurity, Cisco Intro to Cybersecurity`,

    contact: `Email:    patelved5258@gmail.com
Phone:    +91-7383544236
LinkedIn: https://linkedin.com/in/vedpatel5258
GitHub:   https://github.com/patelved546513546
Location: Mehsana, Gujarat, India (Open to Remote / Relocation)`
  };

  function init() {
    const input = document.getElementById('terminal-cli-input');
    const output = document.getElementById('terminal-cli-output');
    const pills = document.querySelectorAll('.term-pill-btn');

    if (!input || !output) return;

    function execute(rawCmd) {
      const cmd = rawCmd.trim().toLowerCase();
      if (!cmd) return;

      const cmdEcho = `<div style="color:var(--text-muted); margin-top:8px;">ved@server:~$ <span style="color:#fff;">${rawCmd}</span></div>`;

      if (cmd === 'clear') {
        output.innerHTML = `Welcome to Ved Patel's systems shell. Type 'help' for commands.`;
        input.value = '';
        return;
      }

      let resp = COMMANDS[cmd];
      if (!resp) {
        resp = `bash: command not found: ${rawCmd}. Type 'help' for available commands.`;
      }

      output.innerHTML += `${cmdEcho}<div style="color:#e2e8f0; margin-bottom:8px;">${escapeHtml(resp)}</div>`;
      input.value = '';
      output.parentElement.scrollTop = output.parentElement.scrollHeight;
    }

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        execute(input.value);
      }
    });

    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        const cmd = pill.getAttribute('data-cmd');
        if (cmd) {
          execute(cmd);
          input.focus();
        }
      });
    });
  }

  function escapeHtml(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  return { init: init };
})();
