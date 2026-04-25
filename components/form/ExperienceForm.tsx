"use client";
import { useFieldArray, UseFormRegister, Control, UseFormWatch } from "react-hook-form";
import { ResumeData } from "@/types/resume";
import { generateId } from "@/lib/utils";

interface Props {
  register: UseFormRegister<ResumeData>;
  control: Control<ResumeData>;
  watch: UseFormWatch<ResumeData>;
}

export default function ExperienceForm({ register, control, watch }: Props) {
  const { fields, append, remove } = useFieldArray({ control, name: "experiences" });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-gray-700 text-sm uppercase tracking-wide">Expériences</h2>
        <button
          type="button"
          onClick={() => append({ id: generateId(), position: "", company: "", city: "", startDate: "", endDate: "", current: false, description: "" })}
          className="text-sm text-blue-600 hover:underline"
        >
          + Ajouter
        </button>
      </div>
      {fields.map((field, i) => {
        const isCurrent = watch(`experiences.${i}.current`);
        return (
          <div key={field.id} className="border border-gray-200 rounded-lg p-3 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <input {...register(`experiences.${i}.position`)} placeholder="Poste" className="input" />
              <input {...register(`experiences.${i}.company`)} placeholder="Entreprise" className="input" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <input {...register(`experiences.${i}.city`)} placeholder="Ville" className="input" />
              <input {...register(`experiences.${i}.startDate`)} placeholder="Début (ex: 2022)" className="input" />
              <input {...register(`experiences.${i}.endDate`)} placeholder="Fin" className="input" disabled={isCurrent} />
            </div>
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input type="checkbox" {...register(`experiences.${i}.current`)} />
              En cours
            </label>
            <textarea {...register(`experiences.${i}.description`)} placeholder="Description des missions..." className="input resize-none" rows={3} />
            <button type="button" onClick={() => remove(i)} className="text-xs text-red-400 hover:text-red-600">Supprimer</button>
          </div>
        );
      })}
    </div>
  );
}
