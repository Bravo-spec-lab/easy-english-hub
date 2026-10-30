# EASY English Hub 🎓

> **Plataforma Web EdTech Interactiva para el Aprendizaje Integral de Inglés Técnico (A1 - A2)**
> Desarrollado por **Bravo** • Estudiante de *Computación e Informática*

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript_ES6_Modules-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Vercel](https://img.shields.io/badge/Vercel-Ready-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Responsive](https://img.shields.io/badge/Design-Responsive-success?style=for-the-badge)

---

## 🌟 Descripción General

**EASY English Hub** es una aplicación web educativa moderna diseñada como una solución integral (LMS - *Learning Management System*) para el aprendizaje del idioma inglés enfocado en carreras técnicas y profesionales.

Se presenta el 100% de los contenidos directamente en pantalla a través de una experiencia interactiva, modular y multimedia que elimina la necesidad de descargar archivos estáticos (.docx, .pptx o .zip).

**Arquitectura Multi-Página (MPA):** el portal está dividido en 5 páginas HTML independientes (`index.html`, `aula.html`, `quizzes.html`, `vocabulario.html`, `galeria.html`) con un layout compartido inyectado dinámicamente (`partials/app-shell.html` + `js/layout.js`) y lógica modular en **ES Modules** (JS nativo, sin bundlers).

---

## 🚀 Características Principales

### 1. 📊 Panel de Control — `index.html`
- Indicadores en tiempo real: lecciones completadas, evaluaciones rendidas, términos disponibles y racha de estudio.
- Acceso directo a la última lección sugerida con reanudación automática (`aula.html` con deep-link).
- Visualización organizada de los 4 módulos académicos (semanas del curso) con porcentaje de progreso.

### 2. 📖 Aula Virtual — `aula.html?week=N&day=D` (24 Días de Aprendizaje)
Cada día se organiza en 8 pestañas, con la lección activa registrado en la URL (`tab=`):

1. **Teoría Gramática (`tab=theory`)** — Contenido pedagógico completo por día: qué es/ cuándo usar/ formación con tablas estructurales/ reglas de escritura/ marcadores de tiempo/ errores comunes de hispanohablantes y mini-repaso guiado (`js/data/theories.js`).
2. **Lectura Asistida (`tab=reading`)** — Texto en inglés con pronunciación por **Web Speech API** (velocidades `0.8x`, `1.0x`, `1.2x`), vocabulario clave pronunciable y actividades post-lectura.
3. **Ficha Práctica (`tab=worksheet`)** — Cuaderno digital con persistencia local de respuestas.
4. **Autoevaluación Oficial (`tab=quiz`)** — 5 preguntas por día (mixtas MCQ + producción abierta). Las respuestas quedan ocultas hasta pulsar **"Calificar mi test"**: las MCQ se corrigen al instante y las abiertas muestran la respuesta modelo para autoevaluación.
5. **Reto Cronometrado (`tab=challenge`)** — 3 preguntas por día, **30 segundos por pregunta** (90s totales), reloj visible con barra que pasa a rojo al agotarse el tiempo, se pausa al salir de la pestaña, retroalimentación inmediata y **mejor marca guardada** (`easy_challenge_scores`). Semana 1 usa un banco suplementario propio (`js/data/challenge-bank.js`); las demás semanas toman sus preguntas MCQ de la autoevaluación del día.
6. **Diapositivas PPT (`tab=slides`)** — Visor interactivo de las láminas oficiales de la semana.
7. **Recursos & Práctica (`tab=resources`)** — Videos y enlaces recomendados con guía de uso en 3 pasos.
8. **Infografía del Día (`tab=poster`)** — Afiche visual de la lección con vista a pantalla completa.

- **Navegación entre días con URL real:** los botones anterior/siguiente cambian de página, el temario lateral permite saltar a cualquier día, y compartir el enlace restaura lección y pestaña exactas.
- **Botón "Marcar como Completada":** persiste el progreso en `localStorage`.

### 3. 📝 Hub de Evaluaciones — `quizzes.html`
- **Evaluaciones Oficiales (24):** tarjetas por día con estado pendiente/revisado y puntaje.
- **Acceso directo al Reto Cronometrado** de cada día (90 segundos).
- Filtro rápido por semana (Simple Present / Continuous / Simple Past / Present Perfect).

### 4. 📚 Centro de Vocabulario y Verbos — `vocabulario.html`
- **168 Términos Clasificados:** verbos regulares, irregulares, expresiones de tiempo, rutinas y vocabulario técnico.
- **Buscador Global:** la búsqueda del topbar (`vocabulario.html?q=...`) pre-filtra el laboratorio.
- **Audio pronunciable** por tarjeta con la Web Speech API.

### 5. 🖼️ Galería Multimedia — `galeria.html`
- Visitas múltiple de infografías con modal *lightbox* a pantalla completa, sin duplicados (`seenPosters`).

### 6. 🎨 Experiencia de Usuario & Accesibilidad
- **Tema Oscuro / Claro** con preferencia guardada.
- **Diseño-ultrarrresponsivo** con sidebar móvil colapsable, apilado de columnas del aula en pantallas ≤ 1400px y adaptaciones a 900px / 600px.
- **Cero dependencias complejas:** Vanilla HTML + CSS + JavaScript moderno (Web Speech API, Storage API), carga veloz y sin build.

---

## 📂 Estructura del Proyecto

```text
EASY/
├── index.html              # Dashboard: métricas, progreso y módulos académicos
├── aula.html               # Aula Virtual: 8 pestañas x 24 días (la vista principal)
├── quizzes.html            # Hub de evaluaciones oficiales + acceso al reto
├── vocabulario.html        # Laboratorio de vocabulario y verbos
├── galeria.html            # Galería de infografías y afiches
├── vercel.json             # Configuración optimizada de cabeceras para Vercel
├── .gitignore              # Exclusión de archivos comprimidos y temporales
├── README.md               # Documentación (este archivo)
├── partials/
│   └── app-shell.html      # Layout compartido (sidebar + topbar + lightbox) inyectado por layout.js
├── css/
│   └── styles.css          # Sistema de diseño: variables, dark mode y componentes
├── js/
│   ├── layout.js           # Monta el shell común alrededor de <template id="pageTemplate">
│   ├── common.js           # Estado global, tema, progreso, toasts, lightbox, TTS
│   ├── paginas/            # Lógica por página (ES Modules)
│   │   ├── dashboard.js    # index.html
│   │   ├── aula.js         # aula.html (teoría, lectura, ficha, quiz, reto, slides, recursos, póster)
│   │   ├── quizzes.js      # quizzes.html
│   │   ├── vocabulario.js  # vocabulario.html (con ?q=)
│   │   └── galeria.js      # galeria.html
│   └── data/               # Contenido y datos del curso
│       ├── course-info.js  # Metadatos del curso
│       ├── week-1.js       # Semana 1: Simple Present (6 días, cada uno: teoría implícita, lectura, ficha, quiz, recursos, póster)
│       ├── week-2.js       # Semana 2: Present & Past Continuous
│       ├── week-3.js       # Semana 3: Simple Past
│       ├── week-4.js       # Semana 4: Present Perfect
│       ├── master-vocabulary.js  # 168 términos del curso
│       ├── stats.js        # Estadísticas de contenido
│       ├── theories.js     # Teoría gramatical pedagógica (24 días)
│       ├── challenge-bank.js     # Banco suplementario MCQ del Reto (Semana 1)
│       └── index.js        # API central: COURSE_DATA, getWeek(id), getDay(weekId, dayNum)
└── archivos/               # Recursos visuales e infografías de las 4 semanas
    ├── semana-1/
    ├── semana-2/
    ├── semana-3/
    └── semana-4/           # D1 a D6: afiche PDF + PNG por día
```

---

## 🛠️ Tecnologías Utilizadas

- **Frontend Core:** HTML5 semántico con `<template>` por página y ES Modules nativos.
- **Estilos:** Vanilla CSS moderno con Custom Properties, Flexbox, CSS Grid y responsive breakpoints.
- **Tipografía:** Google Fonts (*Outfit* y *Plus Jakarta Sans*).
- **Iconografía:** Font Awesome 6.
- **Motor de Voz:** Web Speech API (SpeechSynthesis) para lectura asistida.
- **Persistencia:** Storage API (`localStorage`) para progreso, quiz, fichas, mediante claves `easy_*`.

---

## 💻 Ejecución Local

> ⚠️ **Importante:** el proyecto usa **ES Modules**, por lo que **no funciona con doble clic (`file://`)** — el navegador bloquea los módulos por CORS y verás solo el fondo oscuro. Usa cualquier servidor HTTP local:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/TU-USUARIO/easy-english-hub.git
   cd easy-english-hub
   ```

2. **Abrir con un servidor local:**
   - **Con Python:**
     ```bash
     python -m http.server 8080
     ```
     Luego ingresa a `http://localhost:8080` en tu navegador.
   - **Con VS Code:** Instala la extensión **Live Server** y haz clic en *"Go Live"*.
   - **Con Laragon / XAMPP:** Coloca la carpeta en el directorio `www` o `htdocs` y ábrelo desde `http://localhost/EASY/` (o el dominio virtual *.test* de Laragon).

---

## 🚀 Despliegue en Vercel

Este proyecto está 100% optimizado para desplegarse en **Vercel** en menos de 1 minuto:

1. Sube este repositorio a tu cuenta de **GitHub**.
2. Ingresa a [Vercel](https://vercel.com) e inicia sesión con tu cuenta de GitHub.
3. Haz clic en **"Add New..."** -> **"Project"**.
4. Selecciona el repositorio de **EASY English Hub**.
5. Deja la configuración por defecto (Vercel detecta automáticamente `index.html` y utiliza `vercel.json`).
6. Haz clic en **"Deploy"**. ¡Tu plataforma estará activa con un dominio `.vercel.app` o tu dominio personalizado!

---

## 👨‍💻 Autor

- **Desarrollador:** Bravo
- **Especialidad:** Computación e Informática
- **Propósito:** Proyecto de Innovación EdTech y Portafolio de Desarrollo Web

---

*Desarrollado con dedicación para transformar la educación técnica mediante la tecnología.*
