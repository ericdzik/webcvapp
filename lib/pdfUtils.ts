import { ResumeData } from "@/types/resume";

export function getContentScore(data: ResumeData): number {
  let score = 0;
  score += data.experiences.length * 4;
  data.experiences.forEach((e) => {
    if (e.description) score += Math.ceil(e.description.length / 60);
  });
  score += data.education.length * 2;
  score += Math.ceil(data.skills.length / 4);
  score += Math.ceil(data.languages.length / 3);
  if (data.summary.text) score += Math.ceil(data.summary.text.length / 80);
  score += Math.ceil(data.interests.length / 5);
  return score;
}

/**
 * Taille de police — grande par défaut, réduit seulement si vraiment beaucoup.
 */
export function getFontSize(base: number, score: number): number {
  if (score >= 32) return Math.round(base * 0.88 * 10) / 10;
  if (score >= 24) return Math.round(base * 0.94 * 10) / 10;
  return base;
}

/**
 * Espacement — valeurs de base plus grandes, encore plus grand quand peu de contenu.
 */
export function getSpacing(base: number, score: number): number {
  if (score <= 4)  return Math.round(base * 3.2 * 10) / 10;
  if (score <= 8)  return Math.round(base * 2.6 * 10) / 10;
  if (score <= 12) return Math.round(base * 2.0 * 10) / 10;
  if (score <= 18) return Math.round(base * 1.5 * 10) / 10;
  if (score >= 32) return Math.round(base * 0.85 * 10) / 10;
  return Math.round(base * 1.15 * 10) / 10; // légèrement plus grand par défaut
}
