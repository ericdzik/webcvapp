import { ResumeData } from "@/types/resume";

/**
 * Calcule un facteur d'échelle selon la densité du contenu.
 * Retourne une valeur entre 0.78 (beaucoup de contenu) et 1.0 (peu de contenu).
 */
export function getFontScale(data: ResumeData): number {
  let score = 0;

  // Expériences
  score += data.experiences.length * 3;
  data.experiences.forEach((e) => {
    if (e.description) score += Math.ceil(e.description.length / 80);
  });

  // Formation
  score += data.education.length * 2;

  // Compétences & langues
  score += Math.ceil(data.skills.length / 3);
  score += Math.ceil(data.languages.length / 3);

  // Résumé
  if (data.summary.text) score += Math.ceil(data.summary.text.length / 100);

  // Intérêts
  score += Math.ceil(data.interests.length / 4);

  // Seuils : < 10 = normal, 10-18 = légèrement réduit, > 18 = réduit
  if (score <= 8)  return 1.0;
  if (score <= 14) return 0.93;
  if (score <= 20) return 0.87;
  if (score <= 26) return 0.82;
  return 0.78;
}

/** Applique le scale à une taille de base */
export function fs(base: number, scale: number): number {
  return Math.round(base * scale * 10) / 10;
}
