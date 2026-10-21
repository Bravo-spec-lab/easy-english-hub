/**
 * EASY English Hub - Página Laboratorio de Vocabulario & Verbos
 * Desarrollado por Bravo • Computación e Informática
 */

import { mountPage } from '../layout.js';
import { escapeHTML, speakText } from '../common.js';
import { COURSE_DATA } from '../data/index.js';

let currentVocabFilter = 'all';

function renderVocabularyHub() {
  const grid = document.getElementById('vocabCardsGrid');
  const searchInput = document.getElementById('vocabSearchInput');
  if (!grid) return;
  grid.innerHTML = '';

  const query = (searchInput ? searchInput.value : '').trim().toLowerCase();
  const items = COURSE_DATA.masterVocabulary || [];

  const filtered = items.filter(it => {
    const matchCat = currentVocabFilter === 'all' || it.category === currentVocabFilter;
    const matchQuery = !query || it.term.toLowerCase().includes(query) || it.category.toLowerCase().includes(query);
    return matchCat && matchQuery;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 3rem;">
        <i class="fa-solid fa-book-open" style="font-size: 2.5rem; margin-bottom: 0.8rem; display: block;"></i>
        No se encontraron términos para los filtros seleccionados.
      </div>
    `;
    return;
  }

  filtered.forEach(it => {
    const card = document.createElement('div');
    card.className = 'flashcard-item';
    card.innerHTML = `
      <div class="flashcard-top">
        <span class="flashcard-cat-badge">${escapeHTML(it.category)}</span>
        <button type="button" class="btn-icon-action" style="width: 30px; height: 30px; font-size: 0.8rem;" title="Escuchar pronunciación">
          <i class="fa-solid fa-volume-high"></i>
        </button>
      </div>
      <div class="flashcard-term">${escapeHTML(it.term)}</div>
      <div class="flashcard-origin">Semana ${it.week} • Día ${it.day}</div>
    `;

    card.addEventListener('click', () => {
      speakText(it.term.split('–')[0].split('→')[0].split('=')[0].trim());
    });

    grid.appendChild(card);
  });
}

mountPage({
  active: 'vocabulary',
  breadcrumb: 'Laboratorio de Vocabulario & Verbos',
  onLoad: () => {
    // Búsqueda proveniente del topbar: vocabulario.html?q=...
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    const searchInput = document.getElementById('vocabSearchInput');
    if (q && searchInput) searchInput.value = q;

    renderVocabularyHub();

    const filters = document.getElementById('vocabCategoryFilters');
    if (filters) {
      filters.querySelectorAll('.btn-filter-pill').forEach(btn => {
        btn.addEventListener('click', () => {
          filters.querySelectorAll('.btn-filter-pill').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          currentVocabFilter = btn.getAttribute('data-cat');
          renderVocabularyHub();
        });
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', renderVocabularyHub);
    }
  }
});
