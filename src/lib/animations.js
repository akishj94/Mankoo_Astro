import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { getLenis } from './lenis.js';

gsap.registerPlugin(ScrollTrigger);

/**
 * Syncs ScrollTrigger with the Lenis instance so smooth-scroll and
 * scroll-triggered animations stay in step with each other.
 */
function getLenis(){
    return;
}
function syncScrollTriggerWithLenis() {
  const lenis = getLenis();
  if (!lenis) return;

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
}

/**
 * Example reveal animation — fade/slide up any [data-reveal] element
 * as it enters the viewport. Extend or replace with real animations.
 */
function initRevealAnimations() {
  const targets = document.querySelectorAll('[data-reveal]');

  targets.forEach((el) => {
    gsap.fromTo(
      el,
      { autoAlpha: 0, y: 24 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        },
      }
    );
  });
}

/**
 * Wires every `[data-video-player]` on the page — the hero background clip and
 * any `Media` video frame. Each root owns its `<video>` plus its
 * `[data-video-toggle]` button (progress ring, play/pause icons), so any
 * number of players can coexist; a guard keeps re-runs idempotent.
 */
function initVideoPlayer(root) {
  const video = root.querySelector('video');
  const toggle = root.querySelector('[data-video-toggle]');
  if (!video || !toggle) return;

  const label = root.dataset.videoLabel || 'video';

  const ring = toggle.querySelector('[data-video-progress]');
  const playIcon = toggle.querySelector('[data-icon-play]');
  const pauseIcon = toggle.querySelector('[data-icon-pause]');
  if (!ring || !playIcon || !pauseIcon) return;

  // Must match the ring circle's radius in the markup.
  const RADIUS = 19;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

  video.muted = true;
  gsap.set(ring, { strokeDasharray: CIRCUMFERENCE, strokeDashoffset: CIRCUMFERENCE });

  function setProgress() {
    if (!video.duration) return;

    const progress = Math.min(video.currentTime / video.duration, 1);
    gsap.set(ring, { strokeDashoffset: CIRCUMFERENCE * (1 - progress) });
  }

  function setPlaying(isPlaying) {
    toggle.setAttribute('aria-label', `${isPlaying ? 'Pause' : 'Play'} ${label}`);
    toggle.setAttribute('aria-pressed', String(!isPlaying));

    playIcon.classList.toggle('hidden', isPlaying);
    pauseIcon.classList.toggle('hidden', !isPlaying);

    // Driven off GSAP's ticker rather than `timeupdate`, which only fires a
    // few times a second and makes the ring look choppy.
    if (isPlaying) {
      gsap.ticker.add(setProgress);
    } else {
      gsap.ticker.remove(setProgress);
      setProgress();
    }
  }

  function play() {
    // Autoplay can still be refused (data saver, low power mode) — fall back
    // to the paused state instead of showing a pause icon that does nothing.
    video.play().catch(() => setPlaying(false));
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function applyMotionPreference() {
    if (reducedMotion.matches) {
      video.pause();
      setPlaying(false);
    } else {
      setPlaying(true);
      play();
    }
  }

  reducedMotion.addEventListener('change', applyMotionPreference);

  toggle.addEventListener('click', () => (video.paused ? play() : video.pause()));

  video.addEventListener('play', () => setPlaying(true));
  video.addEventListener('pause', () => setPlaying(false));
  video.addEventListener('loadedmetadata', setProgress);
  // If the clip is ever removed the control should not linger.
  video.addEventListener('error', () => (toggle.hidden = true));

  applyMotionPreference();
}

function initVideoPlayers() {
  document.querySelectorAll('[data-video-player]').forEach((root) => {
    if (root.hasAttribute('data-video-player-init')) return;
    root.setAttribute('data-video-player-init', '');
    initVideoPlayer(root);
  });
}

/**
 * Header scroll behavior.
 * Hides on scroll down and reveals on scroll up.
 */
function initHeader() {
  const header = document.querySelector('[data-header]');
  if (!header) return;

  const move = gsap.quickTo(header, 'yPercent', {
    duration: 0.4,
    ease: 'power3.out',
  });

  let lastY = 0;
  let visible = true;

  function update(y) {
    if (y <= 0) {
      visible = true;
      move(0);
    } else if (Math.abs(y - lastY) > 4) {
      visible = y < lastY;
      move(visible ? 0 : -100);
    }

    header.toggleAttribute('data-scrolled', visible && y > 8);
    lastY = y;
  }

  const lenis = getLenis();

  if (lenis) {
    lenis.on('scroll', ({ scroll }) => update(scroll));
  } else {
    window.addEventListener(
      'scroll',
      () => update(window.scrollY),
      { passive: true }
    );
  }
}

/**
 * Mobile navigation.
 * Desktop navigation remains untouched.
 */
function initMobileNav() {
  const header = document.querySelector('[data-header]');
  const toggle = document.querySelector('[data-menu-toggle]');
  const panel = document.querySelector('[data-mobile-nav]');

  if (!header || !toggle || !panel) return;

  const desktop = window.matchMedia('(min-width: 992px)');
  const groups = Array.from(
    panel.querySelectorAll('[data-mobile-group]')
  );

  let isAnimating = false;
  let menuOpen = false;

  const links = panel.querySelectorAll('a');

  // Initial state
  gsap.set(links, {
    autoAlpha: 0,
    x: -24,
  });

  function setMenuState(open) {
    menuOpen = open;

    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');

    header.toggleAttribute('data-menu-open', open);
  }

  function resetSubmenus() {
    groups.forEach((group) => {
      const button = group.querySelector('[data-mobile-submenu-toggle]');
      const submenu = group.querySelector('[data-mobile-submenu]');

      button?.setAttribute('aria-expanded', 'false');
      submenu?.setAttribute('hidden', '');
    });
  }

  function openMenu() {
    if (menuOpen || isAnimating || desktop.matches) return;

    setMenuState(true);
    isAnimating = true;

    gsap.killTweensOf(links);

    gsap.fromTo(
      links,
      {
        autoAlpha: 0,
        x: -24,
      },
      {
        autoAlpha: 1,
        x: 0,
        duration: 0.5,
        ease: 'power2.out',
        stagger: {
          amount: 0.35,
          from: 'start',
        },
        onComplete: () => {
          isAnimating = false;
        },
      }
    );
  }

  function closeMenu() {
    if (!menuOpen || isAnimating) return;

    isAnimating = true;
    setMenuState(false);

    resetSubmenus();

    gsap.killTweensOf(links);

    gsap.to(links, {
      autoAlpha: 0,
      x: -24,
      duration: 0.3,
      ease: 'power2.in',
      stagger: {
        amount: 0.15,
        from: 'end',
      },
      onComplete: () => {
        isAnimating = false;
      },
    });
  }

  // Menu toggle
  toggle.addEventListener('click', () => {
    if (menuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close when desktop breakpoint is reached
  desktop.addEventListener('change', (event) => {
    if (event.matches) {
      gsap.killTweensOf(links);
      gsap.set(links, {
        clearProps: 'all',
      });

      setMenuState(false);
      resetSubmenus();
      isAnimating = false;
    }
  });

  // Close when scrolling
  const lenis = getLenis();

  if (lenis) {
    lenis.on('scroll', ({ scroll }) => {
      if (scroll > 4 && menuOpen) closeMenu();
    });
  } else {
    window.addEventListener(
      'scroll',
      () => {
        if (window.scrollY > 4 && menuOpen) closeMenu();
      },
      { passive: true }
    );
  }

  // Mobile submenu accordions
  groups.forEach((group) => {
    const button = group.querySelector('[data-mobile-submenu-toggle]');
    const submenu = group.querySelector('[data-mobile-submenu]');

    if (!button || !submenu) return;

    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';

      groups.forEach((other) => {
        if (other === group) return;

        other
          .querySelector('[data-mobile-submenu-toggle]')
          ?.setAttribute('aria-expanded', 'false');

        other
          .querySelector('[data-mobile-submenu]')
          ?.setAttribute('hidden', '');
      });

      button.setAttribute('aria-expanded', String(!expanded));

      if (expanded) {
        submenu.setAttribute('hidden', '');
      } else {
        submenu.removeAttribute('hidden');
      }
    });
  });

  // Optional global methods for external close/open handlers
  window.openMobileNav = openMenu;
  window.closeMobileNav = closeMenu;
}

/**
 * (2026-10-31) Header reveal animation — reusable.
 * 1. Header background fades in.
 * 2. Each nav link fades and slides in from left to right in a stagger.
 * Accepts a nav container; defaults to [data-nav]. Can be re-triggered
 * (e.g. on menu toggle) via window.playHeaderReveal.
 */
let headerRevealTL;

function playHeaderReveal(navEl, selector = 'a') {
  const header = document.querySelector('[data-header]');
  if (!header || !navEl) return;

  // Kill any in-flight reveal/close so fast re-triggers stay smooth.
  if (headerRevealTL) headerRevealTL.kill();

  const links = navEl.querySelectorAll(selector);

  // Ensure the header background is fully visible (no flicker on replay).
  gsap.set(header, { autoAlpha: 1 });
  // Reset links off-screen left and transparent before the stagger.
  gsap.set(links, { autoAlpha: 0, x: -24 });

  headerRevealTL = gsap.timeline();
  headerRevealTL
    .to(header, { autoAlpha: 1, duration: 0.6, ease: 'power2.out' })
    .to(
      links,
      {
        autoAlpha: 1,
        x: 0,
        duration: 0.6,
        ease: 'power2.out',
        stagger: { amount: 0.35, from: 'first' },
      },
      0
    );
}

/**
 * (2026-10-31) Header reveal close — animates the nav links out before the
 * panel closes, so the menu fades/slides out smoothly instead of
 * disappearing abruptly. The header itself stays visible.
 */
function playHeaderClose(navEl, onComplete) {
  const header = document.querySelector('[data-header]');
  if (!header || !navEl) { onComplete?.(); return; }

  if (headerRevealTL) headerRevealTL.kill();

  const links = navEl.querySelectorAll('a');

  headerRevealTL = gsap.timeline();
  headerRevealTL.to(
    links,
    {
      autoAlpha: 0,
      x: -24,
      duration: 0.4,
      ease: 'power2.in',
      stagger: { amount: 0.2, from: 'last' },
    }
  );

  headerRevealTL.eventCallback('onComplete', () => {
    headerRevealTL = null;
    onComplete?.();
  });
}


// Expose so inline handlers (e.g. Header.astro) can re-trigger the reveal.
window.playHeaderReveal = playHeaderReveal;

export function initAnimations() {
//   syncScrollTriggerWithLenis();
  initRevealAnimations();
  initVideoPlayers();
  initHeader();
  initMobileNav();
}
