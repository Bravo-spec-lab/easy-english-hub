/**
 * EASY English Hub - Página Aula Virtual (7 stages por día)
 * Desarrollado por Bravo • Computación e Informática
 */

import { mountPage } from '../layout.js';
import {
  state, escapeHTML, showToast, openLightbox,
  speakText, startSpeech, stopAudio, updateAudioUI
} from '../common.js';
import { COURSE_DATA, getWeek, getDay } from '../data/index.js';
import { THEORIES } from '../data/theories.js';
import { CHALLENGE_BANK } from '../data/challenge-bank.js';
import { OPEN_ANSWER_KEYS } from '../data/open-answer-keys.js';

// --- Parámetros de la URL: aula.html?week=1&day=2&tab=quiz ---
const params = new URLSearchParams(window.location.search);
let currentWeekId = parseInt(params.get('week'), 10) || 1;
let currentDayNum = parseInt(params.get('day'), 10) || 1;
let currentTab = params.get('tab') || 'theory';

// --- DOM cache (lazy: se llena tras montar el shell, porque el contenido vive en <template>) ---
let DOM = null;

function initDomCache() {
  DOM = {
  theoryContainer: document.getElementById('theoryContainer'),
  challengeContainer: document.getElementById('challengeContainer'),
  syllabusAccordion: document.getElementById('syllabusAccordion'),
  stageWeekBadge: document.getElementById('stageWeekBadge'),
  stageLessonTitle: document.getElementById('stageLessonTitle'),
  stageFocusTag: document.getElementById('stageFocusTag'),
  stageCompleteBtn: document.getElementById('stageCompleteBtn'),
  stageTabBtns: document.querySelectorAll('.stage-tab-btn'),
  stagePanels: document.querySelectorAll('.stage-panel'),
  readingTextCard: document.getElementById('readingTextCard'),
  grammarCardBody: document.getElementById('grammarCardBody'),
  vocabWidgetTitle: document.getElementById('vocabWidgetTitle'),
  vocabChipsWrap: document.getElementById('vocabChipsWrap'),
  afterReadingList: document.getElementById('afterReadingList'),
  audioPlayBtn: document.getElementById('audioPlayBtn'),
  audioStopBtn: document.getElementById('audioStopBtn'),
  audioSpeedSelect: document.getElementById('audioSpeedSelect'),
  audioStatusLabel: document.getElementById('audioStatusLabel'),
  worksheetSectionsWrap: document.getElementById('worksheetSectionsWrap'),
  saveWorksheetBtn: document.getElementById('saveWorksheetBtn'),
  quizScorePill: document.getElementById('quizScorePill'),
  quizQuestionsWrap: document.getElementById('quizQuestionsWrap'),
  masterAnswerHeader: document.getElementById('masterAnswerHeader'),
  masterAnswerBody: document.getElementById('masterAnswerBody'),
  masterAnswerIcon: document.getElementById('masterAnswerIcon'),
  slideCounterBadge: document.getElementById('slideCounterBadge'),
  slidePrevBtn: document.getElementById('slidePrevBtn'),
  slideNextBtn: document.getElementById('slideNextBtn'),
  slideStageCanvas: document.getElementById('slideStageCanvas'),
  resourcesContainer: document.getElementById('resourcesContainer'),
  posterMediaWrap: document.getElementById('posterMediaWrap'),
  posterFullBtn: document.getElementById('posterFullBtn'),
  prevLessonBtn: document.getElementById('prevLessonBtn'),
  nextLessonBtn: document.getElementById('nextLessonBtn')
  };
  DOM.stageTabBtns = document.querySelectorAll('.stage-tab-btn');
  DOM.stagePanels = document.querySelectorAll('.stage-panel');
}

// --- Navegación entre días (URL real) ---
function goToDay(weekId, dayNum, tab) {
  const t = tab || currentTab;
  window.location.href = `aula.html?week=${weekId}&day=${dayNum}&tab=${t}`;
}

function updateBreadcrumb() {
  const el = document.getElementById('breadcrumbViewName');
  if (el) el.textContent = `Aula Virtual / Semana ${currentWeekId} - Día ${currentDayNum}`;
}

// =========================================================================
// Render principal del aula
// =========================================================================
function renderClassroom(weekId, dayNum) {
  const week = getWeek(weekId);
  if (!week) return;
  const day = getDay(weekId, dayNum);
  if (!day) return;

  DOM.stageWeekBadge.textContent = week.badge;
  DOM.stageLessonTitle.textContent = day.title;
  DOM.stageFocusTag.innerHTML = `<i class="fa-solid fa-bullseye"></i> ${day.learningFocus || 'Enfoque práctico de aprendizaje'}`;

  updateLessonCompletionButton(weekId, dayNum);
  renderSyllabusTree(weekId, dayNum);
  renderTheoryStage(weekId, dayNum);
  renderReadingStage(day);
  renderWorksheetStage(weekId, dayNum, day);
  renderQuizStage(weekId, dayNum, day);
  renderChallengeStage(weekId, dayNum);
  renderSlidesStage(week);
  renderResourcesStage(day);
  renderPosterStage(day);
  setupStageNavButtons(weekId, dayNum);
  switchClassroomTab(currentTab);
  updateBreadcrumb();
}

function renderTheoryStage(weekId, dayNum) {
  if (!DOM.theoryContainer) return;
  const html = THEORIES[`w${weekId}-d${dayNum}`];
  DOM.theoryContainer.innerHTML = html || `
    <div class="theory-block">
      <p>La teoría de esta lección no está disponible todavía. Completa la lectura asistida y la autoevaluación del día.</p>
    </div>`;
}

function renderSyllabusTree(currentWeekId, currentDayNum) {
  if (!DOM.syllabusAccordion) return;
  DOM.syllabusAccordion.innerHTML = '';

  COURSE_DATA.weeks.forEach(w => {
    const isWeekCurrent = w.id === currentWeekId;
    const completedCount = w.days.filter(d => state.completedDays.includes(`w${w.id}-d${d.day}`)).length;

    const weekItem = document.createElement('div');
    weekItem.className = 'syllabus-week-item';
    weekItem.innerHTML = `
      <button type="button" class="syllabus-week-btn">
        <span>Semana ${w.id}: ${w.title}</span>
        <span style="font-size: 0.72rem; color: var(--text-muted);">${completedCount}/6</span>
      </button>
      <div class="syllabus-days-list" style="display: ${isWeekCurrent ? 'flex' : 'none'};">
        ${w.days.map(d => {
          const isDayCurrent = isWeekCurrent && d.day === currentDayNum;
          const isDone = state.completedDays.includes(`w${w.id}-d${d.day}`);
          return `
            <a class="syllabus-day-link ${isDayCurrent ? 'active' : ''} ${isDone ? 'completed' : ''}"
               href="aula.html?week=${w.id}&day=${d.day}&tab=${currentTab}">
              <i class="fa-solid ${isDone ? 'fa-circle-check' : 'fa-circle'} syllabus-check-icon"></i>
              <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Día ${d.day}: ${d.title}</span>
            </a>
          `;
        }).join('')}
      </div>
    `;

    const btn = weekItem.querySelector('.syllabus-week-btn');
    const list = weekItem.querySelector('.syllabus-days-list');
    btn.addEventListener('click', () => {
      list.style.display = list.style.display === 'none' ? 'flex' : 'none';
    });

    DOM.syllabusAccordion.appendChild(weekItem);
  });
}

// =========================================================================
// Stage 1: Lectura Asistida
// =========================================================================
function renderReadingStage(day) {
  DOM.readingTextCard.innerHTML = '';
  const paragraphs = (day.readingText || '').split('\n\n').filter(p => p.trim());
  if (paragraphs.length > 0) {
    paragraphs.forEach(para => {
      const p = document.createElement('p');
      p.textContent = para;
      DOM.readingTextCard.appendChild(p);
    });
  } else {
    DOM.readingTextCard.innerHTML = '<p>El material de lectura se encuentra listo para estudio interactivo.</p>';
  }

  DOM.grammarCardBody.innerHTML = day.grammarFocus ? `<p>${escapeHTML(day.grammarFocus)}</p>` : '<p>Revisión práctica y aplicación técnica.</p>';

  DOM.vocabWidgetTitle.innerHTML = `<i class="fa-solid fa-lightbulb"></i> ${escapeHTML(day.vocabCategory || 'Vocabulario Clave')}`;
  DOM.vocabChipsWrap.innerHTML = '';

  if (day.keyVocabulary && day.keyVocabulary.length > 0) {
    day.keyVocabulary.forEach(term => {
      const chip = document.createElement('span');
      chip.className = 'vocab-chip';
      chip.title = 'Haz clic para escuchar la pronunciación en inglés';
      chip.innerHTML = `<i class="fa-solid fa-volume-high" style="font-size: 0.72rem;"></i> ${escapeHTML(term)}`;
      chip.addEventListener('click', () => {
        speakText(term.split('–')[0].split('→')[0].split('=')[0].trim());
      });
      DOM.vocabChipsWrap.appendChild(chip);
    });
  } else {
    DOM.vocabChipsWrap.innerHTML = '<span style="font-size: 0.8rem; color: var(--text-muted);">Revisa las expresiones en la lectura.</span>';
  }

  DOM.afterReadingList.innerHTML = '';
  if (day.afterReading && day.afterReading.length > 0) {
    day.afterReading.forEach(task => {
      const li = document.createElement('li');
      li.textContent = task;
      DOM.afterReadingList.appendChild(li);
    });
  } else {
    DOM.afterReadingList.innerHTML = '<li>Identifica los conceptos clave y resuelve la autoevaluación.</li>';
  }
}

// =========================================================================
// Stage 2: Ficha Práctica
// =========================================================================
function renderWorksheetStage(weekId, dayNum, day) {
  DOM.worksheetSectionsWrap.innerHTML = '';
  const storageKeyPrefix = `w${weekId}-d${dayNum}`;

  if (!day.worksheetSections || day.worksheetSections.length === 0) {
    DOM.worksheetSectionsWrap.innerHTML = `
      <div class="worksheet-section-card">
        <h4 class="worksheet-sec-title"><i class="fa-solid fa-pen-to-square"></i> Ficha de Práctica</h4>
        <p style="color: var(--text-secondary);">Esta lección cuenta con práctica interactiva en las pestañas de Lectura y Autoevaluación.</p>
      </div>
    `;
    return;
  }

  day.worksheetSections.forEach((sec, sIdx) => {
    const card = document.createElement('div');
    card.className = 'worksheet-section-card';

    let itemsHTML = '';
    sec.items.forEach((item, iIdx) => {
      const inputKey = `${storageKeyPrefix}-s${sIdx}-i${iIdx}`;
      const savedVal = state.worksheetData[inputKey] || '';

      itemsHTML += `
        <div class="worksheet-item">
          <label class="worksheet-item-prompt">${escapeHTML(item)}</label>
          <input type="text" class="worksheet-input" data-key="${inputKey}" value="${escapeHTML(savedVal)}" placeholder="Escribe tu respuesta aquí...">
        </div>
      `;
    });

    card.innerHTML = `
      <h4 class="worksheet-sec-title"><i class="fa-solid fa-circle-check"></i> ${escapeHTML(sec.title)}</h4>
      <div class="worksheet-items-list">${itemsHTML}</div>
    `;

    DOM.worksheetSectionsWrap.appendChild(card);
  });
}

// =========================================================================
// Stage 3: Autoevaluación (Quiz)
// =========================================================================
let challengeTimerId = null;
const CHALLENGE_TIME_PER_Q = 30;

function getChallengeScores() {
  try {
    return JSON.parse(localStorage.getItem('easy_challenge_scores')) || {};
  } catch {
    return {};
  }
}

function saveChallengeScore(dayKey, score, total) {
  const scores = getChallengeScores();
  const prev = scores[dayKey] || { best: -1, tries: 0 };
  scores[dayKey] = { best: Math.max(prev.best, score), tries: prev.tries + 1 };
  localStorage.setItem('easy_challenge_scores', JSON.stringify(scores));
}

function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function renderChallengeStage(weekId, dayNum) {
  if (!DOM.challengeContainer) return;
  if (challengeTimerId) { clearInterval(challengeTimerId); challengeTimerId = null; }

  const dayKey = `w${weekId}-d${dayNum}`;
  const day = getDay(weekId, dayNum);
  const quiz = (day && day.quiz) || { questions: [] };
  const bodyValid = q =>
    q.type === 'multiple_choice' &&
    Array.isArray(q.options) && q.options.length >= 2 &&
    q.correctOption && q.options.some(o => o.key === q.correctOption);

  let pool = (quiz.questions || []).filter(bodyValid);
  if (pool.length < 3) {
    pool = [...pool, ...(CHALLENGE_BANK[dayKey] || []).filter(bodyValid)];
  }

  if (pool.length === 0) {
    DOM.challengeContainer.innerHTML = `
      <div class="challenge-block" style="text-align: center; padding: 2.5rem 1rem;">
        <i class="fa-solid fa-circle-info" style="font-size: 2.2rem; color: var(--primary-500); margin-bottom: 1rem; display: block;"></i>
        <h3 style="font-family: var(--font-heading); margin-bottom: 0.6rem;">Este día usa preguntas de producción abierta</h3>
        <p style="color: var(--text-secondary); font-size: 0.92rem; line-height: 1.7; margin-bottom: 1.2rem;">
          El día ${dayNum} es de diagnóstico: sus preguntas se responden escribiendo, no eligiendo opciones, así que el reto cronometrado no aplica aquí. Te recomendamos rendir la autoevaluación oficial del día.
        </p>
        <button type="button" class="btn-primary-action" id="challengeGoQuizBtn">
          <i class="fa-solid fa-circle-question"></i> Ir a la Autoevaluación
        </button>
      </div>
    `;
    const goBtn = document.getElementById('challengeGoQuizBtn');
    if (goBtn) goBtn.addEventListener('click', () => switchClassroomTab('quiz'));
    return;
  }

  const count = Math.min(3, pool.length);
  const picked = shuffleArray(pool).slice(0, count);
  const scores = getChallengeScores();
  const rec = scores[dayKey];
  const totalSeconds = CHALLENGE_TIME_PER_Q * count;

  DOM.challengeContainer.innerHTML = `
    <div class="challenge-intro">
      <div class="challenge-intro-badge"><i class="fa-solid fa-stopwatch"></i> ${count} preguntas • ${CHALLENGE_TIME_PER_Q}s por pregunta • ${totalSeconds}s totales</div>
      <h3 class="challenge-intro-title">Reto Cronometrado</h3>
      <p class="challenge-intro-sub">
        ${picked === pool.slice(0, 3) ? '' : ''}Se sortean ${count} preguntas del banco oficial del día cada vez que juegas. Tienes 30 segundos para responder cada una; si el tiempo se agota, pasa a la siguiente. Tu mejor marca queda guardada.
      </p>
      ${rec ? `<div class="challenge-best-score"><i class="fa-solid fa-trophy"></i> Tu mejor marca: <strong>${rec.best} / ${count}</strong> (${rec.tries} intento${rec.tries === 1 ? '' : 's'})</div>` : ''}
      <button type="button" class="btn-primary-action" id="challengeStartBtn" style="margin-top: 1.2rem;">
        <i class="fa-solid fa-play"></i> Comenzar el Reto
      </button>
    </div>
  `;

  const startBtn = document.getElementById('challengeStartBtn');
  if (startBtn) startBtn.addEventListener('click', () => runChallenge(dayKey, picked));
}

function runChallenge(dayKey, picked) {
  if (!DOM.challengeContainer) return;
  let idx = 0;
  let score = 0;
  let timeLeft = CHALLENGE_TIME_PER_Q;
  let results = [];

  showQuestion();

  function showQuestion() {
    const q = picked[idx];
    timeLeft = CHALLENGE_TIME_PER_Q;
    let locked = false;

    DOM.challengeContainer.innerHTML = `
      <div class="challenge-question-wrap">
        <div class="challenge-topbar">
          <span class="challenge-progress">Pregunta <strong>${idx + 1} / ${picked.length}</strong></span>
          <span class="challenge-timer" id="challengeTimer">${timeLeft}s</span>
        </div>
        <div class="challenge-timer-bar"><span class="challenge-fill" id="challengeFill" style="width: 100%;"></span></div>
        <div class="question-card" style="margin-top: 1.2rem;">
          <div class="question-header">
            <div class="q-num-badge">${q.num}</div>
            <div class="q-text">${escapeHTML(q.question)}</div>
          </div>
          <div class="options-grid">
            ${q.options.map(opt => `
              <button type="button" class="option-btn" data-key="${escapeHTML(opt.key)}">
                <span class="option-key">${escapeHTML(opt.key)})</span>
                <span>${escapeHTML(opt.text)}</span>
              </button>
            `).join('')}
          </div>
          <div class="q-feedback-box" id="challengeFeedback">
            <div class="feedback-bubble"></div>
          </div>
          <div style="text-align: center; margin-top: 1rem;">
            <button type="button" class="btn-primary-action" id="challengeNextBtn" style="display: none;">
              ${idx + 1 < picked.length ? 'Siguiente pregunta <i class="fa-solid fa-arrow-right"></i>' : 'Ver resultados <i class="fa-solid fa-flag-checkered"></i>'}
            </button>
          </div>
        </div>
      </div>
    `;

    DOM.challengeContainer.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', () => answer(btn.getAttribute('data-key'), btn, q));
    });

    if (challengeTimerId) clearInterval(challengeTimerId);
    challengeTimerId = setInterval(() => {
      if (!DOM.challengeContainer) return;
      const panel = document.getElementById('stagePanel_challenge');
      if (panel && !panel.classList.contains('active')) return;
      timeLeft--;
      const timerEl = document.getElementById('challengeTimer');
      const fillEl = document.getElementById('challengeFill');
      if (!timerEl) { clearInterval(challengeTimerId); challengeTimerId = null; return; }
      timerEl.textContent = `${Math.max(0, timeLeft)}s`;
      if (timeLeft <= 10) {
        timerEl.classList.add('urgent');
        fillEl.classList.add('urgent');
      }
      fillEl.style.width = `${Math.max(0, (timeLeft / CHALLENGE_TIME_PER_Q) * 100)}%`;
      if (timeLeft <= 0) {
        clearInterval(challengeTimerId);
        challengeTimerId = null;
        answer(null, null, q);
      }
    }, 1000);

    const nextBtn = document.getElementById('challengeNextBtn');
    if (nextBtn) nextBtn.addEventListener('click', () => {
      idx++;
      if (idx < picked.length) showQuestion();
      else finishChallenge();
    });
  }

  function answer(optKey, btn, q) {
    if (optKey !== null) {
      if (challengeTimerId) {
        clearInterval(challengeTimerId);
        challengeTimerId = null;
      }
    }

    const btns = DOM.challengeContainer.querySelectorAll('.option-btn');
    btns.forEach(b => {
      b.disabled = true;
      if (b.getAttribute('data-key') === q.correctOption) b.classList.add('correct');
      else if (optKey !== null && b.getAttribute('data-key') === optKey) b.classList.add('incorrect');
    });

    const isTimeout = optKey === null;
    const isCorrect = optKey === q.correctOption;
    if (isCorrect) score++;
    results.push({ q, user: optKey, correct: isCorrect, timeout: isTimeout });

    const fb = document.getElementById('challengeFeedback');
    const bubble = fb ? fb.querySelector('.feedback-bubble') : null;
    if (bubble) {
      fb.classList.add('active');
      bubble.innerHTML = isTimeout
        ? `<strong><i class="fa-regular fa-clock"></i> Tiempo agotado.</strong> La respuesta correcta era ${escapeHTML(q.correctOption)}. ${escapeHTML(q.answerKey || '')}`
        : isCorrect
          ? `<strong><i class="fa-solid fa-circle-check" style="color: #22c55e;"></i> ¡Correcto!</strong> ${escapeHTML(q.answerKey || '')}`
          : `<strong><i class="fa-solid fa-circle-xmark" style="color: #ef4444;"></i> Incorrecto.</strong> La respuesta correcta era ${escapeHTML(q.correctOption)}. ${escapeHTML(q.answerKey || '')}`;
    }

    const nextBtn = document.getElementById('challengeNextBtn');
    if (nextBtn) nextBtn.style.display = 'inline-flex';
  }

  function finishChallenge() {
    if (challengeTimerId) { clearInterval(challengeTimerId); challengeTimerId = null; }
    saveChallengeScore(dayKey, score, picked.length);
    const total = picked.length;
    const message = score === total
      ? '¡Nivel de maestro! Dominas este día sin miedo al reloj.'
      : score >= Math.ceil(total / 2)
        ? 'Buen trabajo. Repasa las explicaciones de las que fallaste y vuelve a intentarlo.'
        : 'No te desanimes: la presión del reloj es una habilidad que se entrena. Revisa la teoría y reintenta.';

    DOM.challengeContainer.innerHTML = `
      <div class="challenge-result-wrap">
        <div class="challenge-result-score">
          <span class="challenge-result-number">${score} / ${total}</span>
          <span class="challenge-result-label"><i class="fa-solid fa-medal"></i> Resultado</span>
        </div>
        <p class="challenge-result-msg">${message}</p>
        <div class="challenge-review">
          <h4><i class="fa-solid fa-clipboard-list"></i> Detalle de tus respuestas:</h4>
          ${results.map((r, i) => `
            <div class="challenge-review-row ${r.correct ? 'ok' : (r.timeout ? 'timeout' : 'bad')}">
              <strong>${i + 1}.</strong>
              <span>${escapeHTML(r.q.question)}</span>
              <span class="challenge-review-ver">
                ${r.timeout ? '<i class="fa-regular fa-clock"></i> Tiempo agotado' : (r.correct ? '<i class="fa-solid fa-circle-check"></i> Correcto' : `<i class="fa-solid fa-circle-xmark"></i> Dijiste ${escapeHTML(r.user)} – correcto era ${escapeHTML(r.q.correctOption)}`)}
              </span>
            </div>
          `).join('')}
        </div>
        <div style="text-align: center; margin-top: 1.5rem; display: flex; gap: 0.8rem; justify-content: center; flex-wrap: wrap;">
          <button type="button" class="btn-primary-action" id="challengeRetryBtn"><i class="fa-solid fa-rotate-right"></i> Reintentar (nuevas preguntas)</button>
          <button type="button" class="btn-stage-nav" id="challengeBackBtn"><i class="fa-solid fa-graduation-cap"></i> Volver al inicio del reto</button>
        </div>
      </div>
    `;

    document.getElementById('challengeRetryBtn').addEventListener('click', () => {
      renderChallengeStage(currentWeekId, currentDayNum);
    });
    document.getElementById('challengeBackBtn').addEventListener('click', () => {
      renderChallengeStage(currentWeekId, currentDayNum);
    });
  }
}

function renderQuizStage(weekId, dayNum, day) {
  DOM.quizQuestionsWrap.innerHTML = '';
  const dayKey = `w${weekId}-d${dayNum}`;
  const quiz = day.quiz || { questions: [] };
  const graded = state.quizState[`${dayKey}-graded`] === '1';
  const totalQ = quiz.questions.length;

  // Las claves oficiales solo se revelan al calificar
  if (graded) {
    DOM.masterAnswerBody.innerHTML = `
      <div style="background: var(--bg-surface); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
        <strong style="color: var(--primary-500); display: block; margin-bottom: 0.6rem;"><i class="fa-solid fa-key"></i> Claves Oficiales y Explicación:</strong>
        ${quiz.questions.map(q => `<div style="margin-bottom: 0.35rem;"><strong>${q.num}.</strong> ${escapeHTML(q.answerKey || (OPEN_ANSWER_KEYS[dayKey] || [])[q.num - 1] || 'Respuesta guiada')}</div>`).join('')}
        ${quiz.generalExplanation ? `<div style="margin-top: 0.8rem; padding-top: 0.8rem; border-top: 1px solid var(--border-color); font-style: italic;">${escapeHTML(quiz.generalExplanation)}</div>` : ''}
      </div>
    `;
  } else {
    DOM.masterAnswerBody.innerHTML = `
      <div style="background: var(--bg-surface); padding: 1.25rem; border-radius: var(--radius-md); border: 1px dashed var(--border-color); text-align: center;">
        <i class="fa-solid fa-lock" style="color: var(--text-muted);"></i>
        <span style="color: var(--text-secondary); font-size: 0.9rem;"> Las respuestas correctas se mostrarán cuando termines y califiques tu test.</span>
      </div>
    `;
  }

  const openModels = OPEN_ANSWER_KEYS[dayKey] || [];
  let correctCount = 0;

  quiz.questions.forEach(q => {
    const qKey = `${dayKey}-q${q.num}`;
    const userSelected = state.quizState[qKey] || null;
    const selfMark = state.quizState[`${qKey}-mark`] || null;
    const isMCQ = Array.isArray(q.options) && q.options.length > 0;

    if (graded) {
      if (isMCQ && userSelected === q.correctOption) correctCount++;
      if (!isMCQ && selfMark === 'ok') correctCount++;
    }

    const card = document.createElement('div');
    card.className = 'question-card';

    let optionsHTML = '';
    if (isMCQ) {
      optionsHTML = `
        <div class="options-grid">
          ${q.options.map(opt => {
            let optClass = 'option-btn';
            if (!graded) {
              if (opt.key === userSelected) optClass += ' selected';
            } else {
              if (opt.key === q.correctOption) optClass += ' correct';
              else if (opt.key === userSelected) optClass += ' incorrect';
            }
            return `
              <button type="button" class="${optClass}" data-key="${opt.key}" ${graded ? 'disabled' : ''}>
                <span class="option-key">${opt.key})</span>
                <span>${escapeHTML(opt.text)}</span>
              </button>
            `;
          }).join('')}
        </div>
      `;
    } else {
      const modelText = openModels[q.num - 1] || 'Respuesta guiada';
      const comparisonHTML = graded ? `
        <div class="open-review">
          <div class="open-review-row model">
            <i class="fa-solid fa-key"></i>
            <div>${escapeHTML(modelText)}</div>
          </div>
          <div class="open-review-row user">
            <i class="fa-solid fa-user-pen"></i>
            <div>${escapeHTML(userSelected || '(sin respuesta)')}</div>
          </div>
          <div class="open-selfmark">
            <span style="font-size: 0.8rem; color: var(--text-secondary);">¿Tu respuesta es correcta comparable al modelo?</span>
            <button type="button" class="btn-selfmark ok ${selfMark === 'ok' ? 'active' : ''}" data-value="ok">
              <i class="fa-solid fa-check"></i> Correcta
            </button>
            <button type="button" class="btn-selfmark bad ${selfMark === 'bad' ? 'active' : ''}" data-value="bad">
              <i class="fa-solid fa-xmark"></i> Repasar
            </button>
          </div>
        </div>
      ` : '';
      optionsHTML = `
        <div style="padding-left: 2.5rem;">
          <input type="text" class="worksheet-input" style="max-width: 450px;" placeholder="Escribe tu respuesta..." value="${escapeHTML(userSelected || '')}" data-openkey="${qKey}" ${graded ? 'disabled' : ''}>
        </div>
        ${comparisonHTML}
      `;
    }

    const showFeedback = true;
    card.innerHTML = `
      <div class="question-header">
        <div class="q-num-badge">${q.num}</div>
        <div class="q-text">${escapeHTML(q.question)}</div>
      </div>
      ${optionsHTML}
      ${graded ? `
      <div class="q-feedback-box active">
        <div class="feedback-bubble">
          <strong><i class="fa-solid fa-circle-info"></i> Explicación:</strong> ${escapeHTML(q.answerKey || openModels[q.num - 1] || 'Respuesta guiada')}
        </div>
      </div>` : ''}
    `;

    card.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.quizState[qKey] = btn.getAttribute('data-key');
        localStorage.setItem('easy_quiz_state', JSON.stringify(state.quizState));
        renderQuizStage(weekId, dayNum, day);
        updateGradeButtonState(dayKey);
      });
    });

    card.querySelectorAll('[data-openkey]').forEach(input => {
      input.addEventListener('change', () => {
        state.quizState[input.getAttribute('data-openkey')] = input.value;
        localStorage.setItem('easy_quiz_state', JSON.stringify(state.quizState));
      });
      input.addEventListener('input', updateGradeButtonState.bind(null, dayKey));
    });

    card.querySelectorAll('.btn-selfmark').forEach(btn => {
      btn.addEventListener('click', () => {
        const markKey = `${qKey}-mark`;
        const val = btn.getAttribute('data-value');
        state.quizState[markKey] = val;
        localStorage.setItem('easy_quiz_state', JSON.stringify(state.quizState));
        renderQuizStage(weekId, dayNum, day);
      });
    });

    DOM.quizQuestionsWrap.appendChild(card);
  });

  // Píldora de puntaje: pendiente hasta calificar
  DOM.quizScorePill.textContent = graded ? `${correctCount} / ${totalQ}` : `Sin calificar (${totalQ} preguntas)`;
  DOM.masterAnswerBody.classList.remove('active');
  DOM.masterAnswerIcon.className = graded ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down';
  if (graded) DOM.masterAnswerBody.classList.add('active');

  const anyAnswer = quiz.questions.some(q => {
    const qKey = `${dayKey}-q${q.num}`;
    const isMCQ = Array.isArray(q.options) && q.options.length > 0;
    if (isMCQ) return !!state.quizState[qKey];
    const input = DOM.quizQuestionsWrap.querySelector(`[data-openkey="${qKey}"]`);
    return !!(input && input.value.trim()) || !!state.quizState[qKey];
  });

  const actions = document.createElement('div');
  actions.className = 'quiz-actions-bar';
  actions.innerHTML = `
    ${graded ? `
      <span class="quiz-graded-note"><i class="fa-solid fa-circle-check" style="color: #22c55e;"></i> Test calificado. ${quiz.questions.some(q => !Array.isArray(q.options) || q.options.length === 0) ? 'Las preguntas abiertas se puntúan según tu autoevaluación.' : ''}</span>
    ` : `
      <button type="button" class="btn-primary-action" id="quizGradeBtn" disabled>
        <i class="fa-solid fa-clipboard-check"></i> Calificar mi test
      </button>
    `}
    ${!graded ? `
      <span class="quiz-need-note"><i class="fa-solid fa-circle-info"></i> Responde todas las preguntas para habilitar la calificación.</span>
    ` : ''}
    ${anyAnswer || graded ? `
      <button type="button" class="btn-quiz-reset" id="quizResetBtn">
        <i class="fa-solid fa-rotate-left"></i> Reiniciar intento
      </button>
    ` : ''}
  `;
  DOM.quizQuestionsWrap.appendChild(actions);

  const gradeBtn = document.getElementById('quizGradeBtn');
  if (gradeBtn) {
    updateGradeButtonState(dayKey);
    gradeBtn.addEventListener('click', () => {
      if (!gradeBtn.disabled) {
        state.quizState[`${dayKey}-graded`] = '1';
        localStorage.setItem('easy_quiz_state', JSON.stringify(state.quizState));
        const savedScroll = window.scrollY;
        renderQuizStage(weekId, dayNum, day);
        window.scrollTo({ top: savedScroll, behavior: 'smooth' });
        showToast('Test calificado. Revisa tus resultados y las explicaciones.');
      }
    });
  }

  const resetBtn = document.getElementById('quizResetBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('¿Reiniciar este intento? Se borrarán tus respuestas y la calificación de este día.')) {
        Object.keys(state.quizState).forEach(k => {
          if (k.startsWith(dayKey)) delete state.quizState[k];
        });
        localStorage.setItem('easy_quiz_state', JSON.stringify(state.quizState));
        renderQuizStage(weekId, dayNum, day);
        showToast('Intento reiniciado. ¡A jugar de nuevo!');
      }
    });
  }
}

function updateGradeButtonState(dayKey) {
  const gradeBtn = document.getElementById('quizGradeBtn');
  if (!gradeBtn) return;
  const day = getDay(currentWeekId, currentDayNum);
  const quiz = (day && day.quiz) || { questions: [] };
  const all = quiz.questions.every(q => {
    const qKey = `${dayKey}-q${q.num}`;
    const isMCQ = Array.isArray(q.options) && q.options.length > 0;
    if (isMCQ) return !!state.quizState[qKey];
    const input = DOM.quizQuestionsWrap.querySelector(`[data-openkey="${qKey}"]`);
    return !!(input && input.value.trim()) || !!state.quizState[qKey];
  });
  gradeBtn.disabled = !all;
  gradeBtn.classList.toggle('ready', all);
}

// =========================================================================
// Stage 4: Diapositivas
// =========================================================================

// =========================================================================
// Stage 4: Diapositivas
// =========================================================================
let currentSlideIndex = 0;

function renderSlidesStage(week) {
  const slides = week.slides || [];
  if (slides.length === 0) {
    if (DOM.slideStageCanvas) {
      DOM.slideStageCanvas.innerHTML = '<p style="text-align:center; color: var(--text-muted);">Diapositivas en preparación.</p>';
    }
    return;
  }

  currentSlideIndex = Math.min(currentSlideIndex, slides.length - 1);
  updateCurrentSlideView(slides);

  if (DOM.slidePrevBtn) {
    DOM.slidePrevBtn.onclick = () => {
      if (currentSlideIndex > 0) {
        currentSlideIndex--;
        updateCurrentSlideView(slides);
      }
    };
  }

  if (DOM.slideNextBtn) {
    DOM.slideNextBtn.onclick = () => {
      if (currentSlideIndex < slides.length - 1) {
        currentSlideIndex++;
        updateCurrentSlideView(slides);
      }
    };
  }
}

function updateCurrentSlideView(slides) {
  const cur = slides[currentSlideIndex];
  if (!cur) return;

  if (DOM.slideCounterBadge) {
    DOM.slideCounterBadge.textContent = `Diapositiva ${cur.slideNumber} de ${slides.length}`;
  }

  if (DOM.slidePrevBtn) DOM.slidePrevBtn.disabled = currentSlideIndex === 0;
  if (DOM.slideNextBtn) DOM.slideNextBtn.disabled = currentSlideIndex === slides.length - 1;

  if (DOM.slideStageCanvas) {
    DOM.slideStageCanvas.innerHTML = `
      <h3 class="slide-stage-title">${escapeHTML(cur.title)}</h3>
      <div class="slide-bullets-list">
        ${(cur.bullets || []).map(b => `<div class="slide-bullet-item">${escapeHTML(b)}</div>`).join('')}
      </div>
    `;
  }
}

// =========================================================================
// Stage 5: Recursos Digitales
// =========================================================================
function renderResourcesStage(day) {
  if (!DOM.resourcesContainer) return;
  const res = day.digitalResources || { links: [], guide: [] };

  let linksHTML = '';
  if (res.links && res.links.length > 0) {
    linksHTML = `
      <div class="res-cards-grid">
        ${res.links.map(l => `
          <div class="res-card-item">
            <div class="res-card-header">
              <h5><i class="fa-solid fa-link" style="color: var(--primary-500); margin-right: 0.35rem;"></i> ${escapeHTML(l.label)}</h5>
              <p>${escapeHTML(l.description || 'Práctica interactiva complementaria en línea.')}</p>
            </div>
            <a href="${l.url}" target="_blank" rel="noopener noreferrer" class="btn-open-res-link">
              <span>Abrir Recurso</span> <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
          </div>
        `).join('')}
      </div>
    `;
  } else {
    linksHTML = '<p style="color: var(--text-muted);">Práctica interactiva integrada en las lecciones.</p>';
  }

  let guideHTML = '';
  if (res.guide && res.guide.length > 0) {
    guideHTML = `
      <div class="res-guide-card">
        <h5><i class="fa-solid fa-circle-question"></i> Recomendaciones de Estudio Paso a Paso</h5>
        <div class="res-guide-steps">
          ${res.guide.map(g => `<div>• ${escapeHTML(g)}</div>`).join('')}
        </div>
      </div>
    `;
  }

  DOM.resourcesContainer.innerHTML = `
    <div class="digital-resources-wrap">
      <div>
        <h4 class="res-section-title"><i class="fa-solid fa-globe"></i> Enlaces y Videos de Práctica en Línea</h4>
        ${linksHTML}
      </div>
      ${guideHTML}
    </div>
  `;
}

// =========================================================================
// Stage 6: Infografía
// =========================================================================
function renderPosterStage(day) {
  DOM.posterMediaWrap.innerHTML = '';
  const posterUrl = day.posterUrl;

  if (!posterUrl) {
    DOM.posterMediaWrap.innerHTML = `
      <div style="text-align: center; color: var(--text-muted); padding: 3rem;">
        <i class="fa-solid fa-image" style="font-size: 3rem; margin-bottom: 1rem; display: block;"></i>
        <p>No se encontró afiche para este día.</p>
      </div>
    `;
    DOM.posterFullBtn.style.display = 'none';
    return;
  }

  DOM.posterFullBtn.style.display = 'inline-flex';
  DOM.posterFullBtn.onclick = () => openLightbox(posterUrl, day.posterType);

  if (day.posterType === 'pdf') {
    DOM.posterMediaWrap.innerHTML = `
      <iframe src="${posterUrl}#toolbar=0" class="poster-embed-pdf" title="Afiche en PDF"></iframe>
    `;
  } else {
    DOM.posterMediaWrap.innerHTML = `
      <img src="${posterUrl}" class="poster-img" alt="Afiche del Día" title="Haz clic para ver en pantalla completa">
    `;
    DOM.posterMediaWrap.querySelector('.poster-img').addEventListener('click', () => openLightbox(posterUrl, 'image'));
  }
}

// =========================================================================
// Navegación anterior / siguiente + completado
// =========================================================================
function setupStageNavButtons(weekId, dayNum) {
  DOM.prevLessonBtn.disabled = weekId === 1 && dayNum === 1;
  DOM.nextLessonBtn.disabled = weekId === 3 && dayNum === 6;

  DOM.prevLessonBtn.onclick = () => {
    let prevW = weekId;
    let prevD = dayNum - 1;
    if (prevD < 1) {
      prevW = Math.max(1, weekId - 1);
      prevD = 6;
    }
    goToDay(prevW, prevD);
  };

  DOM.nextLessonBtn.onclick = () => {
    let nextW = weekId;
    let nextD = dayNum + 1;
    if (nextD > 6) {
      nextW = Math.min(3, weekId + 1);
      nextD = 1;
    }
    goToDay(nextW, nextD);
  };
}

function updateLessonCompletionButton(weekId, dayNum) {
  const isDone = state.completedDays.includes(`w${weekId}-d${dayNum}`);
  if (isDone) {
    DOM.stageCompleteBtn.classList.add('is-completed');
    DOM.stageCompleteBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Lección Completada';
  } else {
    DOM.stageCompleteBtn.classList.remove('is-completed');
    DOM.stageCompleteBtn.innerHTML = '<i class="fa-regular fa-circle-check"></i> Marcar como Completada';
  }
}

function toggleLessonCompletion(weekId, dayNum) {
  const key = `w${weekId}-d${dayNum}`;
  const idx = state.completedDays.indexOf(key);

  if (idx === -1) {
    state.completedDays.push(key);
    showToast(`¡Lección Día ${dayNum} completada con éxito! 🎉`);
  } else {
    state.completedDays.splice(idx, 1);
    showToast(`Lección Día ${dayNum} desmarcada.`);
  }

  localStorage.setItem('easy_completed_days', JSON.stringify(state.completedDays));
  updateLessonCompletionButton(weekId, dayNum);
  renderSyllabusTree(weekId, dayNum);
  updateGlobalProgress();
}

function updateGlobalProgress() {
  const totalDays = 18;
  const count = state.completedDays.length;
  const pct = Math.round((count / totalDays) * 100);
  const text = document.getElementById('topbarProgressText');
  const fill = document.getElementById('topbarProgressFill');
  if (text) text.textContent = `${count}/${totalDays} (${pct}%)`;
  if (fill) fill.style.width = `${pct}%`;
}

function switchClassroomTab(tabId) {
  currentTab = tabId;
  let activeBtn = null;
  DOM.stageTabBtns.forEach(btn => {
    const isTarget = btn.getAttribute('data-tab') === tabId;
    btn.classList.toggle('active', isTarget);
    if (isTarget) activeBtn = btn;
  });
  DOM.stagePanels.forEach(p => {
    p.classList.toggle('active', p.id === `stagePanel_${tabId}`);
  });
  if (activeBtn) {
    const bar = activeBtn.parentElement;
    if (bar && bar.scrollWidth > bar.clientWidth) {
      const target = activeBtn.offsetLeft - (bar.clientWidth - activeBtn.offsetWidth) / 2;
      bar.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
    }
  }
  const url = new URL(window.location);
  url.searchParams.set('tab', tabId);
  window.history.replaceState({}, '', url);
}

// =========================================================================
// Audio
// =========================================================================
function setupAudio() {
  if (DOM.audioPlayBtn) {
    DOM.audioPlayBtn.addEventListener('click', () => {
      const day = getDay(currentWeekId, currentDayNum);
      if (!day || !day.readingText) return;

      if (state.speech.isPlaying) {
        if (state.speech.isPaused) {
          state.speech.synth.resume();
          state.speech.isPaused = false;
          updateAudioUI(true, false);
        } else {
          state.speech.synth.pause();
          state.speech.isPaused = true;
          updateAudioUI(true, true);
        }
      } else {
        startSpeech(day.readingText);
      }
    });
  }

  if (DOM.audioStopBtn) {
    DOM.audioStopBtn.addEventListener('click', stopAudio);
  }

  if (DOM.audioSpeedSelect) {
    DOM.audioSpeedSelect.addEventListener('change', (e) => {
      state.speech.rate = parseFloat(e.target.value) || 1.0;
      if (state.speech.isPlaying) {
        const day = getDay(currentWeekId, currentDayNum);
        stopAudio();
        if (day && day.readingText) startSpeech(day.readingText);
      }
    });
  }
}

// =========================================================================
// Init
// =========================================================================
mountPage({
  active: 'classroom',
  breadcrumb: `Aula Virtual / Semana ${currentWeekId} - Día ${currentDayNum}`,
  onLoad: () => {
    initDomCache();
    renderClassroom(currentWeekId, currentDayNum);

    DOM.stageTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        if (tab) switchClassroomTab(tab);
      });
    });

    DOM.stageCompleteBtn.addEventListener('click', () => {
      toggleLessonCompletion(currentWeekId, currentDayNum);
    });

    DOM.saveWorksheetBtn.addEventListener('click', () => {
      const inputs = DOM.worksheetSectionsWrap.querySelectorAll('.worksheet-input');
      inputs.forEach(input => {
        const key = input.getAttribute('data-key');
        if (key) state.worksheetData[key] = input.value;
      });
      localStorage.setItem('easy_worksheet_notes', JSON.stringify(state.worksheetData));
      showToast('¡Respuestas de la ficha guardadas con éxito!');
    });

    DOM.masterAnswerHeader.addEventListener('click', () => {
      const isOpen = DOM.masterAnswerBody.classList.toggle('active');
      DOM.masterAnswerIcon.className = isOpen ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down';
    });

    setupAudio();
  }
});
