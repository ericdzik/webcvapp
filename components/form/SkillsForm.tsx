"use client";
import { useState } from "react";
import { useFieldArray, UseFormRegister, Control } from "react-hook-form";
import { ResumeData } from "@/types/resume";
import { generateId } from "@/lib/utils";

const SKILL_SUGGESTIONS: Record<string, string[]> = {
  "Langages": ["JavaScript", "TypeScript", "Python", "Java", "C#", "C++", "PHP", "Go", "Rust", "Swift", "Kotlin", "Ruby"],
  "Frontend": ["React", "Next.js", "Vue.js", "Angular", "Tailwind CSS", "HTML/CSS", "Sass", "Redux", "GraphQL"],
  "Backend": ["Node.js", "Express", "NestJS", "Django", "FastAPI", "Spring Boot", "Laravel", "Ruby on Rails"],
  "Base de données": ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Supabase", "Firebase", "Prisma", "SQLite"],
  "DevOps / Cloud": ["Docker", "Kubernetes", "AWS", "GCP", "Azure", "CI/CD", "GitHub Actions", "Terraform", "Linux"],
  "Outils dev": ["Git", "GitHub", "GitLab", "VS Code", "Figma", "Postman", "Jest", "Cypress", "Webpack", "Vite"],
  "Gestion de projet": ["Agile / Scrum", "Kanban", "Jira", "Notion", "Confluence", "Trello", "Asana", "Monday.com"],
  "Méthodes": ["Gestion de backlog", "Sprint planning", "Code review", "TDD", "DDD", "Architecture microservices", "API REST"],
};

interface Props {
  register: UseFormRegister<ResumeData>;
  control: Control<ResumeData>;
}

export default function SkillsForm({ register, control }: Props) {
  const { fields, append, remove } = useFieldArray({ control, name: "skills" });
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const addSkill = (name: string) => {
    if (fields.some((f) => f.name === name)) return;
    append({ id: generateId(), name, level: "intermédiaire" });
  };

  return (
    <div className="space-y-4">
      <h2 className="font-bold text-gray-700 text-sm uppercase tracking-wide">Compétences</h2>

      {/* Suggestions par catégorie */}
      <div className="space-y-2">
        {Object.entries(SKILL_SUGGESTIONS).map(([category, skills]) => (
          <div key={category} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => setOpenCategory(openCategory === category ? null : category)}
              className="w-full flex items-center justify-between px-3 py-2 bg-gray-50 hover:bg-gray-100 text-sm font-medium text-gray-700 transition"
            >
              <span>{category}</span>
              <span className="text-gray-400">{openCategory === category ? "▲" : "▼"}</span>
            </button>
            {openCategory === category && (
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
        <p className="text-xs text-gray-400">Ou ajoute une compétence personnalisée</p>
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
