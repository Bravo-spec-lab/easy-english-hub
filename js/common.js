/**
 * EASY English Hub - Estado y utilidades compartidas entre páginas
 * Desarrollado por Bravo • Computación e Informática
 */

export const state = {
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

export function escapeHTML(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function applyTheme(theme) {
  state.theme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('easy_theme', theme);
  const icon = document.getElementById('themeToggleIcon');
  if (icon) {
    icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  }
}

export function updateGlobalProgressUI() {
  const totalDays = 24;
  const count = state.completedDays.length;
  const pct = Math.round((count / totalDays) * 100);
  const text = document.getElementById('topbarProgressText');
  const fill = document.getElementById('topbarProgressFill');
  if (text) text.textContent = `${count}/${totalDays} (${pct}%)`;
  if (fill) fill.style.width = `${pct}%`;
}

let toastTimer = null;
export function showToast(msg) {
  const notice = document.getElementById('toastNotice');
  const message = document.getElementById('toastMessage');
  if (!notice || !message) return;
  message.textContent = msg;
  notice.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    notice.classList.remove('show');
  }, 3200);
}

export function openLightbox(url, type) {
  const modal = document.getElementById('mediaLightboxModal');
  const container = document.getElementById('lightboxMediaContainer');
  if (!modal || !container) return;
  container.innerHTML = '';

  if (type === 'pdf') {
    container.innerHTML = `
      <iframe src="${url}#toolbar=1" style="width: 100%; height: 75vh; border: none; border-radius: var(--radius-md);"></iframe>
    `;
  } else {
    container.innerHTML = `
      <img src="${url}" style="max-width: 100%; max-height: 75vh; object-fit: contain; border-radius: var(--radius-md); display: block; margin: 0 auto;" alt="Infografía">
    `;
  }

  modal.classList.add('active');
}

export function closeLightbox() {
  const modal = document.getElementById('mediaLightboxModal');
  if (modal) modal.classList.remove('active');
}

export function wireLightbox() {
  const closeBtn = document.getElementById('lightboxCloseBtn');
  const modal = document.getElementById('mediaLightboxModal');
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeLightbox();
    });
  }
}

export function speakText(text) {
  if (!state.speech.synth || !text) return;
  const ut = new SpeechSynthesisUtterance(text);
  ut.lang = 'en-US';
  ut.rate = 0.9;
  state.speech.synth.speak(ut);
}

export function startSpeech(text) {
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

export function stopAudio() {
  if (state.speech.synth) state.speech.synth.cancel();
  state.speech.isPlaying = false;
  state.speech.isPaused = false;
  updateAudioUI(false, false);
}

export function updateAudioUI(isPlaying, isPaused) {
  const playBtn = document.getElementById('audioPlayBtn');
  const statusLabel = document.getElementById('audioStatusLabel');
  if (!playBtn || !statusLabel) return;
  if (!isPlaying) {
    playBtn.innerHTML = '<i class="fa-solid fa-play"></i> Escuchar Lectura';
    statusLabel.innerHTML = '<i class="fa-solid fa-circle-pause" style="color: var(--text-muted)"></i> Audio detenido';
  } else if (isPaused) {
    playBtn.innerHTML = '<i class="fa-solid fa-play"></i> Reanudar';
    statusLabel.innerHTML = '<i class="fa-solid fa-pause" style="color: var(--amber-500)"></i> En pausa';
  } else {
    playBtn.innerHTML = '<i class="fa-solid fa-pause"></i> Pausar';
    statusLabel.innerHTML = '<i class="fa-solid fa-volume-high" style="color: var(--emerald-500)"></i> Reproduciendo...';
  }
}
