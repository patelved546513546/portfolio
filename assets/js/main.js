/**
 * VED PATEL — PORTFOLIO CONTROLLER
 * Minimalist, Zero-Bloat, Pure Vanilla JS
 */

document.addEventListener('DOMContentLoaded', () => {
  initResumeModal();
  initCodeAccordions();
});

/* ===================================================================
   RESUME VIEWER MODAL
   =================================================================== */
function initResumeModal() {
  const modal = document.getElementById('resume-modal');
  const closeBtn = document.getElementById('resume-close-btn');
  const triggerBtns = document.querySelectorAll('.resume-trigger-btn');

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
   EXPANDABLE CODE ACCORDIONS & COPY BUTTONS
   =================================================================== */
function initCodeAccordions() {
  // Accordion Toggle
  document.querySelectorAll('.accordion-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const drawer = document.getElementById(targetId);
      if (!drawer) return;

      const isOpen = drawer.classList.contains('open');
      if (isOpen) {
        drawer.classList.remove('open');
        btn.innerHTML = 'inspect code &darr;';
      } else {
        drawer.classList.add('open');
        btn.innerHTML = 'hide code &uarr;';
      }
    });
  });

  // Copy Code
  document.querySelectorAll('.code-copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const drawer = btn.closest('.code-drawer');
      if (!drawer) return;
      const codeEl = drawer.querySelector('code');
      if (!codeEl) return;

      navigator.clipboard.writeText(codeEl.innerText).then(() => {
        const orig = btn.innerText;
        btn.innerText = 'copied';
        setTimeout(() => {
          btn.innerText = orig;
        }, 1800);
      });
    });
  });
}
