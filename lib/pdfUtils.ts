import { ResumeData } from "@/types/resume";

/**
 * Calcule la densité du contenu.
 * Retourne un score entre 0 (vide) et ~40+ (très rempli).
 */
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
 * Taille de police de base — réduit seulement si vraiment beaucoup de contenu.
 * Peu de contenu = police normale (10), beaucoup = légèrement réduit.
 */
export function getFontSize(base: number, score: number): number {
  if (score >= 30) return Math.round(base * 0.85 * 10) / 10;
  if (score >= 22) return Math.round(base * 0.91 * 10) / 10;
  return base; // police normale par défaut
}

/**
 * Espacement — GRAND quand peu de contenu, normal quand beaucoup.
 * C'est ça qui remplit la page.
 */
export function getSpacing(base: number, score: number): number {
  if (score <= 6)  return Math.round(base * 1.8 * 10) / 10;
  if (score <= 10) return Math.round(base * 1.5 * 10) / 10;
  if (score <= 16) return Math.round(base * 1.2 * 10) / 10;
  if (score >= 30) return Math.round(base * 0.85 * 10) / 10;
  return base;
}
