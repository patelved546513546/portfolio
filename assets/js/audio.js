/**
 * VED PATEL PORTFOLIO — SYNTHESIZED WEB AUDIO HAPTICS
 * 100% Client-side synthetic audio using browser AudioContext (Zero external MP3 files).
 * Muted by default with toggle control in navbar.
 */

window.DevAudio = (function () {
  let audioCtx = null;
  let isMuted = true; // default muted for respectful UX

  function getContext() {
    if (!audioCtx && typeof AudioContext !== 'undefined') {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playClick() {
    if (isMuted) return;
    try {
      const ctx = getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.02);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.02);
    } catch (e) {}
  }

  function playKey() {
    if (isMuted) return;
    try {
      const ctx = getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(450, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.015);

      gain.gain.setValueAtTime(0.025, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.015);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.015);
    } catch (e) {}
  }

  function playSuccess() {
    if (isMuted) return;
    try {
      const ctx = getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.setValueAtTime(1320, now + 0.06);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(now + 0.14);
    } catch (e) {}
  }

  function toggleMute() {
    isMuted = !isMuted;
    localStorage.setItem('vp_audio_muted', isMuted ? '1' : '0');
    updateButtonUI();
    if (!isMuted) {
      getContext();
      playSuccess();
    }
    return !isMuted;
  }

  function updateButtonUI() {
    const btn = document.getElementById('audio-toggle-btn');
    if (!btn) return;
    if (isMuted) {
      btn.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg><span>Muted</span>`;
      btn.style.opacity = '0.65';
    } else {
      btn.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg><span style="color:var(--accent-cyan-light)">Sound ON</span>`;
      btn.style.opacity = '1';
    }
  }

  function init() {
    const saved = localStorage.getItem('vp_audio_muted');
    if (saved !== null) {
      isMuted = saved === '1';
    }
    updateButtonUI();

    const btn = document.getElementById('audio-toggle-btn');
    if (btn) {
      btn.addEventListener('click', toggleMute);
    }

    // Attach click feedback to interactive elements
    document.addEventListener('click', (e) => {
      if (e.target.closest('button') || e.target.closest('a') || e.target.closest('.term-pill-btn') || e.target.closest('.file-tab-btn')) {
        playClick();
      }
    });

    // Attach key sound to terminal input
    const termInput = document.getElementById('terminal-cli-input');
    if (termInput) {
      termInput.addEventListener('keydown', () => playKey());
    }
  }

  return {
    init: init,
    playClick: playClick,
    playKey: playKey,
    playSuccess: playSuccess,
    toggleMute: toggleMute
  };
})();
