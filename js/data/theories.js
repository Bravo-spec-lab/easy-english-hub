/**
 * EASY English Hub - Teoría gramatical por día (base sólida)
 * Contenido didáctico en HTML. Se consulta con THEORIES['w{week}-d{day}'].
 * Desarrollado por Bravo • Computación e Informática
 */

export const THEORIES = {
  // =========================================================
  // SEMANA 1: SIMPLE PRESENT (My Professional Routine)
  // =========================================================
  'w1-d1': `
  <div class="theory-block">
    <h3><i class="fa-solid fa-compass"></i> ¿Qué vamos a aprender y por qué?</h3>
    <p>Este primer día es tu <strong>diagnóstico de partida</strong>: una revisión de los cimientos del inglés que usarás durante todo el curso. Antes de construir la gramática del Presente Simple, necesitas dominar tres bloques: los <strong>pronombres personales</strong>, el verbo <strong>to be</strong> y los <strong>verbos de acción</strong>.</p>
  </div>

  <div class="theory-block">
    <h3><i class="fa-solid fa-users"></i> 1. Subject Pronouns (Pronombres personales)</h3>
    <table class="theory-table">
      <tr><th>Pronombre</th><th>Significado</th></tr>
      <tr><td>I</td><td>yo</td></tr>
      <tr><td>You</td><td>tú / usted / ustedes</td></tr>
      <tr><td>He / She / It</td><td>él / ella / eso (objetos, animales, situaciones)</td></tr>
      <tr><td>We</td><td>nosotros</td></tr>
      <tr><td>They</td><td>ellos / ellas</td></tr>
    </table>
    <p>El pronombre define la forma del verbo: por eso siempre escríbelo y piénsalo primero. En inglés el sujeto <strong>nunca se omite</strong>, a diferencia del español ("I study", no "study").</p>
  </div>

  <div class="theory-block">
    <h3><i class="fa-solid fa-anchor"></i> 2. El verbo To Be (conocimiento previo)</h3>
    <p>En esta unidad el to be solo aparece como repaso: <strong>am</strong> (I), <strong>is</strong> (he/she/it), <strong>are</strong> (you/we/they). Sirve para describir identidad y estados: <em>"I am a student." / "She is at work."</em> Los verbos de acción (study, work...) <strong>no</strong> llevan to be en presente simple.</p>
  </div>

  <div class="theory-block">
    <h3><i class="fa-solid fa-person-running"></i> 3. Action Verbs (Verbos de acción)</h3>
    <p>En su forma base (infinitivo sin <em>to</em>) expresan lo que alguien hace: <em>study, work, use, prepare, check, organize, read, write, attend, practice</em>. Esta unidad los presenta en primera persona (yo); desde el Día 2 profundizaremos en cómo cambian con he/she/it.</p>
  </div>

  <div class="theory-block">
    <h3><i class="fa-solid fa-building"></i> Conserva tu contexto</h3>
    <p>Toda esta primera semana trata de tu <strong>rutina académica y laboral</strong>: horarios (in the evening, at 8:00 a.m., every morning), actividades diarias y propósito profesional. Lee el texto del día buscando esos rasgos; son la "señal" que activa el presente simple.</p>
  </div>

  <div class="theory-warn">
    <strong><i class="fa-solid fa-triangle-exclamation"></i> Errores típicos a evitar:</strong>
    <ul>
      <li>Omitir el sujeto: ✗ "Check my messages at work" → ✓ "I check my messages at work."</li>
      <li>Confundir "I'm work" con "I work": el verbo de acción no lleva am/is/are.</li>
      <li>Escribir el verbo con "to" después del sujeto: ✗ "I to study" → ✓ "I study."</li>
    </ul>
  </div>

  <div class="theory-tip">
    <strong><i class="fa-solid fa-lightbulb"></i> Mini-repaso guiado:</strong> completa oralmente sin mirar: "I ___ a student at a technical institute." / "Every morning I ___ my messages." Si lo lograste, estás listo para el Día 2.
  </div>
  `,

  'w1-d2': `
  <div class="theory-block">
    <h3><i class="fa-solid fa-book"></i> ¿Qué es el Presente Simple?</h3>
    <p>Es el tiempo verbal que usamos para hablar de <strong>rutinas, hábitos, horarios y verdades permanentes</strong>. Es el tiempo del "siempre, todos los días, normalmente". Ejemplo central de la unidad: <em>"Carla checks emails and helps customers every day."</em></p>
  </div>

  <div class="theory-block">
    <h3><i class="fa-solid fa-calendar-check"></i> ¿Cuándo lo usamos?</h3>
    <ul class="theory-list">
      <li><strong>Rutinas y hábitos:</strong> <em>"She starts work at 9:00 a.m."</em></li>
      <li><strong>Hechos generales:</strong> <em>"English supports her career."</em></li>
      <li><strong>Horarios fijos:</strong> <em>"On Tuesdays, she attends the virtual session."</em></li>
      <li><strong>Gustos y preferencias estables:</strong> <em>"Carla studies English."</em></li>
    </ul>
  </div>

  <div class="theory-block">
    <h3><i class="fa-solid fa-pen-to-square"></i> ¿Cómo se forma la afirmativa?</h3>
    <p>Sujeto + <strong>verbo base</strong> (+ complemento). Con la mayoría de sujetos el verbo no cambia; solo he/she/it añade una marca:</p>
    <table class="theory-table">
      <tr><th>Sujeto</th><th>Verbo</th><th>Ejemplo</th></tr>
      <tr><td>I / You / We / They</td><td>work</td><td>I work during the day.</td></tr>
      <tr><td>He / She / It</td><td>work<strong>s</strong></td><td>Carla <strong>works</strong> in a small company.</td></tr>
    </table>
    <p><strong>La regla de oro:</strong> solo los sujetos <em>he, she, it</em> (tercera persona del singular) añaden <strong>-s</strong> al verbo.</p>
  </div>

  <div class="theory-block">
    <h3><i class="fa-solid fa-spell-check"></i> Reglas de escritura de la -s</h3>
    <table class="theory-table">
      <tr><th>Regla</th><th>Verbo</th><th>Forma -s</th></tr>
      <tr><td>General: añadir -s</td><td>check</td><td>check<strong>s</strong></td></tr>
      <tr><td>Termina en -o, -s, -x, -ch, -sh → añadir <strong>-es</strong></td><td>go / watch / fix</td><td>go<strong>es</strong>, watch<strong>es</strong>, fix<strong>es</strong></td></tr>
      <tr><td>Consonante + <strong>y</strong> → cambia a <strong>-ies</strong></td><td>study</td><td>stud<strong>ies</strong></td></tr>
      <tr><td>Vocal + y → solo -s</td><td>play</td><td>play<strong>s</strong></td></tr>
      <tr><td>Irregular único</td><td>have</td><td><strong>has</strong></td></tr>
    </table>
  </div>

  <div class="theory-block">
    <h3><i class="fa-regular fa-clock"></i> Marcadores de tiempo típicos</h3>
    <p><em>every day</em>, <em>every morning</em>, <em>always</em>, <em>on Tuesdays</em>, <em>usually</em>, <em>at 9:00 a.m.</em>, <em>in the evening</em>. Su presencia en un texto es la señal que confirma el presente simple.</p>
  </div>

  <div class="theory-warn">
    <strong><i class="fa-solid fa-triangle-exclamation"></i> Errores típicos a evitar:</strong>
    <ul>
      <li>Olvidar la -s en tercera persona: ✗ "She check emails" → ✓ "She check<strong>s</strong> emails."</li>
      <li>Añadir -s cuando no corresponde: ✗ "I works" → ✓ "I work."</li>
      <li>Escribir "studys" en vez de "studies" (la y después de consonante cambia a ies).</li>
    </ul>
  </div>

  <div class="theory-tip">
    <strong><i class="fa-solid fa-lightbulb"></i> Mini-repaso guiado:</strong> describe tu propia rutina en 3 frases: una con <em>I</em>, otra con <em>She/He</em> (¡recuerda la -s!) y otra con un marcador de tiempo como <em>on Tuesdays</em>.
  </div>
  `,

  'w1-d3': `
  <div class="theory-block">
    <h3><i class="fa-solid fa-ban"></i> La negación en Presente Simple</h3>
    <p>Para decir lo que alguien <strong>no</strong> hace, el inglés necesita un <strong>auxiliar</strong>. Ese auxiliar depende del sujeto:</p>
    <table class="theory-table">
      <tr><th>Sujeto</th><th>Auxiliar</th><th>Forma completa</th><th>Contracción</th></tr>
      <tr><td>I / You / We / They</td><td>do</td><td>do not</td><td>don't</td></tr>
      <tr><td>He / She / It</td><td>does</td><td>does not</td><td>doesn't</td></tr>
    </table>
    <p><strong>Estructura:</strong> Sujeto + don't/doesn't + <strong>verbo base</strong> + complemento.</p>
    <p><em>"Diego <strong>doesn't</strong> repair every machine." / "He <strong>doesn't</strong> work on Sundays." / "Her coworkers <strong>don't</strong> arrive late."</em></p>
  </div>

  <div class="theory-block">
    <h3><i class="fa-solid fa-key"></i> La regla más importante del día</h3>
    <p>Cuando aparece <strong>doesn't</strong>, la <strong>-s del verbo desaparece</strong>. El auxiliar "does" ya carga la tercera persona, y el verbo vuelve a su forma base:</p>
    <p>✓ "She check<strong>s</strong> equipment." (afirmativa con -s)<br>✓ "She <strong>doesn't check</strong> equipment." (negativa sin -s)</p>
    <p>El inglés reparte la "marca de 3ª persona" en una sola pieza: o la lleva el verbo (afirmativa), o la lleva el auxiliar (negativa / pregunta) — <strong>nunca ambas</strong>.</p>
  </div>

  <div class="theory-block">
    <h3><i class="fa-solid fa-rotate"></i> Contracciones en contexto real</h3>
    <p>Las contracciones (<em>don't</em>, <em>doesn't</em>) son lo normal al hablar y escribir de manera informal. La forma completa (do not / does not) suena más formal o más enfática: <em>"He does not work on Sundays." = "He doesn't work on Sundays."</em></p>
  </div>

  <div class="theory-warn">
    <strong><i class="fa-solid fa-triangle-exclamation"></i> Errores típicos a evitar:</strong>
    <ul>
      <li>Doblar la tercera persona: ✗ "He doesn't works" → ✓ "He doesn't work."</li>
      <li>Usar el auxiliar equivocado: ✗ "She don't" → ✓ "She doesn't."</li>
      <li>Usar "no" a lo español: ✗ "She no works" → ✓ "She doesn't work."</li>
    </ul>
  </div>

  <div class="theory-tip">
    <strong><i class="fa-solid fa-lightbulb"></i> Mini-repaso guiado:</strong> toma tu rutina del Día 2 y transforma dos frases en negativas — una con <em>don't</em> y otra con <em>doesn't + verbo sin -s</em>.
  </div>
  `,

  'w1-d4': `
  <div class="theory-block">
    <h3><i class="fa-solid fa-circle-question"></i> Preguntas de Sí/No con Do y Does</h3>
    <p>Para preguntar por rutinas, el inglés <strong>mueve el auxiliar al inicio</strong> de la oración. Ese auxiliar es el mismo de las negativas: <strong>do</strong> (I/you/we/they) y <strong>does</strong> (he/she/it).</p>
    <p><strong>Estructura:</strong> Do/Does + sujeto + <strong>verbo base</strong> + ... ?</p>
    <table class="theory-table">
      <tr><th>Pregunta</th><th>Respuesta corta</th></tr>
      <tr><td><strong>Do</strong> you work in the morning?</td><td>Yes, I <strong>do</strong>. / No, I <strong>don't</strong>.</td></tr>
      <tr><td><strong>Do</strong> they study at this institute?</td><td>Yes, they <strong>do</strong>. / No, they <strong>don't</strong>.</td></tr>
      <tr><td><strong>Does</strong> your sister study here?</td><td>Yes, she <strong>does</strong>. / No, she <strong>doesn't</strong>.</td></tr>
    </table>
  </div>

  <div class="theory-block">
    <h3><i class="fa-solid fa-arrows-rotate"></i> La regla espejo</h3>
    <p>Las preguntas siguen el mismo reparto que las negativas: cuando actúa <strong>does</strong>, el verbo va en <strong>forma base (sin -s)</strong>:</p>
    <p>✓ "Does she stud<strong>y</strong> at this institute?" (pregunta con base)<br>✓ "She stud<strong>ies</strong> at this institute." (afirmativa con -s)</p>
  </div>

  <div class="theory-block">
    <h3><i class="fa-solid fa-clipboard-check"></i> Respuestas cortas: el estándar natural</h3>
    <p>En inglés no contestamos repitiendo toda la oración: usamos la <strong>respuesta corta</strong> con el auxiliar, nunca con el verbo: <em>"Do you start at 8:00?" — "Yes, I do."</em> Y en el texto del día: <em>"Does your sister study at this institute?" — "No, she doesn't. She studies at another institute."</em></p>
  </div>

  <div class="theory-block">
    <h3><i class="fa-solid fa-magnifying-glass"></i> Preguntas por información, no solo Sí/No</h3>
    <p>Cuando agregamos una palabra interrogativa (What time, When, Where), esta se antepone al auxiliar: <em>"<strong>What time do</strong> you start?" — "I start at 8:00."</em> El orden interno (auxiliar + sujeto + verbo base) no cambia.</p>
  </div>

  <div class="theory-warn">
    <strong><i class="fa-solid fa-triangle-exclamation"></i> Errores típicos a evitar:</strong>
    <ul>
      <li>Doble 3ª persona: ✗ "Does she works?" → ✓ "Does she work?"</li>
      <li>Olvidar el auxiliar: ✗ "You work in the morning?" → ✓ "Do you work in the morning?"</li>
      <li>Españolismo en la respuesta: ✗ "Yes, I work." → ✓ "Yes, I do."</li>
    </ul>
  </div>

  <div class="theory-tip">
    <strong><i class="fa-solid fa-lightbulb"></i> Mini-repaso guiado:</strong> hazle a un compañero (o a ti mismo) 3 preguntas con Do/Does sobre su rutina y respóndelas con respuestas cortas.
  </div>
  `,

  'w1-d5': `
  <div class="theory-block">
    <h3><i class="fa-solid fa-gauge-high"></i> Adverbios de frecuencia: ¿para qué sirven?</h3>
    <p>Complementan el presente simple <strong>diciendo con qué precisión ocurre un hábito</strong>. Van de lo más constante a lo más raro:</p>
    <table class="theory-table">
      <tr><th>Adverbio</th><th>Frecuencia</th><th>Ejemplo del texto</th></tr>
      <tr><td>always</td><td>100%</td><td>She <strong>always</strong> checks her schedule.</td></tr>
      <tr><td>usually</td><td>~80%</td><td>She <strong>usually</strong> studies before work.</td></tr>
      <tr><td>often</td><td>~60%</td><td>She <strong>often</strong> listens to English on her phone.</td></tr>
      <tr><td>sometimes</td><td>~30%</td><td>She <strong>sometimes</strong> practices with a friend.</td></tr>
      <tr><td>rarely</td><td>~10%</td><td>She <strong>rarely</strong> misses an assignment.</td></tr>
      <tr><td>never</td><td>0%</td><td>She <strong>never</strong> ignores deadlines.</td></tr>
    </table>
  </div>

  <div class="theory-block">
    <h3><i class="fa-solid fa-location-arrow"></i> Posición: la regla que más importa</h3>
    <p><strong>1. Antes del verbo principal</strong> (el caso más común):</p>
    <p>✓ "She <strong>usually studies</strong> before work." (adverbio + verbo)</p>
    <p><strong>2. Después del verbo to be</strong> (am/is/are):</p>
    <p>✓ "She <strong>is always</strong> on time." (to be + adverbio)</p>
    <p>Memorízalo así: <em>el adverbio se pega al verbo... y el to be lo "bulea" (se interpone).</em></p>
  </div>

  <div class="theory-block">
    <h3><i class="fa-regular fa-calendar-days"></i> Expresiones de frecuencia</h3>
    <p>A diferencia de los adverbios, las <strong>expresiones</strong> (<em>every day</em>, <em>once a week</em>, <em>on Saturdays</em>, <em>twice a month</em>) van al <strong>final</strong> de la oración y también pueden ir al inicio para enfatizar: <em>"On Saturdays, she reviews the week's materials."</em></p>
  </div>

  <div class="theory-warn">
    <strong><i class="fa-solid fa-triangle-exclamation"></i> Errores típicos a evitar:</strong>
    <ul>
      <li>Posición al final: ✗ "She checks her schedule always" → ✓ "She <strong>always</strong> checks her schedule."</li>
      <li>Entre sujeto y to be: ✗ "She always is on time" → ✓ "She <strong>is always</strong> on time."</li>
      <li>Mala combinación con complementos: ✓ "She often practices with a friend <strong>after class</strong>." (el adverbio antes del verbo, la expresión de tiempo al final).</li>
    </ul>
  </div>

  <div class="theory-tip">
    <strong><i class="fa-solid fa-lightbulb"></i> Mini-repaso guiado:</strong> toma 6 actividades de tu semana y crea una oración por nivel de frecuencia: desde <em>always</em> hasta <em>never</em>. Verifica la posición del adverbio en cada una.
  </div>
  `,

  'w1-d6': `
  <div class="theory-block">
    <h3><i class="fa-solid fa-puzzle-piece"></i> Día de integración: la caja completa</h3>
    <p>Hoy unes todo lo de la semana para <strong>producir tu propia rutina profesional</strong> con el presente simple. Este es el sistema completo en un vistazo:</p>
    <table class="theory-table">
      <tr><th>Tipo</th><th>Estructura</th><th>Ejemplo</th></tr>
      <tr><td>Afirmativa</td><td>S + verbo (+s en he/she/it)</td><td>I study / She work<strong>s</strong></td></tr>
      <tr><td>Negativa</td><td>S + don't/doesn't + verbo base</td><td>I <strong>don't</strong> study only for exams</td></tr>
      <tr><td>Pregunta Sí/No</td><td>Do/Does + S + verbo base</td><td><strong>Do</strong> I make mistakes?</td></tr>
      <tr><td>Respuesta corta</td><td>Yes, S + do/does. / No, S + don't/doesn't.</td><td>Yes, I <strong>do</strong></td></tr>
      <tr><td>+ Frecuencia</td><td>adverbio antes del verbo</td><td>I <strong>usually</strong> organize my week</td></tr>
      <tr><td>+ Tiempo</td><td>expresión al final (o al inicio con coma)</td><td>... <strong>every day</strong>.</td></tr>
    </table>
  </div>

  <div class="theory-block">
    <h3><i class="fa-solid fa-link"></i> Conectores para una rutina fluida</h3>
    <p>El texto del día encadena actividades con <em>and</em> (suma), <em>but</em> (contraste) y <em>because</em> (causa): <em>"I don't study only for exams; I use it to understand instructions."</em> Usarlos hace que tu producción suene natural y no a lista de oraciones sueltas.</p>
  </div>

  <div class="theory-block">
    <h3><i class="fa-solid fa-list-check"></i> Lista de verificación antes de entregar</h3>
    <ul class="theory-list">
      <li>¿Cada oración tiene sujeto explícito?</li>
      <li>¿La -s aparece solo en he/she/it (afirmativa)?</li>
      <li>¿En negativas y preguntas el verbo quedó en forma base?</li>
      <li>¿Usaste al menos un adverbio de frecuencia bien ubicado?</li>
      <li>¿Incluiste marcadores de tiempo (every day, on Sundays, at night)?</li>
    </ul>
  </div>

  <div class="theory-warn">
    <strong><i class="fa-solid fa-triangle-exclamation"></i> Errores típicos a evitar en la producción libre:</strong>
    <ul>
      <li>Regla por verbo: cada verbo conjugado de 3ª persona necesita su marca: ✗ "She study and works" → ✓ "She stud<strong>ies</strong> and work<strong>s</strong>."</li>
      <li>Preguntas sin auxiliar: "Do I make mistakes?" está bien; "I make mistakes?" suena a duda, no a pregunta.</li>
      <li>Sobrecargar always/never en todo (pierde credibilidad): alterna usually, often, sometimes.</li>
    </ul>
  </div>

  <div class="theory-tip">
    <strong><i class="fa-solid fa-lightbulb"></i> Proyecto del día:</strong> escribe tu rutina personal en 8-10 oraciones con <strong>afirmativa, negativa, frecuencia y tiempo</strong>. Ese texto será tu "carnet" de la semana.
  </div>
  `,

  // =========================================================
  // SEMANA 2: PRESENT & PAST CONTINUOUS
  // =========================================================
  'w2-d1': `
  <div class="theory-block">
    <h3><i class="fa-solid fa-film"></i> ¿Qué es el Present Continuous?</h3>
    <p>Es el tiempo de la <strong>cámara en vivo</strong>: describe acciones que están <strong>pasando ahora</strong>, en este momento o alrededor del presente. Con él, el texto del día pone la escena: <em>"It is 4 p.m. and students are learning through practical activities."</em></p>
  </div>

  <div class="theory-block">
    <h3><i class="fa-solid fa-video"></i> ¿Cuándo lo usamos? (3 usos oficiales)</h3>
    <ul class="theory-list">
      <li><strong>Ahora mismo:</strong> <em>"Ana is reading patient-care information now."</em></li>
      <li><strong>Alrededor del presente</strong> (período actual, no exactamente en este segundo): <em>"This week, they are preparing short presentations."</em></li>
      <li><strong>Situaciones temporales</strong> (no rutinas permanentes): lo que ocurre hoy, pero no siempre.</li>
    </ul>
    <p><strong>Contraste clave:</strong> "She <strong>checks</strong> patients every day" (rutina, Presente Simple) vs. "She <strong>is checking</strong> a patient's pulse right now" (en curso, Presente Continuo).</p>
  </div>

  <div class="theory-block">
    <h3><i class="fa-solid fa-gears"></i> ¿Cómo se forma la afirmativa?</h3>
    <p><strong>Sujeto + to be (am/is/are) + verbo-ing</strong>. El to be se conjuga por persona, como siempre:</p>
    <table class="theory-table">
      <tr><th>Sujeto</th><th>to be</th><th>Ejemplo</th></tr>
      <tr><td>I</td><td>am</td><td>I <strong>am</strong> studying.</td></tr>
      <tr><td>He / She / It</td><td>is</td><td>Carla <strong>is</strong> checking an engine.</td></tr>
      <tr><td>You / We / They</td><td>are</td><td>The students <strong>are</strong> practising together.</td></tr>
    </table>
  </div>

  <div class="theory-block">
    <h3><i class="fa-solid fa-spell-check"></i> Reglas de escritura del -ing</h3>
    <table class="theory-table">
      <tr><th>Regla</th><th>Verbo</th><th>Forma -ing</th></tr>
      <tr><td>General: añadir -ing</td><td>read</td><td>read<strong>ing</strong></td></tr>
      <tr><td>Termina en -e muda → se cae la e</td><td>write / make</td><td>writ<strong>ing</strong>, mak<strong>ing</strong></td></tr>
      <tr><td>Consonante-vocal-consonante (CVC) con acento final → se dobla la consonante</td><td>swim</td><td>swim<strong>m</strong>ing</td></tr>
      <tr><td>Excepción: la w final no se dobla</td><td>show</td><td>show<strong>ing</strong></td></tr>
      <tr><td>Termina en -ie → cambia a -ying</td><td>lie</td><td>l<strong>y</strong>ing</td></tr>
    </table>
  </div>

  <div class="theory-block">
    <h3><i class="fa-regular fa-clock"></i> Marcadores de tiempo típicos</h3>
    <p><em>now</em>, <em>right now</em>, <em>at the moment</em>, <em>today</em>, <em>this week</em>, <em>currently</em>. Si el marcador habla de un "presente en marcha", activa el continuo.</p>
  </div>

  <div class="theory-warn">
    <strong><i class="fa-solid fa-triangle-exclamation"></i> Errores típicos a evitar:</strong>
    <ul>
      <li>Olvidar el to be: ✗ "Ana reading now" → ✓ "Ana <strong>is</strong> reading now."</li>
      <li>Usar el presente simple para lo inmediato: ✗ "She checks a patient right now" (suena a rutina) → ✓ "She <strong>is checking</strong> a patient right now."</li>
      <li>Poner to be + verbo base: ✗ "She is read" → ✓ "She is read<strong>ing</strong>."</li>
    </ul>
  </div>

  <div class="theory-tip">
    <strong><i class="fa-solid fa-lightbulb"></i> Mini-repaso guiado:</strong> mira alrededor tuyo y describe mentalmente en inglés 5 acciones que están ocurriendo AHORA. Ese es tu "GPS del presente continuo" del día.
  </div>
  `,

  'w2-d2': `
  <div class="theory-block">
    <h3><i class="fa-solid fa-rotate-left"></i> Preguntas y negativas del Present Continuous</h3>
    <p>Hay una buena noticia: <strong>no necesitas do/does ni don't/doesn't</strong>. El verbo <strong>to be</strong> que ya está en la oración hace todo el trabajo: se <strong>mueve</strong> para preguntar y se <strong>niega</strong> para el negativo.</p>
  </div>

  <div class="theory-block">
    <h3><i class="fa-solid fa-diagram-project"></i> La máquina de transformación</h3>
    <p>Partiendo de una afirmativa, haz tres movimientos con el mismo to be:</p>
    <table class="theory-table">
      <tr><th>Tipo</th><th>Movimiento</th><th>Ejemplo</th></tr>
      <tr><td>Afirmativa</td><td>—</td><td>She <strong>is</strong> writing a report.</td></tr>
      <tr><td>Negativa</td><td>añadir <strong>not</strong> después del to be</td><td>She <strong>isn't</strong> writing a report.</td></tr>
      <tr><td>Pregunta Sí/No</td><td>el to be <strong>salta</strong> delante del sujeto</td><td><strong>Is she</strong> writing a report?</td></tr>
      <tr><td>Respuesta corta</td><td>el to be responde solo</td><td>Yes, she <strong>is</strong>. / No, she <strong>isn't</strong>.</td></tr>
    </table>
  </div>

  <div class="theory-block">
    <h3><i class="fa-solid fa-scissors"></i> Contracciones en negativas</h3>
    <p>Las contracciones de negación se forman sobre el to be, no sobre el verbo-ing: <em>is not → isn't / are not → aren't</em>. En preguntas, el -ing queda fijo detrás del sujeto: <em>"Are they working together?"</em></p>
  </div>

  <div class="theory-block">
    <h3><i class="fa-solid fa-comments"></i> En el contexto del texto</h3>
    <p>Notarás el patrón pregunta-respuesta en pares: alguien pregunta Sí/No y la respuesta corrige la acción: <em>"Is she writing a report? No, she isn't. She is checking the patient's pulse."</em> Es una conversación profesional de verificación típica (checklists y supervisión).</p>
  </div>

  <div class="theory-warn">
    <strong><i class="fa-solid fa-triangle-exclamation"></i> Errores típicos a evitar:</strong>
    <ul>
      <li>Usar do en el continuo: ✗ "Does she checking?" → ✓ "Is she checking?"</li>
      <li>Contracción sobre el verbo: no existe; solo los to be se contraen → ✓ "She isn't checking."</li>
      <li>Respuesta corta sin sujeto: ✗ "Yes, is." → ✓ "Yes, she is."</li>
    </ul>
  </div>

  <div class="theory-tip">
    <strong><i class="fa-solid fa-lightbulb"></i> Mini-repaso guiado:</strong> escoge 3 afirmativas de la lectura del día y transfórmalas: una en negativa, una en pregunta Sí/No y una con respuesta corta negativa.
  </div>
  `,

  'w2-d3': `
  <div class="theory-block">
    <h3><i class="fa-solid fa-circle-dot"></i> WH-questions en Present Continuous</h3>
    <p>Cuando la pregunta busca <strong>información</strong> (no solo Sí/No), se abre con una palabra WH y detrás va el to be. La estructura es fija:</p>
    <p><strong>Palabra WH + to be (am/is/are) + sujeto + verbo-ing + ... ?</strong></p>
    <table class="theory-table">
      <tr><th>WH</th><th>Pregunta</th><th>Respuesta esperada</th></tr>
      <tr><td>What</td><td>What <strong>is</strong> Daniel <strong>doing</strong>?</td><td>He is swimming. (acción)</td></tr>
      <tr><td>Where</td><td>Where <strong>is</strong> he <strong>swimming</strong>?</td><td>At the sports centre. (lugar)</td></tr>
      <tr><td>Why</td><td>Why <strong>is</strong> he <strong>practising</strong>?</td><td>Because he is preparing for a competition. (causa)</td></tr>
      <tr><td>Who</td><td>Who is watching from the side?</td><td>Lucía. (persona)</td></tr>
    </table>
  </div>

  <div class="theory-block">
    <h3><i class="fa-solid fa-star"></i> La pregunta-sello del continuo</h3>
    <p><strong>"What are you doing?"</strong> es la fórmula universal para "¿qué estás haciendo?". El verbo <em>doing</em> casi siempre acompaña en este patrón, y la respuesta repite la estructura: <em>"What is Daniel doing?" — "He is swimming."</em></p>
  </div>

  <div class="theory-block">
    <h3><i class="fa-solid fa-code-branch"></i> El orden mental de cualquier pregunta WH</h3>
    <p>Recuerda el diagrama completo del inglés interrogativo (funciona en todos los tiempos):</p>
    <p>WH-word → auxiliar/to be → sujeto → verbo → resto.</p>
    <p>En presente simple el hueco del auxiliar lo ocupa <em>do/does</em>; en el continuo lo ocupa <em>am/is/are</em>. Cambia el tiempo y cambia el auxiliar, pero la lógica es una sola.</p>
  </div>

  <div class="theory-warn">
    <strong><i class="fa-solid fa-triangle-exclamation"></i> Errores típicos a evitar:</strong>
    <ul>
      <li>Meter do donde no va: ✗ "What does he doing?" → ✓ "What is he doing?"</li>
      <li>Olvidar el -ing en la respuesta: ✗ "He swims now" → ✓ "He is swimming (now)."</li>
      <li>Invertir auxiliar y sujeto con WH: ✗ "What Daniel is doing?" → ✓ "What <strong>is Daniel</strong> doing?" (WH + be + sujeto).</li>
    </ul>
  </div>

  <div class="theory-tip">
    <strong><i class="fa-solid fa-lightbulb"></i> Mini-repaso guiado:</strong> elige a alguien que esté "haciendo algo" frente a ti y descríbelo con las 3 preguntas estrella: <em>What is he/she doing? Where is he/she doing it? Why is he/she doing it?</em>
  </div>
  `,

  'w2-d4': `
  <div class="theory-block">
    <h3><i class="fa-solid fa-clock-rotate-left"></i> ¿Qué es el Past Continuous?</h3>
    <p>Es la misma idea del Presente Continuo, pero proyectada al <strong>pasado</strong>: una acción que <strong>estaba en curso</strong> en un momento concreto del pasado. No dice que terminó en ese punto: dice que estaba sucediendo.</p>
    <p><em>"Yesterday at 3 p.m., Valeria was studying a patient-care guide."</em> A las 3, la acción estaba en marcha.</p>
  </div>

  <div class="theory-block">
    <h3><i class="fa-solid fa-stopwatch"></i> ¿Cuándo lo usamos?</h3>
    <ul class="theory-list">
      <li><strong>Acción en progreso en un momento puntual del pasado:</strong> <em>"At 3 p.m., she was still studying."</em></li>
      <li><strong>Fondo de una escena</strong> (varias acciones simultáneas): <em>"Everyone was concentrating on a different task."</em></li>
      <li><strong>Situaciones interrumpidas</strong> (se profundiza en W2-D6): la acción en marcha recibe la visita de otra acción breve.</li>
    </ul>
    <p><strong>Contraste absoluto:</strong> el <em>Simple Past</em> describe la acción <strong>terminada</strong> ("Later, Valeria <strong>finished</strong> reading"); el Past Continuous muestra la acción <strong>en marcha</strong> ("at 3 p.m. she <strong>was still studying</strong>").</p>
  </div>

  <div class="theory-block">
    <h3><i class="fa-solid fa-gears"></i> ¿Cómo se forma?</h3>
    <p><strong>Sujeto + was/were + verbo-ing</strong>. (El mismo -ing que aprendiste en W2-D1.)</p>
    <table class="theory-table">
      <tr><th>Sujeto</th><th>Pasado de to be</th><th>Ejemplo</th></tr>
      <tr><td>I / He / She / It</td><td>was</td><td>Mateo <strong>was</strong> organising medicine boxes.</td></tr>
      <tr><td>You / We / They</td><td>were</td><td>Two IT students <strong>were</strong> working on a project.</td></tr>
    </table>
  </div>

  <div class="theory-block">
    <h3><i class="fa-regular fa-clock"></i> Marcadores de tiempo</h3>
    <p><em>yesterday at 3 p.m.</em>, <em>at that moment</em>, <em>at the same time</em>, <em>while</em>. La referencia puntual ("en ese instante del pasado") es la señal del Past Continuous.</p>
  </div>

  <div class="theory-warn">
    <strong><i class="fa-solid fa-triangle-exclamation"></i> Errores típicos a evitar:</strong>
    <ul>
      <li>Mezclar was/were: ✗ "They was working" → ✓ "They <strong>were</strong> working." (was = I/he/she/it; were = you/we/they).</li>
      <li>Intentar negar con didn't: ✗ "They didn't were working" → la negativa es directa: ✓ "They weren't working."</li>
      <li>Confundir el momento: si el sentido es "estaba estudiando en ese instante": ✓ "She <strong>was studying</strong> at 3 p.m." (no "She studied at 3 p.m. en progreso").</li>
    </ul>
  </div>

  <div class="theory-tip">
    <strong><i class="fa-solid fa-lightbulb"></i> Mini-repaso guiado:</strong> elige una hora de ayer y describe qué <strong>estabas haciendo</strong> tú y dos personas más en ese instante. Tres oraciones con was y tres con were.
  </div>
  `,

  'w2-d5': `
  <div class="theory-block">
    <h3><i class="fa-solid fa-arrows-left-right-to-circle"></i> Día de transformación: un sistema, cuatro salidas</h3>
    <p>Tomemos del texto: <strong>"Andrea was organising medicine labels."</strong> En el Past Continuous, toda transformación gira en torno al <strong>to be en pasado</strong> (was/were), igual que en el Present Continuous — solo cambia el auxiliar:</p>
    <table class="theory-table">
      <tr><th>Tipo</th><th>Movimiento</th><th>Ejemplo</th></tr>
      <tr><td>Afirmativa</td><td>—</td><td>Andrea <strong>was</strong> organising the labels.</td></tr>
      <tr><td>Pregunta Sí/No</td><td>to be <strong>salta</strong> delante del sujeto</td><td><strong>Was Andrea</strong> organising the labels?</td></tr>
      <tr><td>Respuesta corta</td><td>to be responde solo</td><td>Yes, she <strong>was</strong>. / No, she <strong>wasn't</strong>.</td></tr>
      <tr><td>Negativa</td><td><strong>not</strong> después del to be (wasn't/weren't)</td><td>He <strong>wasn't</strong> preparing medicine.</td></tr>
    </table>
  </div>

  <div class="theory-block">
    <h3><i class="fa-solid fa-square-root-variable"></i> La lógica que se repite</h3>
    <p>Fíjate en el patrón constante de los tiempos "progresivos" (con -ing):</p>
    <ul class="theory-list">
      <li>Preguntar = <strong>invertir el auxiliar</strong> (el to be sale adelante).</li>
      <li>Negar = <strong>añadir not</strong> al auxiliar (contracciones isn't / aren't / wasn't / weren't).</li>
      <li>El <strong>verbo-ing nunca cambia</strong> en las transformaciones.</li>
    </ul>
    <p>Esto se diferencia del presente <em>simple</em>, donde las transformaciones dependen de do/does/did. En los tiempos continuos, el to be lo resuelve todo.</p>
  </div>

  <div class="theory-block">
    <h3><i class="fa-solid fa-user-group"></i> Preguntas en plural: Were they...?</h3>
    <p>Con sujetos plurales (we/you/they) el auxiliar pasa a <strong>were</strong>: <em>"<strong>Were they</strong> writing a report?" — "No, <strong>they weren't</strong>. They were reviewing records."</em> La respuesta corta mantiene were/weren't, nunca un do/did.</p>
  </div>

  <div class="theory-warn">
    <strong><i class="fa-solid fa-triangle-exclamation"></i> Errores típicos a evitar:</strong>
    <ul>
      <li>Contaminar con did: ✗ "Did she was organising?" → ✓ "Was she organising?"</li>
      <li>Respuesta corta con verbo: ✗ "Yes, she organising" → ✓ "Yes, she was."</li>
      <li>Perder el to be en la negativa: ✗ "He not preparing" → ✓ "He <strong>wasn't</strong> preparing (medicine)."</li>
    </ul>
  </div>

  <div class="theory-tip">
    <strong><i class="fa-solid fa-lightbulb"></i> Mini-repaso guiado:</strong> toma 4 frases de la lectura y conviértelas en las 4 salidas del sistema: afirmativa, pregunta Sí/No, respuesta corta y negativa. Modo cuádruple activado.
  </div>
  `,

  'w2-d6': `
  <div class="theory-block">
    <h3><i class="fa-solid fa-circle-info"></i> WH-questions en Past Continuous</h3>
    <p>La estructura WH del continuo, proyectada al pasado: <strong>WH + was/were + sujeto + verbo-ing</strong>.</p>
    <table class="theory-table">
      <tr><th>WH</th><th>Pregunta</th><th>Respuesta</th></tr>
      <tr><td>What</td><td>What <strong>was</strong> Elena <strong>checking</strong>?</td><td>She was checking a chart.</td></tr>
      <tr><td>Where</td><td>Where <strong>was</strong> he <strong>working</strong>?</td><td>In the pharmacy lab.</td></tr>
      <tr><td>Why</td><td>Why were they testing an application?</td><td>Because... (causa)</td></tr>
    </table>
  </div>

  <div class="theory-block">
    <h3><i class="fa-solid fa-code-merge"></i> WHEN vs WHILE: los dos conectores del día</h3>
    <p>Este es el <strong>gran tema del día</strong>: cómo contar una escena en la que una acción interrumpe a otra.</p>
    <table class="theory-table">
      <tr><th>Conector</th><th>Introduce</th><th>Tiempo verbal</th><th>Ejemplo</th></tr>
      <tr><td><strong>while</strong></td><td>la acción LARGA (en curso)</td><td>Past Continuous</td><td><strong>While</strong> Elena <strong>was checking</strong> the chart, her partner was preparing the materials.</td></tr>
      <tr><td><strong>when</strong></td><td>la acción CORTA (interrumpe)</td><td>Simple Past</td><td>Elena <strong>was working</strong> <strong>when</strong> the instructor arrived.</td></tr>
    </table>
    <p>Visualízalo: el Past Continuous es el "río" (corriente larga) y el Simple Past es el "salto" (acción breve) que cae al río y lo interrumpe. <strong>while</strong> nombra la corriente; <strong>when</strong> marca el salto.</p>
  </div>

  <div class="theory-block">
    <h3><i class="fa-solid fa-globe"></i> Meanwhile y los marcadores de simultaneidad</h3>
    <p>El texto usa <em>meanwhile</em> ("mientras tanto") para conectar acciones simultáneas de personas diferentes: <em>"Meanwhile, two IT students were testing an application when the internet stopped working."</em> (dos escenas paralelas + un salto que interrumpe).</p>
  </div>

  <div class="theory-warn">
    <strong><i class="fa-solid fa-triangle-exclamation"></i> Errores típicos a evitar:</strong>
    <ul>
      <li>Intercambiar los conectores: lo natural es que la acción CORTA lleve <em>when</em> y la LARGA <em>while</em>.</li>
      <li>Poner el salto en continuo: ✗ "when the internet was stopping working" ("stopped" = evento puntual) → ✓ "when the internet <strong>stopped working</strong>."</li>
      <li>WH sin was/were: ✗ "What Elena checking?" → ✓ "What <strong>was</strong> Elena checking?"</li>
    </ul>
  </div>

  <div class="theory-tip">
    <strong><i class="fa-solid fa-lightbulb"></i> Mini-repaso guiado:</strong> escribe una mini-historia (3 oraciones) de tu día de ayer con el patrón completo: fondo con while + interrupción con when + resultado con Simple Past. ¡Y así cierras la semana 2!
  </div>
  `,

  // =========================================================
  // SEMANA 3: SIMPLE PAST
  // =========================================================
  'w3-d1': `
  <div class="theory-block">
    <h3><i class="fa-solid fa-box-archive"></i> ¿Qué es el Simple Past?</h3>
    <p>Es el tiempo de las <strong>acciones terminadas en un momento definido del pasado</strong>. Empezaron y acabaron: ayer, anoche, la semana pasada. El texto lo deja claro: <em>"All these actions finished yesterday."</em></p>
  </div>

  <div class="theory-block">
    <h3><i class="fa-solid fa-timeline"></i> ¿Cuándo lo usamos?</h3>
    <ul class="theory-list">
      <li><strong>Acciones completadas con hora/fecha cerrada:</strong> <em>"Valeria studied pharmacology (yesterday)."</em></li>
      <li><strong>Secuencias de eventos:</strong> <em>"In the morning..., In the afternoon..., Before leaving..."</em></li>
      <li><strong>Estados pasados (con was/were):</strong> <em>"Yesterday was a productive day."</em></li>
      <li><strong>Experiencias profesionales y académicas puntuales:</strong> <em>"Luis tested a learning application."</em></li>
    </ul>
  </div>

  <div class="theory-block">
    <h3><i class="fa-solid fa-gears"></i> ¿Cómo se forma la afirmativa?</h3>
    <p><strong>Sujeto + verbo en pasado + ...</strong> (misma forma para TODAS las personas — sin -s y sin auxiliar: esa es su gran ventaja).</p>
    <table class="theory-table">
      <tr><th>Sujeto</th><th>Forma</th><th>Ejemplo</th></tr>
      <tr><td>Todas las personas</td><td>regular: <strong>verbo-ed</strong></td><td>She <strong>studied</strong> / They <strong>organized</strong> / He <strong>tested</strong></td></tr>
      <tr><td>Todas las personas</td><td>irregular: forma especial</td><td>He <strong>went</strong> / She <strong>wrote</strong> / They <strong>took</strong></td></tr>
      <tr><td>Todas las personas</td><td>to be: was (I/he/she/it) / were (you/we/they)</td><td>Yesterday <strong>was</strong> productive. The areas <strong>were</strong> clean.</td></tr>
    </table>
  </div>

  <div class="theory-block">
    <h3><i class="fa-regular fa-clock"></i> Marcadores de tiempo pasados</h3>
    <p><em>yesterday</em>, <em>last night</em>, <em>last week</em>, <em>in the morning</em> (con referencia pasada), <em>two days ago</em>, <em>at 8 a.m. yesterday</em>. Si el marcador cierra el evento en el pasado, activa el Simple Past. (Compara con W2-D4: el Past Continuous muestra el "mientras"; el Simple Past dice "y terminó".)</p>
  </div>

  <div class="theory-warn">
    <strong><i class="fa-solid fa-triangle-exclamation"></i> Errores típicos a evitar:</strong>
    <ul>
      <li>Mezclar presente y pasado: ✗ "Yesterday she organizes labels" → ✓ "Yesterday she organiz<strong>ed</strong> labels."</li>
      <li>Poner un auxiliar donde no va en afirmativa: la afirmativa va limpia, sin do/does.</li>
      <li>Poner el verbo de acción tras was/were: ✗ "She was studied pharmacology" (si describes que ella lo hizo) → ✓ "She stud<strong>ied</strong> pharmacology." (Las formas como "was studied" son pasivas: tema avanzado.)</li>
    </ul>
  </div>

  <div class="theory-tip">
    <strong><i class="fa-solid fa-lightbulb"></i> Mini-repaso guiado:</strong> escribe 4 cosas que <strong>hiciste y terminaste</strong> ayer, con marcador de tiempo (yesterday, last night...). Alterna un verbo regular y uno irregular.
  </div>
  `,

  'w3-d2': `
  <div class="theory-block">
    <h3><i class="fa-solid fa-pen-ruler"></i> Verbos regulares: reglas de escritura del -ed</h3>
    <p>Los verbos regulares construyen su pasado añadiendo <strong>-ed</strong>, con cuatro reglas de escritura que debes dominar:</p>
    <table class="theory-table">
      <tr><th>Regla</th><th>Verbo</th><th>Pasado</th></tr>
      <tr><td>General: añadir -ed</td><td>work / clean</td><td>work<strong>ed</strong>, clean<strong>ed</strong></td></tr>
      <tr><td>Termina en <strong>-e</strong> → solo añadir <strong>-d</strong></td><td>organize / practice</td><td>organiz<strong>ed</strong>, practic<strong>ed</strong></td></tr>
      <tr><td>Consonante + <strong>y</strong> → cambia a <strong>-ied</strong></td><td>study</td><td>stud<strong>ied</strong></td></tr>
      <tr><td>Vocal + y → solo añade -ed</td><td>play</td><td>play<strong>ed</strong></td></tr>
      <tr><td>CVC (consonante-vocal-consonante) con acento final → se <strong>duplica</strong> la consonante</td><td>stop</td><td>sto<strong>pp</strong>ed</td></tr>
    </table>
    <p><em>Ejemplos del texto del día:</em> "Valeria <strong>studied</strong> pharmacology" (study→studied), "she <strong>organized</strong> medicine labels" (organize→organized), "Kevin <strong>worked</strong> on a budget" (work→worked).</p>
  </div>

  <div class="theory-block">
    <h3><i class="fa-solid fa-volume-high"></i> Reglas de PRONUNCIACIÓN del -ed (las tres voces)</h3>
    <p>Aquí está el secreto que casi nadie enseña: el -ed escrito no siempre suena igual. Tres sonidos, según el último sonido del verbo:</p>
    <table class="theory-table">
      <tr><th>Sonido final del verbo</th><th>-ed suena</th><th>Ejemplos</th></tr>
      <tr><td>Sordos: /k/, /s/, /sh/, /ch/, /f/, /p/, /x/</td><td><strong>/t/</strong> (sordo)</td><td>work<strong>ed</strong> /t/, ask<strong>ed</strong> /t/, stopp<strong>ed</strong> /t/</td></tr>
      <tr><td>Sonoros: vocales y consonantes sonoras /b/, /g/, /l/, /m/, /n/, /r/, /v/, /z/</td><td><strong>/d/</strong> (sonoro)</td><td>call<strong>ed</strong> /d/, organiz<strong>ed</strong> /d/, play<strong>ed</strong> /d/</td></tr>
      <tr><td>Termina en sonido /t/ o /d/</td><td><strong>/id/</strong> (sílaba extra)</td><td>want<strong>ed</strong> /id/, test<strong>ed</strong> /id/, need<strong>ed</strong> /id/</td></tr>
    </table>
    <p><strong>Truco:</strong> solo se pronuncia /id/ si el verbo ya termina en sonido /t/ o /d/. En los demás casos el -ed "se pega" a la última consonante sin crear sílaba: "worked" suena /workt/, no "work-ed".</p>
  </div>

  <div class="theory-block">
    <h3><i class="fa-solid fa-list-check"></i> Checklist del día</h3>
    <ul class="theory-list">
      <li>Elige 6 verbos de tu carrera: escribe su pasado (regla de escritura) y pronuncia el pasado (regla de sonido).</li>
      <li>Construye 4 oraciones con ellos + marcador de tiempo pasado.</li>
    </ul>
  </div>

  <div class="theory-warn">
    <strong><i class="fa-solid fa-triangle-exclamation"></i> Errores típicos a evitar:</strong>
    <ul>
      <li>Escritura: ✗ "studys" no existe; el pasado de study es ✓ "studied"; ✗ "organizied" → ✓ "organized" (la -ied solo aplica si hay consonante antes de la y).</li>
      <li>Pronunciación: decir /id/ en "worked" es el error clásico: se dice /workt/. El /id/ solo aparece con verbs que terminan en sonido /t/ o /d/.</li>
      <li>Doble consonante sin criterio: ✗ "workked" → solo se dobla en CVC acentuada (stop→stopped, pero work→worked).</li>
    </ul>
  </div>

  <div class="theory-tip">
    <strong><i class="fa-solid fa-lightbulb"></i> Mini-repaso guiado:</strong> abre los recursos del día y escucha los tres sonidos del -ed en contexto: /t/, /d/, /id/. Tu oído es tu mejor corrector gramatical.
  </div>
  `,

  'w3-d3': `
  <div class="theory-block">
    <h3><i class="fa-solid fa-bolt"></i> Verbos irregulares: otra ruta al pasado</h3>
    <p>Los verbos irregulares <strong>no aceptan -ed</strong>: cambian su forma por completo. No siguen una fórmula: se aprenden por memoria — y mejor si es con contexto:</p>
    <table class="theory-table">
      <tr><th>Presente</th><th>Pasado</th><th>Ejemplo del texto</th></tr>
      <tr><td>go</td><td>went</td><td>She <strong>went</strong> to the training clinic early.</td></tr>
      <tr><td>take</td><td>took</td><td>He <strong>took</strong> a patient chart.</td></tr>
      <tr><td>write</td><td>wrote</td><td>She <strong>wrote</strong> notes for her supervisor.</td></tr>
      <tr><td>make</td><td>made</td><td>Bruno <strong>made</strong> a product list.</td></tr>
      <tr><td>speak (talk es regular)</td><td>spoke (talked)</td><td>The students <strong>talked</strong> about their tasks.</td></tr>
      <tr><td>have</td><td>had</td><td>She <strong>had</strong> a busy routine.</td></tr>
      <tr><td>be</td><td>was / were</td><td>Her classes <strong>were</strong> practical.</td></tr>
    </table>
  </div>

  <div class="theory-block">
    <h3><i class="fa-solid fa-crown"></i> Afirmativa con irregulares: la forma especial</h3>
    <p>En la <strong>afirmativa</strong>, el irregular usa su <strong>forma de pasado</strong> (went, took, wrote...) para todas las personas, igual que un regular. Pero atento a la regla que se viene:</p>
    <p><strong>En negativas y preguntas, el auxiliar DID/DIDN'T devuelve el verbo a su forma BASE</strong> (go, take, write...), sea regular o irregular. La forma especial (went) solo vive en la afirmativa: <em>"She went" / "Did she go?" / "She didn't go."</em></p>
  </div>

  <div class="theory-block">
    <h3><i class="fa-solid fa-graduation-cap"></i> Cómo memorizar los irregulares (método por historias)</h3>
    <ul class="theory-list">
      <li><strong>Narra tu día real</strong>: "I went to the institute. I took my materials. I wrote a summary." El contexto real fija mejor que las listas.</li>
      <li><strong>Agrupa por patrones de sonido</strong>: take→took, shake→shook (oo); make→made, give→gave (g+m/d+v). Los 20 irregulares esenciales cubren el 90% de la vida profesional.</li>
      <li><strong>Nunca inventes el pasado por analogía</strong>: "went" no se deduce de "go" con lógica; se aprende como vocabulario.</li>
    </ul>
  </div>

  <div class="theory-warn">
    <strong><i class="fa-solid fa-triangle-exclamation"></i> Errores típicos a evitar:</strong>
    <ul>
      <li>Regularizar lo irregular: ✗ "goed / taked / writed" → ✓ "went / took / wrote."</li>
      <li>Usar la forma de pasado con did: ✗ "Did she went?" → ✓ "Did she go?" (regla del próximo día).</li>
      <li>Mezclar las dos rutas en una oración: ✗ "She wented" → went (afirmativa) o did go (negativa/pregunta), no ambas.</li>
    </ul>
  </div>

  <div class="theory-tip">
    <strong><i class="fa-solid fa-lightbulb"></i> Mini-repaso guiado:</strong> escoge 8 irregulares de la semana y escribe la "triada completa" de cada uno: <em>go — went — Did you go?</em> La triada es tu seguro contra los errores.
  </div>
  `,

  'w3-d4': `
  <div class="theory-block">
    <h3><i class="fa-solid fa-circle-question"></i> Preguntas Sí/No en Simple Past: el auxiliar DID</h3>
    <p>Las preguntas sobre acciones terminadas usan un solo auxiliar para todas las personas: <strong>DID</strong> (pasado de do). Estructura:</p>
    <p><strong>Did + sujeto + verbo BASE + ... ?</strong></p>
    <table class="theory-table">
      <tr><th>Pregunta</th><th>Respuesta corta</th></tr>
      <tr><td><strong>Did</strong> you call the patient?</td><td>Yes, I <strong>did</strong>. / No, I <strong>didn't</strong>.</td></tr>
      <tr><td><strong>Did</strong> she organize the medicines?</td><td>Yes, she <strong>did</strong>. / No, she <strong>didn't</strong>.</td></tr>
      <tr><td><strong>Did</strong> they work in the pharmacy?</td><td>Yes, they <strong>did</strong>. / No, they <strong>didn't</strong>.</td></tr>
    </table>
    <p><strong>Respuestas cortas:</strong> Yes, ... did. / No, ... didn't. (El DID / DIDN'T responde; el verbo en pasado nunca repite en la respuesta corta.)</p>
  </div>

  <div class="theory-block">
    <h3><i class="fa-solid fa-key"></i> La regla del "regreso a la base"</h3>
    <p>Cuando entra <strong>did</strong>, el verbo <strong>vuelve a su forma base</strong> (la -ed desaparece en pregunta y negativa). El pasado lo carga el auxiliar, no el verbo:</p>
    <p>✓ "<strong>called</strong>" (afirmativa: "Daniel called a patient")<br>✓ "Did you <strong>call</strong> the patient?" — <em>called → call</em><br>✓ "Ana <strong>didn't</strong> <strong>prepare</strong> a budget report." (prepared → prepare base)</p>
    <p>El texto lo explicita: "called → call, organized → organize, worked → work, prepared → prepare, installed → install."</p>
  </div>

  <div class="theory-block">
    <h3><i class="fa-solid fa-diagram-project"></i> Espejo perfecto con la Semana 1</h3>
    <p>La gramática de preguntas y negativas que aprendiste en presente simple con <em>Do/Does</em> se replica en pasado con <em>Did</em>:</p>
    <table class="theory-table">
      <tr><th>Tiempo</th><th>Afirmativa</th><th>Pregunta</th><th>Negativa</th></tr>
      <tr><td>Presente Simple</td><td>She work<strong>s</strong></td><td><strong>Does</strong> she work? (base)</td><td>She <strong>doesn't</strong> work (base)</td></tr>
      <tr><td>Pasado Simple</td><td>She work<strong>ed</strong></td><td><strong>Did</strong> she work? (base)</td><td>She <strong>didn't</strong> work (base)</td></tr>
    </table>
    <p>Una sola lógica: <em>el auxiliar carga la marca y devuelve el verbo a la base</em> — does en presente, did en pasado.</p>
  </div>

  <div class="theory-warn">
    <strong><i class="fa-solid fa-triangle-exclamation"></i> Errores típicos a evitar:</strong>
    <ul>
      <li>Doble pasado: ✗ "Did you went?" / ✗ "Did she organized?" → ✓ "Did you go?" / "Did she organize?"</li>
      <li>Respuesta corta con verbo: ✗ "Yes, I called." (larga aunque válida) — el estándar conversacional es ✓ "Yes, I did."</li>
      <li>Olvidar did en la pregunta: ✗ "You called the patient?" (da indiferencia, no pregunta) → ✓ "Did you call the patient?"</li>
    </ul>
  </div>

  <div class="theory-tip">
    <strong><i class="fa-solid fa-lightbulb"></i> Mini-repaso guiado:</strong> toma 5 verbos (regulares e irregulares) y forma el trío completo: afirmativa en pasado → pregunta con did (verbo base) → respuesta corta positiva y negativa.
  </div>
  `,

  'w3-d5': `
  <div class="theory-block">
    <h3><i class="fa-solid fa-shuffle"></i> Día de transformación en Simple Past: una acción, cuatro formas</h3>
    <p>El sistema del pasado en una tabla — partiendo de "Rosa prepared a medicine inventory":</p>
    <table class="theory-table">
      <tr><th>Tipo</th><th>Regla</th><th>Ejemplo</th></tr>
      <tr><td>Afirmativa</td><td>verbo en pasado (regular / irregular)</td><td>Rosa <strong>prepared</strong> the inventory.</td></tr>
      <tr><td>Pregunta Sí/No</td><td>Did + S + verbo <strong>base</strong></td><td><strong>Did</strong> Rosa <strong>prepare</strong> the inventory?</td></tr>
      <tr><td>Respuesta corta</td><td>S + did / didn't</td><td>Yes, she <strong>did</strong>. / No, she <strong>didn't</strong>.</td></tr>
      <tr><td>Negativa</td><td>S + didn't + verbo <strong>base</strong></td><td>Rosa <strong>didn't prepare</strong> a budget report.</td></tr>
    </table>
    <p><strong>La clave del día:</strong> la afirmativa lleva el verbo en pasado, pero la pregunta y la negativa lo llevan SIEMPRE en base; el auxiliar (did / didn't) es quien "carga" el pasado.</p>
  </div>

  <div class="theory-block">
    <h3><i class="fa-solid fa-list-ul"></i> Casos del texto: observa el deslizamiento</h3>
    <ul class="theory-list">
      <li><em>"Rosa, a Pharmacy student, prepared a medicine inventory."</em> → afirmativa en pasado.</li>
      <li><em>"Did Rosa prepare the inventory?" — "Yes, she did."</em> → base + did en ambas.</li>
      <li><em>"Ana did not prepare a budget report; she organized invoices instead."</em> → negativa en base + contraste con verbo en pasado en la nueva oración.</li>
      <li><em>"Did they test the application?" — "Yes, they did."</em> → did también funciona con irregulares, siempre con el verbo en base.</li>
    </ul>
  </div>

  <div class="theory-block">
    <h3><i class="fa-solid fa-bullseye"></i> Formal vs informal: didn't vs did not</h3>
    <p><em>didn't</em> es la contracción estándar; <em>did not</em> sirve para enfatizar o para un registro formal: <em>"She did not prepare a budget report; she organized invoices instead."</em> — el "did not" resalta la corrección y da peso al contraste.</p>
  </div>

  <div class="theory-warn">
    <strong><i class="fa-solid fa-triangle-exclamation"></i> Errores típicos a evitar:</strong>
    <ul>
      <li>Doble pasado en negativa: ✗ "She didn't prepared" → ✓ "She didn't prepare."</li>
      <li>Doble pasado en pregunta: ✗ "Did Daniel checked?" → ✓ "Did Daniel check?"</li>
      <li>Irregulares que no vuelven a base: ✗ "Did she went?" → ✓ "Did she go?"</li>
      <li>Respuestas cortas sin auxiliar: la respuesta corta SIEMPRE usa did/didn't, no el verbo.</li>
    </ul>
  </div>

  <div class="theory-tip">
    <strong><i class="fa-solid fa-lightbulb"></i> Mini-repaso guiado:</strong> elige 4 acciones reales de tu ayer (2 regulares, 2 irregulares) y produce su kit completo de transformación. Una acción, cuatro formas, una lógica.
  </div>
  `,

  'w3-d6': `
  <div class="theory-block">
    <h3><i class="fa-solid fa-magnifying-glass-plus"></i> WH-questions en Simple Past</h3>
    <p>Cuando necesitas información puntual de una acción terminada (qué, dónde, cuándo, por qué), abres con la palabra WH + did:</p>
    <p><strong>WH + did + sujeto + verbo BASE + ... ?</strong></p>
    <table class="theory-table">
      <tr><th>WH</th><th>Pregunta</th><th>Respuesta</th></tr>
      <tr><td>What</td><td>What <strong>did</strong> Rosa <strong>organize</strong>?</td><td>She organized the medicines.</td></tr>
      <tr><td>Where</td><td>Where <strong>did</strong> Daniel <strong>help</strong> a patient?</td><td>At the clinic.</td></tr>
      <tr><td>Why</td><td>Why <strong>did</strong> Ana organize invoices?</td><td>Because she didn't prepare a report.</td></tr>
      <tr><td>When</td><td>When <strong>did</strong> Luis test the application?</td><td>Yesterday at 4 p.m.</td></tr>
      <tr><td>Who (sujeto)</td><td>Who <strong>called</strong> the patient?</td><td>Daniel did. (sin did extra)</td></tr>
    </table>
    <p><strong>Excepción elegante:</strong> si la palabra WH es el <strong>sujeto</strong> de la acción (Who...?), <strong>no</strong> se usa did — el verbo va directo en pasado: <em>"Who called the patient?"</em> (no "Who did call").</p>
  </div>

  <div class="theory-block">
    <h3><i class="fa-solid fa-stream"></i> Los conectores de la narración: first, then, next, finally</h3>
    <p>El texto del día cierra la semana narrando la jornada de Rosa con <strong>conectores secuenciales</strong>:</p>
    <ul class="theory-list">
      <li><em><strong>First</strong>, she organized the medicines...</em> (inicio)</li>
      <li><em><strong>Then</strong>, she prepared an inventory...</em> (siguiente)</li>
      <li><em><strong>Next</strong>, ...</em> (paso siguiente)</li>
      <li><em><strong>Finally</strong>, they wrote a short story...</em> (cierre)</li>
    </ul>
    <p>Con estos conectores + Simple Past construyes narraciones profesionales completas: reportes de tu jornada, descripciones de un procedimiento, relatos de un incidente.</p>
  </div>

  <div class="theory-block">
    <h3><i class="fa-solid fa-flag-checkered"></i> Cierre de curso: una línea de tiempo mental</h3>
    <p>Ya tienes dominadas las tres grandes máquinas temporales del curso:</p>
    <table class="theory-table">
      <tr><th>Tiempo</th><th>Uso central</th><th>Motor</th></tr>
      <tr><td>Presente Simple</td><td>rutinas y verdades</td><td>do/does + base</td></tr>
      <tr><td>Continuos (presente / pasado)</td><td>acciones en marcha</td><td>to be + -ing</td></tr>
      <tr><td>Pasado Simple</td><td>acciones terminadas</td><td>did + base</td></tr>
    </table>
    <p>Pregúntate SIEMPRE: ¿es un hábito, está en curso, o ya terminó? Esa única pregunta te dirá el tiempo verbal. El resto es la estructura que ya conoces.</p>
  </div>

  <div class="theory-warn">
    <strong><i class="fa-solid fa-triangle-exclamation"></i> Errores típicos a evitar:</strong>
    <ul>
      <li>Añadir did cuando la WH es sujeto: ✗ "Who did call?" → ✓ "Who called?"; ✗ "What did happen?" → ✓ "What happened?"</li>
      <li>Narrar sin conectores: "she organized... she prepared... she checked... she cleaned..." (monótono) → sube a nivel profesional con First / Then / Next / Finally.</li>
      <li>Mezclar pasado y presente en un mismo reporte: elige un tiempo y sostenlo (consistencia temporal).</li>
    </ul>
  </div>

  <div class="theory-tip">
    <strong><i class="fa-solid fa-lightbulb"></i> Proyecto final del curso:</strong> escribe la crónica de TU ayer para tu carrera: 10 oraciones en Simple Past, conectores First/Then/Next/Finally + 3 WH-questions que alguien podría hacerte sobre tu día. ¡Semana 3 completada — bases del inglés profesional conquistadas!
  </div>
  `
};
