"use client";
import { UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { ResumeData } from "@/types/resume";
import PhotoUpload from "./PhotoUpload";

interface Props {
  register: UseFormRegister<ResumeData>;
  setValue: UseFormSetValue<ResumeData>;
  watch: UseFormWatch<ResumeData>;
}

export default function PersonalInfoForm({ register, setValue, watch }: Props) {
  const photo = watch("personalInfo.photo") ?? "";

  return (
    <div className="space-y-3">
      <h2 className="font-bold text-gray-700 text-sm uppercase tracking-wide">Informations personnelles</h2>

      <PhotoUpload
        value={photo}
        onChange={(base64) => setValue("personalInfo.photo", base64)}
      />

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
