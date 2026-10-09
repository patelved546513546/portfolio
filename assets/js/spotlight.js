/**
 * VED PATEL PORTFOLIO — SPOTLIGHT CURSOR GLOW EFFECT
 * Dynamically tracks mouse position on Bento cards to illuminate 1px borders
 * following Vercel and Linear design engineering principles.
 */

window.DevSpotlight = (function () {
  function init() {
    const cards = document.querySelectorAll('.spotlight-card');

    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });
  }

  return { init: init };
})();
