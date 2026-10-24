
import { initAnimations } from './animations.js';

const USE_LENIS = false;

function init() {
//   initTheme();
//   if (USE_LENIS) initLenis();

  initAnimations();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
