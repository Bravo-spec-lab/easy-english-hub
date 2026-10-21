/**
 * EASY English Hub - Montaje del layout compartido (sidebar + topbar + lightbox)
 * Desarrollado por Bravo • Computación e Informática
 */

import { applyTheme, updateGlobalProgressUI, wireLightbox, stopAudio } from './common.js';

/**
 * Monta el shell común alrededor del contenido de la página.
 * Cada página declara:
 *   <template id="pageTemplate"> ... secciones de la vista ... </template>
 *   <div id="appRoot"></div>
 * @param {Object} cfg
 * @param {string} cfg.active     Clave de nav activa: dashboard|classroom|quizzes|vocabulary|gallery
 * @param {string} cfg.breadcrumb Texto del breadcrumb del topbar
 * @param {Function} [cfg.onLoad] Callback tras montar el layout (para lógica de la página)
 */
export async function mountPage({ active, breadcrumb, onLoad }) {
  const res = await fetch('partials/app-shell.html');
  if (!res.ok) {
    console.error('No se pudo cargar partials/app-shell.html:', res.status);
    return;
  }
  const shellHTML = await res.text();

  const tpl = document.getElementById('pageTemplate');
  const pageContent = tpl ? tpl.innerHTML : '<p>Error: la página no declaró pageTemplate.</p>';
  const shell = shellHTML.replace('<!--PAGE_CONTENT-->', pageContent);

  const root = document.getElementById('appRoot');
  if (!root) {
    console.error('La página no declaró <div id="appRoot">.');
    return;
  }
  root.outerHTML = shell;

  applyTheme(state.theme);
  updateGlobalProgressUI();
  wireLightbox();

  const breadcrumbEl = document.getElementById('breadcrumbViewName');
  if (breadcrumbEl && breadcrumb) breadcrumbEl.textContent = breadcrumb;

  document.querySelectorAll('.nav-item-btn').forEach(link => {
    link.classList.toggle('active', link.getAttribute('data-page') === active);
  });

  const sidebarToggleBtn = document.getElementById('sidebarToggleBtn');
  const appSidebar = document.getElementById('appSidebar');
  if (sidebarToggleBtn && appSidebar) {
    sidebarToggleBtn.addEventListener('click', () => {
      appSidebar.classList.toggle('mobile-open');
    });
  }

  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      applyTheme(state.theme === 'dark' ? 'light' : 'dark');
    });
  }

  const searchInput = document.getElementById('topbarSearchInput');
  if (searchInput) {
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const q = searchInput.value.trim();
        if (q) window.location.href = `vocabulario.html?q=${encodeURIComponent(q)}`;
      }
    });
  }

  window.addEventListener('beforeunload', () => stopAudio());

  if (onLoad) onLoad();
}
