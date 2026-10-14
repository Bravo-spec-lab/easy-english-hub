# EASY English Hub 🎓

> **Plataforma Web EdTech Interactiva para el Aprendizaje Integral de Inglés Técnico (A1 - A2)**  
> Desarrollado por **Bravo** • Estudiante de *Computación e Informática*

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript_ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Vercel](https://img.shields.io/badge/Vercel-Ready-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Responsive](https://img.shields.io/badge/Design-Responsive-success?style=for-the-badge)

---

## 🌟 Descripción General

**EASY English Hub** es una aplicación web educativa moderna diseñada como una solución integral (LMS - *Learning Management System*) para el aprendizaje del idioma inglés enfocado en carreras técnicas y profesionales.

A diferencia de las páginas de descarga tradicionales, **EASY English Hub** presenta el 100% de los contenidos directamente en pantalla a través de una experiencia interactiva, modular y multimedia que elimina la necesidad de descargar archivos estáticos (.docx, .pptx o .zip).

---

## 🚀 Características Principales

### 1. 📊 Panel de Control (Dashboard)
- Indicadores en tiempo real: lecciones completadas, promedio de evaluaciones, racha de estudio y porcentaje de progreso global.
- Acceso directo a la última lección sugerida con reanudación automática.
- Visualización organizada de los 3 módulos académicos semanales.

### 2. 📖 Aula Virtual Interactiva (18 Días de Aprendizaje)
- **Lectura Guiada con Voz Nativa:** Integración con la **Web Speech API** del navegador para escuchar la pronunciación en inglés nativo con controles de velocidad (`0.85x`, `1.0x`, `1.2x`), pausa y reinicio.
- **Diapositivas Explicativas en Pantalla:** Visor interactivo de láminas con navegación por teclado y botones, presentando reglas gramaticales, estructuras clave y ejemplos prácticos.
- **Cuaderno de Trabajo Digital (Worksheet):** Bloques de preguntas de comprensión y reflexión con persistencia local (`localStorage`) que guardan automáticamente las respuestas del usuario.
- **Recursos Complementarios:** Enlaces y recomendaciones pedagógicas estructuradas para cada día.

### 3. 📝 Hub de Evaluaciones (Quizzes en Tiempo Real)
- **18 Evaluaciones Interactivas (90 preguntas en total):** 5 preguntas por día con opciones de selección múltiple.
- **Retroalimentación Inmediata:** Corrección instantánea con explicación pedagógica por cada pregunta.
- **Cálculo y Guardado de Calificación:** Sistema de puntaje sobre 20 con almacenamiento local y actualización de estadísticas en el Dashboard.

### 4. 📚 Centro de Vocabulario y Verbos Técnicos
- **124 Términos y Verbos Clasificados:** Filtros por categoría gramatical (verbos regulares, irregulares, expresiones de tiempo, rutinas y vocabulario técnico).
- **Buscador en Tiempo Real:** Filtro rápido por palabra en inglés o español.

### 5. 🖼️ Galería Multimedia de Infografías
- Visor de pósteres y resúmenes visuales de alta resolución con modal *lightbox* para visualización a pantalla completa.

### 6. 🎨 Experiencia de Usuario & Accesibilidad
- **Tema Oscuro / Claro:** Alternancia fluida con guardado de preferencias en `localStorage`.
- **Diseño Ultra-Responsivo:** Adaptado para teléfonos inteligentes, tablets y monitores de escritorio.
- **Cero Dependencias Complejas:** Construido con tecnologías web nativas (Vanilla HTML, CSS, JavaScript) para máxima velocidad de carga y rendimiento de 100 en Lighthouse.

---

## 📂 Estructura del Proyecto

```text
EASY/
├── index.html          # Estructura principal y maquetación de las 5 vistas
├── vercel.json         # Configuración optimizada de cabeceras para Vercel
├── .gitignore          # Exclusión de archivos comprimidos y temporales
├── README.md           # Documentación completa del proyecto
├── css/
│   └── styles.css      # Sistema de diseño con variables CSS, dark mode y componentes
├── js/
│   ├── app.js          # Lógica de navegación, reproductor TTS, quizzes y estado
│   └── course-data.js  # Base de datos estructurada (18 días, 90 quizzes, slides y vocabulario)
└── archivos/           # Recursos visuales e infografías de las 3 semanas
    ├── semana-1/
    ├── semana-2/
    └── semana-3/
```

---

## 🛠️ Tecnologías Utilizadas

- **Frontend Core:** HTML5 semántico y accesible.
- **Estilos:** Vanilla CSS moderno con CSS Custom Properties (Variables), Flexbox, CSS Grid y efectos de Glassmorphism.
- **Tipografía:** Google Fonts (*Outfit* y *Plus Jakarta Sans*).
- **Iconografía:** Font Awesome 6.
- **Lógica e Interactividad:** JavaScript moderno (ES6+ modular, Web Speech API, Storage API).

---

## 💻 Ejecución Local

Para probar el proyecto en tu máquina local:

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
   - **Con Laragon / XAMPP:** Coloca la carpeta en el directorio `www` o `htdocs` y ábrelo desde tu servidor Apache local.

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
