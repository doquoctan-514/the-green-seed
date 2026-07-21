/**
 * motion.js — The Green Seed motion system
 * Story: Longan seed → processed → bio-film → food preservation → circular loop
 * 
 * Techniques: CSS @keyframes, SVG stroke-dashoffset, IntersectionObserver
 * No libraries. Pure CSS transforms + opacity only.
 * Respects prefers-reduced-motion throughout.
 */
(function () {
  'use strict';

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = () => window.innerWidth < 768;

  /* ─────────────────────────────────────────────
     PART 1 — Hero: Seed to Film
     Sequence: seed fade+scale → seed rotate → film sweep → text stagger
  ───────────────────────────────────────────── */
  function initHeroMotion() {
    const seed    = document.querySelector('.hero-seed');
    const film    = document.querySelector('.hero-film-strip');
    const heroCopy = document.querySelector('.hero-copy');
    if (!seed && !film) return;

    if (reduced) {
      // Show everything immediately, no animation
      seed && (seed.style.opacity = '1');
      film && (film.style.opacity = '0.35');
      return;
    }

    // Hero stagger for text children
    if (heroCopy) {
      const children = [...heroCopy.children];
      children.forEach((el, i) => {
        el.style.animationDelay = (120 + i * 90) + 'ms';
        el.classList.add('hero-text-reveal');
      });
    }

    // Seed: phase 1 – fade + scale in
    if (seed && !isMobile()) {
      seed.style.opacity = '0';
      seed.style.transform = 'scale(0.55) rotate(-12deg)';
      seed.style.transition = 'none';

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          seed.style.transition =
            'opacity 480ms cubic-bezier(.22,1,.36,1), transform 600ms cubic-bezier(.22,1,.36,1)';
          seed.style.opacity = '1';
          seed.style.transform = 'scale(1) rotate(0deg)';

          // Phase 2 – gentle rock, once
          setTimeout(() => {
            seed.style.transition = 'transform 900ms cubic-bezier(.37,0,.63,1)';
            seed.style.transform = 'scale(1) rotate(6deg)';
            setTimeout(() => {
              seed.style.transition = 'transform 700ms cubic-bezier(.22,1,.36,1)';
              seed.style.transform = 'scale(1) rotate(-2deg)';
              setTimeout(() => {
                seed.style.transition = 'transform 500ms cubic-bezier(.22,1,.36,1)';
                seed.style.transform = 'scale(1) rotate(0deg)';
              }, 700);
            }, 900);
          }, 550);
        });
      });
    }
  }

  /* ─────────────────────────────────────────────
     PART 2 — Process timeline: scroll-driven highlight
     Desktop: sticky visual + highlight active node
     Mobile:  vertical timeline fill
  ───────────────────────────────────────────── */
  function initProcessTimeline() {
    const nodes = [...document.querySelectorAll('.process-node[data-step]')];
    const path  = document.querySelector('.process-timeline-path');
    if (!nodes.length) return;

    if (reduced) {
      nodes.forEach(n => n.classList.add('is-active'));
      return;
    }

    // Mobile vertical fill: fill a ::before pseudo via CSS custom prop
    let maxActive = -1;

    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const idx = parseInt(entry.target.dataset.step, 10);
        if (entry.isIntersecting) {
          entry.target.classList.add('is-active');
          if (idx > maxActive) {
            maxActive = idx;
            // Update fill height via custom property on container
            const container = document.querySelector('.process-line');
            if (container) {
              const pct = Math.round(((idx + 1) / nodes.length) * 100);
              container.style.setProperty('--fill-pct', pct + '%');
            }
            // Update SVG path if present (desktop)
            if (path) {
              const total = parseFloat(path.getAttribute('data-length') || '900');
              const offset = total - (total * ((idx + 1) / nodes.length));
              path.style.strokeDashoffset = offset;
            }
          }
        }
      });
    }, { threshold: 0.4 });

    nodes.forEach(n => obs.observe(n));
  }

  /* ─────────────────────────────────────────────
     PART 3 — Film shimmer: runs once on viewport entry
  ───────────────────────────────────────────── */
  function initFilmShimmer() {
    const targets = [...document.querySelectorAll('.film-shimmer')];
    if (!targets.length || reduced) return;

    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('shimmer-run');
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.3 });

    targets.forEach(el => obs.observe(el));
  }

  /* ─────────────────────────────────────────────
     PART 4 — Product card: tap feedback (mobile)
     Desktop hover handled purely in CSS
  ───────────────────────────────────────────── */
  function initCardFeedback() {
    if (!isMobile()) return;
    document.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('touchstart', () => {
        card.classList.add('is-pressed');
      }, { passive: true });
      card.addEventListener('touchend', () => {
        setTimeout(() => card.classList.remove('is-pressed'), 150);
      }, { passive: true });
    });
  }

  /* ─────────────────────────────────────────────
     PART 5 — Circular impact: draw path + pop nodes
  ───────────────────────────────────────────── */
  function initCircularImpact() {
    const svg   = document.querySelector('.cycle-svg');
    const path  = document.querySelector('.cycle-svg-path');
    const nodes = [...document.querySelectorAll('.cycle-node')];
    if (!svg && !nodes.length) return;

    if (reduced) {
      path && (path.style.strokeDashoffset = '0');
      nodes.forEach(n => { n.style.opacity = '1'; n.style.transform = 'scale(1)'; });
      return;
    }

    // Set initial state
    if (path) {
      const len = path.getTotalLength ? Math.round(path.getTotalLength()) : 900;
      path.setAttribute('data-length', len);
      path.style.strokeDasharray  = len;
      path.style.strokeDashoffset = len;
    }
    nodes.forEach(n => {
      n.style.opacity   = '0';
      n.style.transform = 'scale(0.5)';
      n.style.transition = 'none';
    });

    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        // Draw path
        if (path) {
          path.style.transition = 'stroke-dashoffset 1100ms cubic-bezier(.16,1,.3,1)';
          path.style.strokeDashoffset = '0';
        }

        // Pop nodes with stagger
        nodes.forEach((n, i) => {
          setTimeout(() => {
            n.style.transition = 'opacity 300ms ease, transform 400ms cubic-bezier(.22,1,.36,1)';
            n.style.opacity   = '1';
            n.style.transform = 'scale(1)';
          }, 200 + i * 130);
        });

        obs.unobserve(entry.target);
      });
    }, { threshold: 0.3 });

    const container = svg || document.querySelector('.cycle-visual');
    if (container) obs.observe(container);
  }

  /* ─────────────────────────────────────────────
     PART 5b — feature-card sequential reveal on tac-dong.html
  ───────────────────────────────────────────── */
  function initFlowReveal() {
    const cards = [...document.querySelectorAll('.feature-card[data-reveal]')];
    if (!cards.length || reduced) return;

    cards.forEach((card, i) => {
      card.style.setProperty('--reveal-delay', (i * 120) + 'ms');
    });
  }

  /* ─────────────────────────────────────────────
     Boot
  ───────────────────────────────────────────── */
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