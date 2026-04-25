"use client";
import { useFieldArray, UseFormRegister, Control } from "react-hook-form";
import { ResumeData } from "@/types/resume";
import { generateId } from "@/lib/utils";

const LANGUAGE_SUGGESTIONS = [
  "Français", "Anglais", "Espagnol", "Allemand", "Italien", "Portugais",
  "Arabe", "Mandarin", "Japonais", "Coréen", "Russe", "Néerlandais",
  "Polonais", "Turc", "Hindi", "Suédois", "Danois", "Norvégien",
];

interface Props {
  register: UseFormRegister<ResumeData>;
  control: Control<ResumeData>;
}

export default function LanguagesForm({ register, control }: Props) {
  const { fields, append, remove } = useFieldArray({ control, name: "languages" });

  const addLanguage = (name: string) => {
    if (fields.some((f) => f.name === name)) return;
    append({ id: generateId(), name, level: "B2" });
  };

  return (
    <div className="space-y-4">
      <h2 className="font-bold text-gray-700 text-sm uppercase tracking-wide">Langues</h2>

      {/* Suggestions */}
      <div className="flex flex-wrap gap-2">
        {LANGUAGE_SUGGESTIONS.map((lang) => {
          const added = fields.some((f) => f.name === lang);
          return (
            <button
              key={lang}
              type="button"
              onClick={() => addLanguage(lang)}
              disabled={added}
              className={`text-xs px-2 py-1 rounded-full border transition ${
                added
                  ? "bg-blue-100 border-blue-300 text-blue-600 cursor-default"
                  : "bg-white border-gray-300 text-gray-600 hover:border-blue-400 hover:text-blue-600"
              }`}
            >
              {added ? "✓ " : "+ "}{lang}
            </button>
          );
        })}
      </div>

      {/* Ajout manuel */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400">Ou ajoute une langue personnalisée</p>
        <button
          type="button"
          onClick={() => append({ id: generateId(), name: "", level: "B2" })}
          className="text-sm text-blue-600 hover:underline"
        >
          + Ajouter manuellement
        </button>
      </div>

      {/* Liste des langues sélectionnées */}
      {fields.length > 0 && (
        <div className="space-y-2">
          {fields.map((field, i) => (
            <div key={field.id} className="flex gap-2 items-center">
              <input {...register(`languages.${i}.name`)} placeholder="Langue" className="input flex-1" />
              <select {...register(`languages.${i}.level`)} className="input w-28">
                {["A1", "A2", "B1", "B2", "C1", "C2", "Natif"].map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
              <button type="button" onClick={() => remove(i)} className="text-red-400 hover:text-red-600 text-sm">✕</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
