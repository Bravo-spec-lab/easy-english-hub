// Punto de acceso a los datos del curso (EASY English Hub)
import { courseInfo } from './course-info.js';
import { week1 } from './week-1.js';
import { week2 } from './week-2.js';
import { week3 } from './week-3.js';
import { week4 } from './week-4.js';
import { masterVocabulary } from './master-vocabulary.js';
import { stats } from './stats.js';

export const COURSE_DATA = {
  courseInfo,
  weeks: [week1, week2, week3, week4],
  masterVocabulary,
  stats
};

export { courseInfo, masterVocabulary, stats };
export function getWeek(id) {
  return COURSE_DATA.weeks.find(w => w.id === id) || null;
}
export function getDay(weekId, dayNum) {
  const w = getWeek(weekId);
  return w ? w.days.find(d => d.day === dayNum) || null : null;
}
