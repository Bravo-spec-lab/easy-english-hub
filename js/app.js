/**
 * EASY English Hub - EdTech LMS Application
 * Desarrollado por Bravo • Computación e Informática
 */

(function () {
  'use strict';

  // --- Application State ---
  const state = {
    currentView: 'dashboard', // 'dashboard' | 'classroom' | 'quizzes' | 'vocabulary' | 'gallery'
    currentWeekId: 1,
    currentDayNum: 1,
    currentClassroomTab: 'reading', // 'reading' | 'worksheet' | 'quiz' | 'slides' | 'resources' | 'poster'
    currentSlideIndex: 0,
    theme: localStorage.getItem('easy_theme') || 'dark',
    completedDays: JSON.parse(localStorage.getItem('easy_completed_days') || '[]'),
    quizState: JSON.parse(localStorage.getItem('easy_quiz_state') || '{}'),
    worksheetData: JSON.parse(localStorage.getItem('easy_worksheet_notes') || '{}'),
    speech: {
      synth: window.speechSynthesis,
      utterance: null,
      isPlaying: false,
      isPaused: false,
      rate: 1.0
    }
  };

  // --- Cached DOM Elements ---
  const DOM = {
    html: document.documentElement,
    appSidebar: document.getElementById('appSidebar'),
    sidebarToggleBtn: document.getElementById('sidebarToggleBtn'),
    themeToggleBtn: document.getElementById('themeToggleBtn'),
    themeIcon: document.getElementById('themeToggleIcon'),
    breadcrumbViewName: document.getElementById('breadcrumbViewName'),
    topbarProgressText: document.getElementById('topbarProgressText'),
    topbarProgressFill: document.getElementById('topbarProgressFill'),
    topbarSearchInput: document.getElementById('topbarSearchInput'),
    navItemBtns: document.querySelectorAll('.nav-item-btn'),
    viewSections: document.querySelectorAll('.view-section'),
    toastNotice: document.getElementById('toastNotice'),
    toastMessage: document.getElementById('toastMessage'),

    // View: Dashboard
    dashCompletedText: document.getElementById('dashCompletedText'),
    dashQuizzesText: document.getElementById('dashQuizzesText'),
    dashVocabText: document.getElementById('dashVocabText'),
    dashStreakText: document.getElementById('dashStreakText'),
    dashContinueTitle: document.getElementById('dashContinueTitle'),
    dashContinueSub: document.getElementById('dashContinueSub'),
    dashContinueBtn: document.getElementById('dashContinueBtn'),
    dashModulesGrid: document.getElementById('dashModulesGrid'),

    // View: Classroom
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
    
    // Classroom Tabs: Slides & Resources & Poster
    slideCounterBadge: document.getElementById('slideCounterBadge'),
    slidePrevBtn: document.getElementById('slidePrevBtn'),
    slideNextBtn: document.getElementById('slideNextBtn'),
    slideStageCanvas: document.getElementById('slideStageCanvas'),
    resourcesContainer: document.getElementById('resourcesContainer'),
    posterMediaWrap: document.getElementById('posterMediaWrap'),
    posterFullBtn: document.getElementById('posterFullBtn'),
    prevLessonBtn: document.getElementById('prevLessonBtn'),
    nextLessonBtn: document.getElementById('nextLessonBtn'),

    // View: Quizzes Hub
    quizzesFilterBar: document.getElementById('quizzesFilterBar'),
    quizzesCardsGrid: document.getElementById('quizzesCardsGrid'),

    // View: Vocabulary Hub
    vocabCategoryFilters: document.getElementById('vocabCategoryFilters'),
    vocabSearchInput: document.getElementById('vocabSearchInput'),
    vocabCardsGrid: document.getElementById('vocabCardsGrid'),

    // View: Gallery Hub
    galleryCardsGrid: document.getElementById('galleryCardsGrid'),

    // Lightbox Modal
    mediaLightboxModal: document.getElementById('mediaLightboxModal'),
    lightboxMediaContainer: document.getElementById('lightboxMediaContainer'),
    lightboxCloseBtn: document.getElementById('lightboxCloseBtn')
  };

  // --- Initializer ---
  function init() {
    applyTheme(state.theme);
    updateGlobalProgressUI();
    setupEventListeners();
    navigateTo('dashboard');
  }

  // --- Theme Handler ---
  function applyTheme(theme) {
    state.theme = theme;
    DOM.html.setAttribute('data-theme', theme);
    localStorage.setItem('easy_theme', theme);
    if (DOM.themeIcon) {
      DOM.themeIcon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }
  }

  function toggleTheme() {
    applyTheme(state.theme === 'dark' ? 'light' : 'dark');
  }

  // --- View Router ---
  function navigateTo(viewId, params = {}) {
    state.currentView = viewId;
    stopAudio();

    DOM.navItemBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-view') === viewId);
    });

    if (DOM.appSidebar) {
      DOM.appSidebar.classList.remove('mobile-open');
    }

    DOM.viewSections.forEach(sec => {
      sec.classList.toggle('active', sec.id === `view_${viewId}`);
    });

    const viewLabels = {
      dashboard: 'Dashboard / Inicio',
      classroom: `Aula Virtual / Semana ${state.currentWeekId} - Día ${state.currentDayNum}`,
      quizzes: 'Centro de Evaluaciones & Quizzes',
      vocabulary: 'Laboratorio de Vocabulario & Verbos',
      gallery: 'Galería de Infografías & Afiches'
    };
    if (DOM.breadcrumbViewName) {
      DOM.breadcrumbViewName.textContent = viewLabels[viewId] || viewId;
    }

    if (viewId === 'dashboard') {
      renderDashboard();
    } else if (viewId === 'classroom') {
      if (params.weekId) state.currentWeekId = params.weekId;
      if (params.dayNum) state.currentDayNum = params.dayNum;
      renderClassroom(state.currentWeekId, state.currentDayNum);
    } else if (viewId === 'quizzes') {
      renderQuizzesHub();
    } else if (viewId === 'vocabulary') {
      renderVocabularyHub();
    } else if (viewId === 'gallery') {
      renderGalleryHub();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // =========================================================================
  // VIEW 1: Dashboard Logic
  // =========================================================================
  function renderDashboard() {
    const totalDays = 18;
    const completedCount = state.completedDays.length;

    if (DOM.dashCompletedText) DOM.dashCompletedText.textContent = `${completedCount} / ${totalDays}`;

    let answeredQuizzes = 0;
    for (let w = 1; w <= 3; w++) {
      for (let d = 1; d <= 6; d++) {
        if (state.quizState[`w${w}-d${d}-q1`]) answeredQuizzes++;
      }
    }
    if (DOM.dashQuizzesText) DOM.dashQuizzesText.textContent = `${answeredQuizzes} / ${totalDays}`;
    if (DOM.dashVocabText) DOM.dashVocabText.textContent = window.COURSE_DATA ? window.COURSE_DATA.masterVocabulary.length : '124';
    if (DOM.dashStreakText) DOM.dashStreakText.textContent = completedCount > 0 ? `${completedCount} Días` : 'Comienza hoy';

    let nextWeek = 1;
    let nextDay = 1;
    let found = false;
    for (let w = 1; w <= 3; w++) {
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

    const nextWeekData = window.COURSE_DATA.weeks.find(w => w.id === nextWeek);
    const nextDayData = nextWeekData ? nextWeekData.days.find(d => d.day === nextDay) : null;

    if (DOM.dashContinueTitle && nextDayData) {
      DOM.dashContinueTitle.textContent = `Semana ${nextWeek} • Día ${nextDay}: ${nextDayData.title}`;
    }
    if (DOM.dashContinueSub && nextDayData) {
      DOM.dashContinueSub.textContent = nextDayData.learningFocus || 'Continúa con la siguiente lección guiada.';
    }
    if (DOM.dashContinueBtn) {
      DOM.dashContinueBtn.onclick = () => {
        navigateTo('classroom', { weekId: nextWeek, dayNum: nextDay });
      };
    }

    if (DOM.dashModulesGrid && window.COURSE_DATA) {
      DOM.dashModulesGrid.innerHTML = '';
      window.COURSE_DATA.weeks.forEach(w => {
        const completedInWeek = w.days.filter(d => state.completedDays.includes(`w${w.id}-d${d.day}`)).length;
        const pct = Math.round((completedInWeek / 6) * 100);

        const card = document.createElement('div');
        card.className = 'dash-module-card';
        card.innerHTML = `
          <div class="mod-header-row">
            <span class="mod-badge-pill">${w.badge}</span>
            <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600;"><i class="fa-solid fa-calendar-check"></i> ${completedInWeek}/6 Días</span>
          </div>
          <h4 class="mod-title">${w.title}</h4>
          <p class="mod-desc">${w.description}</p>
          <div class="mod-progress-box">
            <div class="mod-progress-labels">
              <span>Progreso del módulo</span>
              <span>${pct}%</span>
            </div>
            <div class="mod-progress-track">
              <div class="mod-progress-fill" style="width: ${pct}%;"></div>
            </div>
          </div>
          <button type="button" class="btn-open-module">
            <span>Abrir Lecciones</span> <i class="fa-solid fa-arrow-right"></i>
          </button>
        `;

        card.querySelector('.btn-open-module').addEventListener('click', () => {
          navigateTo('classroom', { weekId: w.id, dayNum: 1 });
        });

        DOM.dashModulesGrid.appendChild(card);
      });
    }
  }

  // =========================================================================
  // VIEW 2: Aula Virtual / LMS Classroom Logic
  // =========================================================================
  function renderClassroom(weekId, dayNum) {
    const week = window.COURSE_DATA.weeks.find(w => w.id === weekId);
    if (!week) return;
    const day = week.days.find(d => d.day === dayNum);
    if (!day) return;

    // Header Details
    DOM.stageWeekBadge.textContent = week.badge;
    DOM.stageLessonTitle.textContent = day.title;
    DOM.stageFocusTag.innerHTML = `<i class="fa-solid fa-bullseye"></i> ${day.learningFocus || 'Enfoque práctico de aprendizaje'}`;

    updateLessonCompletionButton(weekId, dayNum);
    renderSyllabusTree(weekId, dayNum);

    // 1. Reading
    renderReadingStage(day);

    // 2. Worksheet
    renderWorksheetStage(weekId, dayNum, day);

    // 3. Quiz
    renderQuizStage(weekId, dayNum, day);

    // 4. Slide Deck (Diapositivas de la Semana)
    renderSlidesStage(week);

    // 5. Digital Resources (Recursos de Práctica Online)
    renderResourcesStage(day);

    // 6. Poster
    renderPosterStage(day);

    setupStageNavButtons(weekId, dayNum);
    switchClassroomTab(state.currentClassroomTab);
  }

  function renderSyllabusTree(currentWeekId, currentDayNum) {
    if (!DOM.syllabusAccordion || !window.COURSE_DATA) return;
    DOM.syllabusAccordion.innerHTML = '';

    window.COURSE_DATA.weeks.forEach(w => {
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
              <a class="syllabus-day-link ${isDayCurrent ? 'active' : ''} ${isDone ? 'completed' : ''}" data-week="${w.id}" data-day="${d.day}">
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

      weekItem.querySelectorAll('.syllabus-day-link').forEach(link => {
        link.addEventListener('click', () => {
          const wId = parseInt(link.getAttribute('data-week'), 10);
          const dNum = parseInt(link.getAttribute('data-day'), 10);
          stopAudio();
          state.currentWeekId = wId;
          state.currentDayNum = dNum;
          renderClassroom(wId, dNum);
          window.scrollTo({ top: 120, behavior: 'smooth' });
        });
      });

      DOM.syllabusAccordion.appendChild(weekItem);
    });
  }

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
            <input type="text" class="worksheet-input" style="max-width: 450px;" placeholder="Escribe tu respuesta..." value="${escapeHTML(userSelected || '')}" onchange="window.saveOpenQuiz('${qKey}', this.value)">
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

      DOM.quizQuestionsWrap.appendChild(card);
    });

    DOM.quizScorePill.textContent = `${correctCount} / ${totalQ}`;
  }

  // =========================================================================
  // NEW: Interactive Slide Deck (Diapositivas en Pantalla)
  // =========================================================================
  function renderSlidesStage(week) {
    const slides = week.slides || [];
    if (slides.length === 0) {
      if (DOM.slideStageCanvas) {
        DOM.slideStageCanvas.innerHTML = '<p style="text-align:center; color: var(--text-muted);">Diapositivas en preparación.</p>';
      }
      return;
    }

    state.currentSlideIndex = Math.min(state.currentSlideIndex, slides.length - 1);
    updateCurrentSlideView(slides);

    if (DOM.slidePrevBtn) {
      DOM.slidePrevBtn.onclick = () => {
        if (state.currentSlideIndex > 0) {
          state.currentSlideIndex--;
          updateCurrentSlideView(slides);
        }
      };
    }

    if (DOM.slideNextBtn) {
      DOM.slideNextBtn.onclick = () => {
        if (state.currentSlideIndex < slides.length - 1) {
          state.currentSlideIndex++;
          updateCurrentSlideView(slides);
        }
      };
    }
  }

  function updateCurrentSlideView(slides) {
    const cur = slides[state.currentSlideIndex];
    if (!cur) return;

    if (DOM.slideCounterBadge) {
      DOM.slideCounterBadge.textContent = `Diapositiva ${cur.slideNumber} de ${slides.length}`;
    }

    if (DOM.slidePrevBtn) DOM.slidePrevBtn.disabled = state.currentSlideIndex === 0;
    if (DOM.slideNextBtn) DOM.slideNextBtn.disabled = state.currentSlideIndex === slides.length - 1;

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
  // NEW: Digital Resources & Online Practice (En Pantalla)
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
  // Poster Stage
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
        <img src="${posterUrl}" class="poster-img" alt="Afiche del Día" title="Haz clic para ver en pantalla completa" onclick="window.openLightbox('${posterUrl}', 'image')">
      `;
    }
  }

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
      navigateTo('classroom', { weekId: prevW, dayNum: prevD });
    };

    DOM.nextLessonBtn.onclick = () => {
      let nextW = weekId;
      let nextD = dayNum + 1;
      if (nextD > 6) {
        nextW = Math.min(3, weekId + 1);
        nextD = 1;
      }
      navigateTo('classroom', { weekId: nextW, dayNum: nextD });
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
    updateGlobalProgressUI();
  }

  function switchClassroomTab(tabId) {
    state.currentClassroomTab = tabId;
    DOM.stageTabBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
    });
    DOM.stagePanels.forEach(p => {
      p.classList.toggle('active', p.id === `stagePanel_${tabId}`);
    });
  }

  // =========================================================================
  // VIEW 3: Quizzes Hub
  // =========================================================================
  function renderQuizzesHub(filterWeek = 'all') {
    if (!DOM.quizzesCardsGrid || !window.COURSE_DATA) return;
    DOM.quizzesCardsGrid.innerHTML = '';

    window.COURSE_DATA.weeks.forEach(w => {
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
          <button type="button" class="btn-open-module">
            <span>${hasStarted ? 'Revisar / Reintentar' : 'Iniciar Evaluación'}</span> <i class="fa-solid fa-arrow-right"></i>
          </button>
        `;

        card.querySelector('.btn-open-module').addEventListener('click', () => {
          state.currentClassroomTab = 'quiz';
          navigateTo('classroom', { weekId: w.id, dayNum: d.day });
        });

        DOM.quizzesCardsGrid.appendChild(card);
      });
    });
  }

  // =========================================================================
  // VIEW 4: Vocabulario & Verbos
  // =========================================================================
  let currentVocabFilter = 'all';
  function renderVocabularyHub() {
    if (!DOM.vocabCardsGrid || !window.COURSE_DATA) return;
    DOM.vocabCardsGrid.innerHTML = '';

    const query = (DOM.vocabSearchInput ? DOM.vocabSearchInput.value : '').trim().toLowerCase();
    const items = window.COURSE_DATA.masterVocabulary || [];

    const filtered = items.filter(it => {
      const matchCat = currentVocabFilter === 'all' || it.category === currentVocabFilter;
      const matchQuery = !query || it.term.toLowerCase().includes(query) || it.category.toLowerCase().includes(query);
      return matchCat && matchQuery;
    });

    if (filtered.length === 0) {
      DOM.vocabCardsGrid.innerHTML = `
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

      DOM.vocabCardsGrid.appendChild(card);
    });
  }

  // =========================================================================
  // VIEW 5: Galería de Infografías
  // =========================================================================
  function renderGalleryHub() {
    if (!DOM.galleryCardsGrid || !window.COURSE_DATA) return;
    DOM.galleryCardsGrid.innerHTML = '';

    const seenPosters = new Set();

    window.COURSE_DATA.weeks.forEach(w => {
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

        DOM.galleryCardsGrid.appendChild(card);
      });
    });
  }

  // --- Lightbox Modal ---
  function openLightbox(url, type) {
    if (!DOM.mediaLightboxModal || !DOM.lightboxMediaContainer) return;
    DOM.lightboxMediaContainer.innerHTML = '';

    if (type === 'pdf') {
      DOM.lightboxMediaContainer.innerHTML = `
        <iframe src="${url}#toolbar=1" style="width: 100%; height: 75vh; border: none; border-radius: var(--radius-md);"></iframe>
      `;
    } else {
      DOM.lightboxMediaContainer.innerHTML = `
        <img src="${url}" style="max-width: 100%; max-height: 75vh; object-fit: contain; border-radius: var(--radius-md); display: block; margin: 0 auto;" alt="Infografía">
      `;
    }

    DOM.mediaLightboxModal.classList.add('active');
  }
  window.openLightbox = openLightbox;

  function closeLightbox() {
    if (DOM.mediaLightboxModal) DOM.mediaLightboxModal.classList.remove('active');
  }

  // --- SpeechSynthesis ---
  function setupAudio() {
    if (DOM.audioPlayBtn) {
      DOM.audioPlayBtn.addEventListener('click', () => {
        const week = window.COURSE_DATA.weeks.find(w => w.id === state.currentWeekId);
        const day = week ? week.days.find(d => d.day === state.currentDayNum) : null;
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
          const week = window.COURSE_DATA.weeks.find(w => w.id === state.currentWeekId);
          const day = week ? week.days.find(d => d.day === state.currentDayNum) : null;
          stopAudio();
          if (day && day.readingText) startSpeech(day.readingText);
        }
      });
    }
  }

  function startSpeech(text) {
    if (!state.speech.synth) {
      showToast('Tu navegador no cuenta con soporte de síntesis de voz.');
      return;
    }
    state.speech.synth.cancel();

    const clean = text.replace(/[\u2022\u2013\u2014]/g, ' ');
    const ut = new SpeechSynthesisUtterance(clean);
    ut.lang = 'en-US';
    ut.rate = state.speech.rate;

    const voices = state.speech.synth.getVoices();
    const enVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')));
    if (enVoice) ut.voice = enVoice;

    ut.onstart = () => {
      state.speech.isPlaying = true;
      state.speech.isPaused = false;
      updateAudioUI(true, false);
    };
    ut.onend = stopAudio;
    ut.onerror = stopAudio;

    state.speech.utterance = ut;
    state.speech.synth.speak(ut);
  }

  function stopAudio() {
    if (state.speech.synth) state.speech.synth.cancel();
    state.speech.isPlaying = false;
    state.speech.isPaused = false;
    updateAudioUI(false, false);
  }

  function speakText(text) {
    if (!state.speech.synth || !text) return;
    const ut = new SpeechSynthesisUtterance(text);
    ut.lang = 'en-US';
    ut.rate = 0.9;
    state.speech.synth.speak(ut);
  }

  function updateAudioUI(isPlaying, isPaused) {
    if (!DOM.audioPlayBtn || !DOM.audioStatusLabel) return;
    if (!isPlaying) {
      DOM.audioPlayBtn.innerHTML = '<i class="fa-solid fa-play"></i> Escuchar Lectura';
      DOM.audioStatusLabel.innerHTML = '<i class="fa-solid fa-circle-pause" style="color: var(--text-muted)"></i> Audio detenido';
    } else if (isPaused) {
      DOM.audioPlayBtn.innerHTML = '<i class="fa-solid fa-play"></i> Reanudar';
      DOM.audioStatusLabel.innerHTML = '<i class="fa-solid fa-pause" style="color: var(--amber-500)"></i> En pausa';
    } else {
      DOM.audioPlayBtn.innerHTML = '<i class="fa-solid fa-pause"></i> Pausar';
      DOM.audioStatusLabel.innerHTML = '<i class="fa-solid fa-volume-high" style="color: var(--emerald-500)"></i> Reproduciendo...';
    }
  }

  function updateGlobalProgressUI() {
    const totalDays = 18;
    const count = state.completedDays.length;
    const pct = Math.round((count / totalDays) * 100);

    if (DOM.topbarProgressText) DOM.topbarProgressText.textContent = `${count}/${totalDays} (${pct}%)`;
    if (DOM.topbarProgressFill) DOM.topbarProgressFill.style.width = `${pct}%`;
  }

  let toastTimer = null;
  function showToast(msg) {
    if (!DOM.toastNotice) return;
    DOM.toastMessage.textContent = msg;
    DOM.toastNotice.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      DOM.toastNotice.classList.remove('show');
    }, 3200);
  }

  function escapeHTML(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function setupEventListeners() {
    DOM.navItemBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const view = btn.getAttribute('data-view');
        if (view) navigateTo(view);
      });
    });

    if (DOM.sidebarToggleBtn) {
      DOM.sidebarToggleBtn.addEventListener('click', () => {
        DOM.appSidebar.classList.toggle('mobile-open');
      });
    }

    if (DOM.themeToggleBtn) {
      DOM.themeToggleBtn.addEventListener('click', toggleTheme);
    }

    DOM.stageTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        if (tab) switchClassroomTab(tab);
      });
    });

    if (DOM.stageCompleteBtn) {
      DOM.stageCompleteBtn.addEventListener('click', () => {
        toggleLessonCompletion(state.currentWeekId, state.currentDayNum);
      });
    }

    if (DOM.saveWorksheetBtn) {
      DOM.saveWorksheetBtn.addEventListener('click', () => {
        const inputs = DOM.worksheetSectionsWrap.querySelectorAll('.worksheet-input');
        inputs.forEach(input => {
          const key = input.getAttribute('data-key');
          if (key) state.worksheetData[key] = input.value;
        });
        localStorage.setItem('easy_worksheet_notes', JSON.stringify(state.worksheetData));
        showToast('¡Respuestas de la ficha guardadas con éxito!');
      });
    }

    if (DOM.masterAnswerHeader) {
      DOM.masterAnswerHeader.addEventListener('click', () => {
        const isOpen = DOM.masterAnswerBody.classList.toggle('active');
        DOM.masterAnswerIcon.className = isOpen ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down';
      });
    }

    if (DOM.lightboxCloseBtn) DOM.lightboxCloseBtn.addEventListener('click', closeLightbox);
    if (DOM.mediaLightboxModal) {
      DOM.mediaLightboxModal.addEventListener('click', (e) => {
        if (e.target === DOM.mediaLightboxModal) closeLightbox();
      });
    }

    if (DOM.quizzesFilterBar) {
      DOM.quizzesFilterBar.querySelectorAll('.btn-filter-pill').forEach(btn => {
        btn.addEventListener('click', () => {
          DOM.quizzesFilterBar.querySelectorAll('.btn-filter-pill').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const filter = btn.getAttribute('data-filter');
          renderQuizzesHub(filter);
        });
      });
    }

    if (DOM.vocabCategoryFilters) {
      DOM.vocabCategoryFilters.querySelectorAll('.btn-filter-pill').forEach(btn => {
        btn.addEventListener('click', () => {
          DOM.vocabCategoryFilters.querySelectorAll('.btn-filter-pill').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          currentVocabFilter = btn.getAttribute('data-cat');
          renderVocabularyHub();
        });
      });
    }
    if (DOM.vocabSearchInput) {
      DOM.vocabSearchInput.addEventListener('input', renderVocabularyHub);
    }

    if (DOM.topbarSearchInput) {
      DOM.topbarSearchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const q = DOM.topbarSearchInput.value.trim().toLowerCase();
          if (q) {
            currentVocabFilter = 'all';
            navigateTo('vocabulary');
            if (DOM.vocabSearchInput) {
              DOM.vocabSearchInput.value = q;
              renderVocabularyHub();
            }
          }
        }
      });
    }

    setupAudio();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
