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

// --- Parámetros de la URL: aula.html?week=1&day=2&tab=quiz ---
const params = new URLSearchParams(window.location.search);
let currentWeekId = parseInt(params.get('week'), 10) || 1;
let currentDayNum = parseInt(params.get('day'), 10) || 1;
let currentTab = params.get('tab') || 'reading';

// --- DOM cache (lazy: se llena tras montar el shell, porque el contenido vive en <template>) ---
let DOM = null;

function initDomCache() {
  DOM = {
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
  renderReadingStage(day);
  renderWorksheetStage(weekId, dayNum, day);
  renderQuizStage(weekId, dayNum, day);
  renderSlidesStage(week);
  renderResourcesStage(day);
  renderPosterStage(day);
  setupStageNavButtons(weekId, dayNum);
  switchClassroomTab(currentTab);
  updateBreadcrumb();
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
function renderQuizStage(weekId, dayNum, day) {
  DOM.quizQuestionsWrap.innerHTML = '';
  const dayKey = `w${weekId}-d${dayNum}`;
  const quiz = day.quiz || { questions: [] };

  DOM.masterAnswerBody.classList.remove('active');
  DOM.masterAnswerIcon.className = 'fa-solid fa-chevron-down';

  DOM.masterAnswerBody.innerHTML = `
    <div style="background: var(--bg-surface); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
      <strong style="color: var(--primary-500); display: block; margin-bottom: 0.6rem;"><i class="fa-solid fa-key"></i> Claves Oficiales y Explicación:</strong>
      ${quiz.questions.map(q => `<div style="margin-bottom: 0.35rem;"><strong>${q.num}.</strong> ${escapeHTML(q.answerKey || 'Respuesta guiada')}</div>`).join('')}
      ${quiz.generalExplanation ? `<div style="margin-top: 0.8rem; padding-top: 0.8rem; border-top: 1px solid var(--border-color); font-style: italic;">${escapeHTML(quiz.generalExplanation)}</div>` : ''}
    </div>
  `;

  let correctCount = 0;
  const totalQ = quiz.questions.length;

  quiz.questions.forEach(q => {
    const qKey = `${dayKey}-q${q.num}`;
    const userSelected = state.quizState[qKey] || null;

    const card = document.createElement('div');
    card.className = 'question-card';

    let optionsHTML = '';
    if (q.options && q.options.length > 0) {
      optionsHTML = `
        <div class="options-grid">
          ${q.options.map(opt => {
            let optClass = 'option-btn';
            if (userSelected) {
              if (opt.key === q.correctOption) optClass += ' correct';
              else if (opt.key === userSelected) optClass += ' incorrect';
            }
            return `
              <button type="button" class="${optClass}" data-key="${opt.key}" ${userSelected ? 'disabled' : ''}>
                <span class="option-key">${opt.key})</span>
                <span>${escapeHTML(opt.text)}</span>
              </button>
            `;
          }).join('')}
        </div>
      `;
    } else {
      optionsHTML = `
        <div style="padding-left: 2.5rem;">
          <input type="text" class="worksheet-input" style="max-width: 450px;" placeholder="Escribe tu respuesta..." value="${escapeHTML(userSelected || '')}" data-openkey="${qKey}">
        </div>
      `;
    }

    if (userSelected && userSelected === q.correctOption) {
      correctCount++;
    }

    card.innerHTML = `
      <div class="question-header">
        <div class="q-num-badge">${q.num}</div>
        <div class="q-text">${escapeHTML(q.question)}</div>
      </div>
      ${optionsHTML}
      <div class="q-feedback-box ${userSelected ? 'active' : ''}">
        <div class="feedback-bubble">
          <strong><i class="fa-solid fa-circle-info"></i> Explicación Oficial:</strong> ${escapeHTML(q.answerKey || 'Correcto')}
        </div>
      </div>
    `;

    card.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const optKey = btn.getAttribute('data-key');
        state.quizState[qKey] = optKey;
        localStorage.setItem('easy_quiz_state', JSON.stringify(state.quizState));
        renderQuizStage(weekId, dayNum, day);
      });
    });

    card.querySelectorAll('[data-openkey]').forEach(input => {
      input.addEventListener('change', () => {
        state.quizState[input.getAttribute('data-openkey')] = input.value;
        localStorage.setItem('easy_quiz_state', JSON.stringify(state.quizState));
      });
    });

    DOM.quizQuestionsWrap.appendChild(card);
  });

  DOM.quizScorePill.textContent = `${correctCount} / ${totalQ}`;
}

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
  DOM.stageTabBtns.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
  });
  DOM.stagePanels.forEach(p => {
    p.classList.toggle('active', p.id === `stagePanel_${tabId}`);
  });
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
