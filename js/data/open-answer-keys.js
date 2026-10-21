/**
 * EASY English Hub - Respuestas modelo para preguntas de producción abierta
 * Complementa los días cuyo answerKey viene vacío (ej. toda la Semana 1).
 * El estudiante se auto-califica comparando su respuesta con el modelo.
 * Desarrollado por Bravo • Computación e Informática
 */

export const OPEN_ANSWER_KEYS = {
  'w1-d1': [
    'Respuesta modelo: "I study every day." (El verbo study va en base, sin -s, porque el sujeto es I.)',
    'Respuesta modelo: la forma base del verbo es "study" (con I/you/we/they). Con he/she/it se escribe "studies".',
    'Respuesta modelo: "I attend classes in the evening." (Frase completa: sujeto + verbo base + complemento + tiempo.)',
    'Respuesta modelo: la forma base es "prepare" (con I/you/we/they). Con he/she/it es "prepares".',
    'Respuesta modelo: cualquier rutina diaria en presente simple, p. ej. "I check my messages at 8:00 a.m. every morning."'
  ],
  'w1-d2': [
    'Respuesta modelo: "starts" → "She starts at 9:00." (She = 3ª persona: la -s es obligatoria.)',
    'Respuesta modelo: "use" → "They use digital tools." (They NO lleva -s.)',
    'Respuesta modelo: "helps" → "He helps customers." (He = 3ª persona: -s.)',
    'Respuesta modelo: "We study English." (Con we el verbo vuelve a su forma base, sin -s.)',
    'Respuesta modelo: p. ej. "I use a computer in my office every day." (Sujeto + verbo en base + rutina con marcador de tiempo.)'
  ],
  'w1-d3': [
    'Respuesta modelo: "doesn\'t" → "She doesn\'t work on Sundays." (3ª persona singular usa doesn\'t.)',
    'Respuesta modelo: "don\'t" → "They don\'t arrive late." (They usa don\'t.)',
    'Respuesta modelo: "He doesn\'t study English." (La -s se elimina: después de doesn\'t el verbo va en base.)',
    'Respuesta modelo: p. ej. "They don\'t work on Sundays." o "I don\'t study alone." (Sujeto + don\'t/doesn\'t + verbo base.)',
    'Respuesta modelo: la FORMA BASE. El auxiliar already lleva la marca de 3ª persona; nunca se dobla: ✗ doesn\'t works → ✓ doesn\'t work.'
  ],
  'w1-d4': [
    'Respuesta modelo: "Do" → "Do you study English?" (Do va con you.)',
    'Respuesta modelo: "Does" → "Does she work here?" (Does va con she.)',
    'Respuesta modelo: "do" → "What time do you start?" (Con you el auxiliar es do.)',
    'Respuesta modelo: "Yes, I do. I study English every day." (Respuesta corta con el auxiliar do.)',
    'Respuesta modelo: "Yes, she does." o "No, she doesn\'t." (Respuesta corta con does/doesn\'t.)'
  ],
  'w1-d5': [
    'Respuesta modelo: "I usually check my schedule in the morning." (El adverbio va ANTES del verbo principal.)',
    'Respuesta modelo: "She is always punctual." (Con el verbo to be, el adverbio va DESPUÉS de is.)',
    'Respuesta modelo: "never" (0% de frecuencia).',
    'Respuesta modelo: p. ej. "I practice English every day." (Expresión de tiempo al final.)',
    'Respuesta modelo: "often" (~60%, frecuencia alta comparada con never, 0%).'
  ],
  'w1-d6': [
    'Respuesta modelo: "I study" (la afirmativa con I no lleva -s ni auxiliar).',
    'Respuesta modelo: "She doesn\'t work" (negativa correcta: doesn\'t + verbo base).',
    'Respuesta modelo: "Do you study?" (Pregunta con el auxiliar Do delante del sujeto.)',
    'Respuesta modelo: "usually" (adverbio de frecuencia; "yesterday" es marcador de tiempo pasado).',
    'Respuesta modelo: una rutina ("every day" indica hábito en presente simple, no una acción en progreso).'
  ]
};
