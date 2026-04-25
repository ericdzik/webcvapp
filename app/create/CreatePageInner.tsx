"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ResumeData, defaultResumeData, TemplateId } from "@/types/resume";
import PersonalInfoForm from "@/components/form/PersonalInfoForm";
import ExperienceForm from "@/components/form/ExperienceForm";
import EducationForm from "@/components/form/EducationForm";
import SkillsForm from "@/components/form/SkillsForm";
import LanguagesForm from "@/components/form/LanguagesForm";
import InterestsForm from "@/components/form/InterestsForm";
import TemplatePicker from "@/components/TemplatePicker";
import { saveResume, getSavedResumes } from "@/lib/storage";
import { createClient } from "@/lib/supabase/client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Save, LayoutDashboard, LogOut, LogIn } from "lucide-react";

const PDFPreview = dynamic(() => import("@/components/PDFPreview"), { ssr: false });

type SaveStatus = "idle" | "saving" | "saved" | "error";

export default function CreatePageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");

  const { register, control, watch, setValue, getValues, reset } = useForm<ResumeData>({
    defaultValues: defaultResumeData,
  });

  const [currentId, setCurrentId] = useState<string | undefined>(editId ?? undefined);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  // Vérifie si l'utilisateur est connecté
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setIsLoggedIn(!!user);
    });
  }, []);

  // Charge le CV existant si édition
  useEffect(() => {
    if (!editId) return;
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(editId);
    if (!isUUID) {
      setCurrentId(undefined);
      window.history.replaceState(null, "", "/create");
      return;
    }
    getSavedResumes().then((resumes) => {
      const found = resumes.find((r) => r.id === editId);
      if (found) {
        reset(found.data);
        setCurrentId(found.id);
      }
    });
  }, [editId, reset]);

  const formData = watch();

  const handleSave = async () => {
    // Pas connecté → redirige vers login avec retour après connexion
    if (!isLoggedIn) {
      router.push("/auth/login?next=/create");
      return;
    }
    setSaveStatus("saving");
    try {
      const saved = await saveResume(getValues(), currentId);
      setCurrentId(saved.id);
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2500);
    } catch (e) {
      console.error(e);
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 2500);
    }
  };

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setIsLoggedIn(false);
  };

  const saveLabel: Record<SaveStatus, string> = {
    idle:   "Sauvegarder",
    saving: "Sauvegarde...",
    saved:  "Sauvegardé !",
    error:  "Erreur",
  };

  const saveBtnClass: Record<SaveStatus, string> = {
    idle:   "bg-blue-600 hover:bg-blue-700 text-white",
    saving: "bg-blue-400 text-white cursor-wait",
    saved:  "bg-green-600 text-white",
    error:  "bg-red-500 text-white",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-blue-600">CV Generator</Link>
        <div className="flex items-center gap-3">

          {/* Connecté : lien dashboard + déconnexion */}
          {isLoggedIn && (
            <>
              <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition">
                <LayoutDashboard size={15} />
                <span className="hidden sm:block">Mes CVs</span>
              </Link>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 transition"
                title="Déconnexion"
              >
                <LogOut size={15} />
              </button>
            </>
          )}

          {/* Pas connecté : lien connexion */}
          {isLoggedIn === false && (
            <Link href="/auth/login" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition">
              <LogIn size={15} />
              <span className="hidden sm:block">Connexion</span>
            </Link>
          )}

          {/* Bouton sauvegarder — toujours visible */}
          <button
            onClick={handleSave}
            disabled={saveStatus === "saving"}
            className={`inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg transition ${saveBtnClass[saveStatus]}`}
            title={!isLoggedIn ? "Connexion requise pour sauvegarder" : undefined}
          >
            <Save size={15} />
            {saveLabel[saveStatus]}
          </button>

        </div>
      </header>

      <div className="flex h-[calc(100vh-65px)]">
        <div className="w-1/2 overflow-y-auto p-6 space-y-8 border-r border-gray-200 bg-white">
          <div className="space-y-2">
            <h2 className="font-bold text-gray-700 text-sm uppercase tracking-wide">Choix du template</h2>
            <TemplatePicker
              selected={formData.templateId}
              onChange={(id: TemplateId) => setValue("templateId", id)}
            />
          </div>

          <PersonalInfoForm register={register} />

          <div className="space-y-2">
            <h2 className="font-bold text-gray-700 text-sm uppercase tracking-wide">Résumé / Profil</h2>
            <textarea
              {...register("summary.text")}
              placeholder="Quelques lignes pour vous présenter..."
              className="input resize-none w-full"
              rows={4}
            />
          </div>

          <ExperienceForm register={register} control={control} watch={watch} />
          <EducationForm register={register} control={control} />
          <SkillsForm register={register} control={control} />
          <LanguagesForm register={register} control={control} />
          <InterestsForm watch={watch} setValue={setValue} getValues={getValues} />
        </div>

        <div className="w-1/2 p-6 bg-gray-50">
          <PDFPreview data={formData} />
        </div>
      </div>
    </div>
  );
}
