/**
 * EASY English Hub - PÃ¡gina Dashboard
 * Desarrollado por Bravo â€¢ ComputaciÃ³n e InformÃ¡tica
 */

import { mountPage } from '../layout.js';
import { state, escapeHTML } from '../common.js';
import { COURSE_DATA } from '../data/index.js';

function renderDashboard() {
  const totalDays = 24;
  const completedCount = state.completedDays.length;

  const dashCompletedText = document.getElementById('dashCompletedText');
  const dashQuizzesText = document.getElementById('dashQuizzesText');
  const dashVocabText = document.getElementById('dashVocabText');
  const dashStreakText = document.getElementById('dashStreakText');
  const dashContinueTitle = document.getElementById('dashContinueTitle');
  const dashContinueSub = document.getElementById('dashContinueSub');
  const dashContinueBtn = document.getElementById('dashContinueBtn');
  const dashModulesGrid = document.getElementById('dashModulesGrid');

  if (dashCompletedText) dashCompletedText.textContent = `${completedCount} / ${totalDays}`;

  let answeredQuizzes = 0;
  for (let w = 1; w <= 4; w++) {
    for (let d = 1; d <= 6; d++) {
      if (state.quizState[`w${w}-d${d}-q1`]) answeredQuizzes++;
    }
  }
  if (dashQuizzesText) dashQuizzesText.textContent = `${answeredQuizzes} / ${totalDays}`;
  if (dashVocabText) dashVocabText.textContent = COURSE_DATA.masterVocabulary.length;
  if (dashStreakText) dashStreakText.textContent = completedCount > 0 ? `${completedCount} DÃ­as` : 'Comienza hoy';

  let nextWeek = 1;
  let nextDay = 1;
  let found = false;
  for (let w = 1; w <= 4; w++) {
    for (let d = 1; d <= 6; d++) {
      if (!state.completedDays.includes(`w${w}-d${d}`)) {
        nextWeek = w;
        nextDay = d;
        found = true;
        break;
      }
    }
    if (found) break;
  }

  const nextWeekData = COURSE_DATA.weeks.find(w => w.id === nextWeek);
  const nextDayData = nextWeekData ? nextWeekData.days.find(d => d.day === nextDay) : null;

  if (dashContinueTitle && nextDayData) {
    dashContinueTitle.textContent = `Semana ${nextWeek} â€¢ DÃ­a ${nextDay}: ${nextDayData.title}`;
  }
  if (dashContinueSub && nextDayData) {
    dashContinueSub.textContent = nextDayData.learningFocus || 'ContinÃºa con la siguiente lecciÃ³n guiada.';
  }
  if (dashContinueBtn) {
    dashContinueBtn.href = `aula.html?week=${nextWeek}&day=${nextDay}`;
  }

  if (dashModulesGrid) {
    dashModulesGrid.innerHTML = '';
    COURSE_DATA.weeks.forEach(w => {
      const completedInWeek = w.days.filter(d => state.completedDays.includes(`w${w.id}-d${d.day}`)).length;
      const pct = Math.round((completedInWeek / 6) * 100);

      const card = document.createElement('div');
      card.className = 'dash-module-card';
      card.innerHTML = `
        <div class="mod-header-row">
          <span class="mod-badge-pill">${w.badge}</span>
          <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600;"><i class="fa-solid fa-calendar-check"></i> ${completedInWeek}/6 DÃ­as</span>
        </div>
        <h4 class="mod-title">${w.title}</h4>
        <p class="mod-desc">${w.description}</p>
        <div class="mod-progress-box">
          <div class="mod-progress-labels">
            <span>Progreso del mÃ³dulo</span>
            <span>${pct}%</span>
          </div>
          <div class="mod-progress-track">
            <div class="mod-progress-fill" style="width: ${pct}%;"></div>
          </div>
        </div>
        <a class="btn-open-module" href="aula.html?week=${w.id}&day=1">
          <span>Abrir Lecciones</span> <i class="fa-solid fa-arrow-right"></i>
        </a>
      `;

      dashModulesGrid.appendChild(card);
    });
  }
}

mountPage({
  active: 'dashboard',
  breadcrumb: 'Dashboard / Inicio',
  onLoad: renderDashboard
});
