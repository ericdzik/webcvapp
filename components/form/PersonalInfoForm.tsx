"use client";
import { UseFormRegister } from "react-hook-form";
import { ResumeData } from "@/types/resume";

interface Props {
  register: UseFormRegister<ResumeData>;
}

export default function PersonalInfoForm({ register }: Props) {
  return (
    <div className="space-y-3">
      <h2 className="font-bold text-gray-700 text-sm uppercase tracking-wide">Informations personnelles</h2>
      <div className="grid grid-cols-2 gap-3">
        <input {...register("personalInfo.firstName")} placeholder="Prénom" className="input" />
        <input {...register("personalInfo.lastName")} placeholder="Nom" className="input" />
      </div>
      <input {...register("personalInfo.title")} placeholder="Titre / Poste visé" className="input" />
      <div className="grid grid-cols-2 gap-3">
        <input {...register("personalInfo.email")} placeholder="Email" type="email" className="input" />
        <input {...register("personalInfo.phone")} placeholder="Téléphone" className="input" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <input {...register("personalInfo.city")} placeholder="Ville" className="input" />
        <input {...register("personalInfo.country")} placeholder="Pays" className="input" />
      </div>
      <input {...register("personalInfo.linkedin")} placeholder="LinkedIn (optionnel)" className="input" />
      <input {...register("personalInfo.website")} placeholder="Site web (optionnel)" className="input" />
    </div>
  );
}
