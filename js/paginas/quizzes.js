/**
 * EASY English Hub - Página Centro de Evaluaciones
 * Desarrollado por Bravo • Computación e Informática
 */

import { mountPage } from '../layout.js';
import { state, escapeHTML } from '../common.js';
import { COURSE_DATA } from '../data/index.js';

function renderQuizzesHub(filterWeek = 'all') {
  const grid = document.getElementById('quizzesCardsGrid');
  if (!grid) return;
  grid.innerHTML = '';

  COURSE_DATA.weeks.forEach(w => {
    if (filterWeek !== 'all' && w.id !== parseInt(filterWeek, 10)) return;

    w.days.forEach(d => {
      const qKey1 = `w${w.id}-d${d.day}-q1`;
      const hasStarted = !!state.quizState[qKey1];
      let score = 0;
      if (d.quiz && d.quiz.questions) {
        d.quiz.questions.forEach(q => {
          const userAns = state.quizState[`w${w.id}-d${d.day}-q${q.num}`];
          if (userAns && userAns === q.correctOption) score++;
        });
      }

      const card = document.createElement('div');
      card.className = 'quiz-hub-card';
      card.innerHTML = `
        <div class="quiz-hub-card-header">
          <span class="quiz-hub-badge">Semana ${w.id} • Día ${d.day}</span>
          <span class="quiz-hub-score ${score >= 4 ? 'passed' : ''}">
            ${hasStarted ? `<i class="fa-solid fa-star"></i> Puntaje: ${score}/5` : '<i class="fa-regular fa-clock"></i> Pendiente'}
          </span>
        </div>
        <h4>${escapeHTML(d.title)}</h4>
        <p>${escapeHTML(d.learningFocus || '5 preguntas de autoevaluación oficial.')}</p>
        <a class="btn-open-module" href="aula.html?week=${w.id}&day=${d.day}&tab=quiz">
          <span>${hasStarted ? 'Revisar / Reintentar' : 'Iniciar Evaluación'}</span> <i class="fa-solid fa-arrow-right"></i>
        </a>
        <a class="btn-open-module" href="aula.html?week=${w.id}&day=${d.day}&tab=challenge" style="margin-top: 0.6rem; opacity: 0.85;">
          <span><i class="fa-solid fa-stopwatch"></i> Reto Cronometrado (90s)</span>
        </a>
      `;

      grid.appendChild(card);
    });
  });
}

mountPage({
  active: 'quizzes',
  breadcrumb: 'Centro de Evaluaciones & Quizzes',
  onLoad: () => {
    renderQuizzesHub();

    const filterBar = document.getElementById('quizzesFilterBar');
    if (filterBar) {
      filterBar.querySelectorAll('.btn-filter-pill').forEach(btn => {
        btn.addEventListener('click', () => {
          filterBar.querySelectorAll('.btn-filter-pill').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          renderQuizzesHub(btn.getAttribute('data-filter'));
        });
      });
    }
  }
});
