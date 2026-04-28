"use client";
import { useState } from "react";
import { useFieldArray, UseFormRegister, Control } from "react-hook-form";
import { ResumeData } from "@/types/resume";
import { generateId } from "@/lib/utils";

const SKILL_SUGGESTIONS: Record<string, string[]> = {
  // Tech
  "Langages": ["JavaScript", "TypeScript", "Python", "Java", "C#", "C++", "PHP", "Go", "Swift", "Kotlin", "Ruby"],
  "Frontend": ["React", "Next.js", "Vue.js", "Angular", "Tailwind CSS", "HTML/CSS", "Sass", "Redux"],
  "Backend": ["Node.js", "Express", "NestJS", "Django", "FastAPI", "Spring Boot", "Laravel"],
  "Base de données": ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Firebase", "Supabase"],
  "DevOps / Cloud": ["Docker", "Kubernetes", "AWS", "GCP", "Azure", "CI/CD", "Linux", "Git"],
  "Gestion de projet": ["Agile / Scrum", "Kanban", "Jira", "Notion", "Confluence", "Trello", "Asana"],

  // Business & Management
  "Management": ["Gestion d'équipe", "Leadership", "Recrutement", "Conduite du changement", "Coaching", "Reporting", "KPI"],
  "Finance & Comptabilité": ["Comptabilité générale", "Contrôle de gestion", "Analyse financière", "Excel avancé", "SAP", "Sage", "Fiscalité", "Audit"],
  "Marketing & Communication": ["Marketing digital", "SEO / SEA", "Réseaux sociaux", "Content marketing", "Email marketing", "Google Analytics", "Adobe Suite", "Copywriting"],
  "Commercial & Vente": ["Prospection", "Négociation", "CRM", "Salesforce", "HubSpot", "Gestion de portefeuille client", "B2B", "B2C"],
  "Ressources Humaines": ["Recrutement", "Formation", "Paie", "GPEC", "Droit du travail", "SIRH", "Onboarding", "Gestion des talents"],

  // Santé & Social
  "Santé": ["Soins infirmiers", "Pharmacologie", "Urgences", "Bloc opératoire", "Pédiatrie", "Gériatrie", "Hygiène hospitalière"],
  "Social & Éducatif": ["Accompagnement social", "Éducation spécialisée", "Médiation", "Travail en équipe pluridisciplinaire", "Rédaction de rapports"],

  // Design & Créatif
  "Design": ["Figma", "Adobe Photoshop", "Illustrator", "InDesign", "After Effects", "UI/UX", "Prototypage", "Identité visuelle"],
  "Audiovisuel": ["Montage vidéo", "Premiere Pro", "Final Cut", "DaVinci Resolve", "Photographie", "Motion design"],

  // Juridique & Administratif
  "Juridique": ["Droit des contrats", "Droit du travail", "Droit des sociétés", "Veille juridique", "Rédaction d'actes", "Contentieux"],
  "Administratif": ["Gestion administrative", "Accueil", "Secrétariat", "Rédaction professionnelle", "Classement", "Pack Office"],

  // Logistique & Industrie
  "Logistique": ["Gestion des stocks", "Supply chain", "Transport", "ERP", "Lean management", "Planification"],
  "Industrie & Technique": ["Maintenance industrielle", "Électricité", "Mécanique", "Automatisme", "Qualité / ISO", "Sécurité industrielle"],

  // Soft skills
  "Soft skills": ["Communication", "Travail en équipe", "Autonomie", "Adaptabilité", "Rigueur", "Créativité", "Gestion du stress", "Sens des priorités", "Force de proposition"],
};

interface Props {
  register: UseFormRegister<ResumeData>;
  control: Control<ResumeData>;
}

export default function SkillsForm({ register, control }: Props) {
  const { fields, append, remove } = useFieldArray({ control, name: "skills" });
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const addSkill = (name: string) => {
    if (fields.some((f) => f.name === name)) return;
    append({ id: generateId(), name, level: "intermédiaire" });
  };

  // Filtrage par recherche
  const filteredCategories = search.trim()
    ? Object.entries(SKILL_SUGGESTIONS).reduce<Record<string, string[]>>((acc, [cat, skills]) => {
        const filtered = skills.filter((s) => s.toLowerCase().includes(search.toLowerCase()));
        if (filtered.length) acc[cat] = filtered;
        return acc;
      }, {})
    : SKILL_SUGGESTIONS;

  return (
    <div className="space-y-4">
      <h2 className="font-bold text-gray-700 text-sm uppercase tracking-wide">Compétences</h2>

      {/* Recherche */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Rechercher une compétence..."
        className="input"
      />

      {/* Suggestions par catégorie */}
      <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
        {Object.entries(filteredCategories).map(([category, skills]) => (
          <div key={category} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => setOpenCategory(openCategory === category ? null : category)}
              className="w-full flex items-center justify-between px-3 py-2 bg-gray-50 hover:bg-gray-100 text-sm font-medium text-gray-700 transition"
            >
              <span>{category}</span>
              <span className="text-gray-400 text-xs">{openCategory === category ? "▲" : "▼"}</span>
            </button>
            {(openCategory === category || search.trim()) && (
              <div className="p-3 flex flex-wrap gap-2">
                {skills.map((skill) => {
                  const added = fields.some((f) => f.name === skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => addSkill(skill)}
                      disabled={added}
                      className={`text-xs px-2 py-1 rounded-full border transition ${
                        added
                          ? "bg-blue-100 border-blue-300 text-blue-600 cursor-default"
                          : "bg-white border-gray-300 text-gray-600 hover:border-blue-400 hover:text-blue-600"
                      }`}
                    >
                      {added ? "✓ " : "+ "}{skill}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Ajout manuel */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400">Compétence non listée ?</p>
        <button
          type="button"
          onClick={() => append({ id: generateId(), name: "", level: "intermédiaire" })}
          className="text-sm text-blue-600 hover:underline"
        >
          + Ajouter manuellement
        </button>
      </div>

      {/* Liste des compétences sélectionnées */}
      {fields.length > 0 && (
        <div className="space-y-2">
          {fields.map((field, i) => (
            <div key={field.id} className="flex gap-2 items-center">
              <input {...register(`skills.${i}.name`)} placeholder="Compétence" className="input flex-1" />
              <select {...register(`skills.${i}.level`)} className="input w-36">
                <option value="débutant">Débutant</option>
                <option value="intermédiaire">Intermédiaire</option>
                <option value="expert">Expert</option>
              </select>
              <button type="button" onClick={() => remove(i)} className="text-red-400 hover:text-red-600 text-sm">✕</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
