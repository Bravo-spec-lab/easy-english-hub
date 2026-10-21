/**
 * EASY English Hub - Página Galería de Infografías
 * Desarrollado por Bravo • Computación e Informática
 */

import { mountPage } from '../layout.js';
import { escapeHTML, openLightbox } from '../common.js';
import { COURSE_DATA } from '../data/index.js';

function renderGalleryHub() {
  const grid = document.getElementById('galleryCardsGrid');
  if (!grid) return;
  grid.innerHTML = '';

  const seenPosters = new Set();

  COURSE_DATA.weeks.forEach(w => {
    w.days.forEach(d => {
      if (!d.posterUrl) return;

      // Si varios días comparten el mismo afiche (como el afiche general), se muestra una sola tarjeta representativa
      if (seenPosters.has(d.posterUrl)) return;
      seenPosters.add(d.posterUrl);

      const isGeneral = d.posterUrl.includes('afiche_general');
      const tagText = isGeneral ? `Semana ${w.id} • Infografía General` : `Semana ${w.id} • Día ${d.day}`;
      const cardTitle = isGeneral ? `Afiche General: ${escapeHTML(w.title || d.title)}` : escapeHTML(d.title);

      const card = document.createElement('div');
      card.className = 'gallery-card';
      card.innerHTML = `
        <div class="gallery-thumb-container">
          ${d.posterType === 'pdf' ? `
            <div class="gallery-pdf-placeholder">
              <i class="fa-solid fa-file-pdf"></i>
              <span>Infografía Oficial en PDF</span>
            </div>
          ` : `
            <img src="${d.posterUrl}" class="gallery-thumb-img" alt="${cardTitle}" loading="lazy">
          `}
        </div>
        <div class="gallery-card-body">
          <span class="gallery-card-tag">${tagText}</span>
          <h4 class="gallery-card-title">${cardTitle}</h4>
        </div>
      `;

      card.addEventListener('click', () => {
        openLightbox(d.posterUrl, d.posterType);
      });

      grid.appendChild(card);
    });
  });
}

mountPage({
  active: 'gallery',
  breadcrumb: 'Galería de Infografías & Afiches',
  onLoad: renderGalleryHub
});
