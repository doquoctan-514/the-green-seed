/**
 * motion.js — The Green Seed motion system v2
 * Story: Longan seed → processed → bio-film → food preservation → circular loop
 * Fixed: hero stagger conflict, film shimmer iOS, seed mobile fallback
 */
(function () {
  'use strict';

  const reduced  = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = () => window.innerWidth < 768;

  /* ─────────────────────────────────────────────
     PART 1 — Hero: Seed to Film
  ───────────────────────────────────────────── */
  function initHeroMotion() {
    const seed     = document.querySelector('.hero-seed');
    const filmDiv  = document.querySelector('.hero-film-strip');
    const heroCopy = document.querySelector('.hero-copy');
    if (!heroCopy) return;

    if (reduced) {
      if (filmDiv) filmDiv.style.opacity = '0.3';
      return;
    }

    /* — Text stagger for hero copy children — */
    // Remove data-reveal from .hero-copy so children can stagger independently
    heroCopy.removeAttribute('data-reveal');
    heroCopy.style.opacity = '1';
    heroCopy.style.transform = 'none';

    const children = [...heroCopy.children];
    children.forEach((el, i) => {
      el.style.setProperty('animation-delay', (80 + i * 100) + 'ms');
      el.classList.add('hero-text-reveal');
    });

    /* — Film strip fade in — */
    if (filmDiv) {
      // Trigger shimmer-run after short delay
      setTimeout(() => {
        filmDiv.classList.add('shimmer-run');
      }, 300);
    }

    /* — Seed SVG: desktop only — */
    if (seed && !isMobile()) {
      seed.style.opacity = '0';
      seed.style.transform = 'scale(0.55) rotate(-12deg)';

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          seed.style.transition =
            'opacity 500ms cubic-bezier(.22,1,.36,1), transform 650ms cubic-bezier(.22,1,.36,1)';
          seed.style.opacity = '1';
          seed.style.transform = 'scale(1) rotate(0deg)';

          // Gentle rock once
          setTimeout(() => {
            seed.style.transition = 'transform 900ms cubic-bezier(.37,0,.63,1)';
            seed.style.transform  = 'scale(1) rotate(6deg)';
            setTimeout(() => {
              seed.style.transition = 'transform 600ms cubic-bezier(.22,1,.36,1)';
              seed.style.transform  = 'scale(1) rotate(0deg)';
            }, 900);
          }, 600);
        });
      });
    }
  }

  /* ─────────────────────────────────────────────
     PART 2 — Process timeline
  ───────────────────────────────────────────── */
  function initProcessTimeline() {
    const nodes = [...document.querySelectorAll('.process-node[data-step]')];
    if (!nodes.length) return;

    if (reduced) {
      nodes.forEach(n => n.classList.add('is-active'));
      return;
    }

    let maxActive = -1;
    const container = document.querySelector('.process-line');
    const path      = document.querySelector('.cycle-svg-path');

    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const idx = parseInt(entry.target.dataset.step, 10);
        if (entry.isIntersecting) {
          entry.target.classList.add('is-active');
          if (idx > maxActive) {
            maxActive = idx;
            if (container) {
              const pct = Math.round(((idx + 1) / nodes.length) * 100);
              container.style.setProperty('--fill-pct', pct + '%');
            }
            if (path) {
              const total  = parseFloat(path.getAttribute('data-length') || '900');
              const offset = total - total * ((idx + 1) / nodes.length);
              path.style.strokeDashoffset = offset;
            }
          }
        }
      });
    }, { threshold: 0.35 });

    nodes.forEach(n => obs.observe(n));
  }

  /* ─────────────────────────────────────────────
     PART 3 — Film shimmer on media-cards
  ───────────────────────────────────────────── */
  function initFilmShimmer() {
    const targets = [...document.querySelectorAll('.media-card.film-shimmer')];
    if (!targets.length || reduced) return;

    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('shimmer-run');
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.25 });

    targets.forEach(el => obs.observe(el));
  }

  /* ─────────────────────────────────────────────
     PART 4 — Product card tap feedback (mobile)
  ───────────────────────────────────────────── */
  function initCardFeedback() {
    document.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('touchstart', () => {
        card.classList.add('is-pressed');
      }, { passive: true });
      ['touchend', 'touchcancel'].forEach(ev => {
        card.addEventListener(ev, () => {
          setTimeout(() => card.classList.remove('is-pressed'), 160);
        }, { passive: true });
      });
    });
  }

  /* ─────────────────────────────────────────────
     PART 5 — Circular impact path draw
  ───────────────────────────────────────────── */
  function initCircularImpact() {
    const path  = document.querySelector('.cycle-svg-path');
    const nodes = [...document.querySelectorAll('.cycle-visual .cycle-node')];
    const container = document.querySelector('.cycle-visual');
    if (!container) return;

    if (reduced) {
      if (path) path.style.strokeDashoffset = '0';
      nodes.forEach(n => { n.style.opacity = '1'; n.style.transform = 'scale(1)'; });
      return;
    }

    // Set initial state
    if (path) {
      const len = 679; // circumference of r=108 circle
      path.style.strokeDasharray  = len;
      path.style.strokeDashoffset = len;
    }
    nodes.forEach(n => {
      n.style.opacity   = '0';
      n.style.transform = 'scale(0.5)';
    });

    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        if (path) {
          path.style.transition       = 'stroke-dashoffset 1200ms cubic-bezier(.16,1,.3,1)';
          path.style.strokeDashoffset = '0';
        }

        nodes.forEach((n, i) => {
          setTimeout(() => {
            n.style.transition = 'opacity 280ms ease, transform 380ms cubic-bezier(.22,1,.36,1)';
            n.style.opacity    = '1';
            n.style.transform  = 'scale(1)';
          }, 300 + i * 140);
        });

        obs.unobserve(entry.target);
      });
    }, { threshold: 0.2 });

    obs.observe(container);
  }

  /* ─────────────────────────────────────────────
     PART 5b — feature-card stagger
  ───────────────────────────────────────────── */
  function initFlowReveal() {
    const cards = [...document.querySelectorAll('.feature-card[data-reveal]')];
    if (!cards.length || reduced) return;
    cards.forEach((card, i) => {
      card.style.setProperty('--reveal-delay', (i * 110) + 'ms');
    });
  }

  /* ── Boot ── */
  function init() {
    initHeroMotion();
    initProcessTimeline();
    initFilmShimmer();
    initCardFeedback();
    initCircularImpact();
    initFlowReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();