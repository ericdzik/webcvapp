"use client";
import { useFieldArray, UseFormRegister, Control } from "react-hook-form";
import { ResumeData } from "@/types/resume";
import { generateId } from "@/lib/utils";

interface Props {
  register: UseFormRegister<ResumeData>;
  control: Control<ResumeData>;
}

export default function EducationForm({ register, control }: Props) {
  const { fields, append, remove } = useFieldArray({ control, name: "education" });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-gray-700 text-sm uppercase tracking-wide">Formation</h2>
        <button
          type="button"
          onClick={() => append({ id: generateId(), degree: "", school: "", city: "", year: "", description: "" })}
          className="text-sm text-blue-600 hover:underline"
        >
          + Ajouter
        </button>
      </div>
      {fields.map((field, i) => (
        <div key={field.id} className="border border-gray-200 rounded-lg p-3 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <input {...register(`education.${i}.degree`)} placeholder="Diplôme" className="input" />
            <input {...register(`education.${i}.school`)} placeholder="Établissement" className="input" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <input {...register(`education.${i}.city`)} placeholder="Ville" className="input" />
            <input {...register(`education.${i}.year`)} placeholder="Année (ex: 2020)" className="input" />
          </div>
          <textarea {...register(`education.${i}.description`)} placeholder="Description (optionnel)" className="input resize-none" rows={2} />
          <button type="button" onClick={() => remove(i)} className="text-xs text-red-400 hover:text-red-600">Supprimer</button>
        </div>
      ))}
    </div>
  );
}
