"use client";
import { useEffect, useState } from "react";
import { getSavedResumes, deleteResume, SavedResume } from "@/lib/storage";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, LogOut, FileText } from "lucide-react";

const TEMPLATE_COLORS: Record<string, string> = {
  classic:   "bg-gray-800",
  modern:    "bg-blue-700",
  minimal:   "bg-stone-500",
  executive: "bg-slate-900",
  creative:  "bg-red-600",
  tech:      "bg-emerald-500",
};

const TEMPLATE_LABELS: Record<string, string> = {
  classic:   "Classic",
  modern:    "Modern",
  minimal:   "Minimal",
  executive: "Executive",
  creative:  "Creative",
  tech:      "Tech",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

export default function DashboardPage() {
  const router = useRouter();
  const [resumes, setResumes] = useState<SavedResume[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      setUserEmail(user?.email ?? null);
      const data = await getSavedResumes();
      setResumes(data);
    } catch {
      setError("Impossible de charger les CVs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer ce CV ?")) return;
    try {
      await deleteResume(id);
      setResumes((prev) => prev.filter((r) => r.id !== id));
    } catch {
      alert("Erreur lors de la suppression.");
    }
  };

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-blue-600">CV Generator</Link>
        <div className="flex items-center gap-4">
          {userEmail && (
            <span className="text-sm text-gray-400 hidden sm:block">{userEmail}</span>
          )}
          <Link
            href="/create"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
          >
            <Plus size={15} />
            Nouveau CV
          </Link>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition"
          >
            <LogOut size={15} />
            <span className="hidden sm:block">Déconnexion</span>
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Mes CVs</h1>

        {loading && <p className="text-gray-400 text-sm">Chargement...</p>}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 text-sm mb-6">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <p className="text-gray-500 text-sm mb-8">
              {resumes.length === 0
                ? "Aucun CV sauvegardé pour l'instant."
                : `${resumes.length} CV${resumes.length > 1 ? "s" : ""} sauvegardé${resumes.length > 1 ? "s" : ""}`}
            </p>

            {resumes.length === 0 ? (
              <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-2xl">
                <FileText size={40} className="text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-6">Tu n&apos;as pas encore de CV sauvegardé.</p>
                <Link
                  href="/create"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition"
                >
                  <Plus size={16} />
                  Créer mon premier CV
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {resumes.map((resume) => (
                  <div
                    key={resume.id}
                    className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col gap-4 hover:shadow-md transition"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-1 h-12 rounded-full flex-shrink-0 ${TEMPLATE_COLORS[resume.data.templateId] ?? "bg-gray-400"}`} />
                      <div>
                        <p className="font-semibold text-gray-900">{resume.title}</p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {TEMPLATE_LABELS[resume.data.templateId] ?? resume.data.templateId}
                        </p>
                      </div>
                    </div>

                    <div className="text-xs text-gray-400 space-y-1">
                      {resume.data.personalInfo.title && (
                        <p className="text-gray-600 font-medium">{resume.data.personalInfo.title}</p>
                      )}
                      {resume.data.personalInfo.email && <p>{resume.data.personalInfo.email}</p>}
                      <p>Sauvegardé le {formatDate(resume.saved_at)}</p>
                    </div>

                    <div className="flex gap-2 mt-auto">
                      <Link
                        href={`/create?id=${resume.id}`}
                        className="flex-1 inline-flex items-center justify-center gap-2 text-sm font-semibold bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 rounded-lg transition"
                      >
                        <Pencil size={14} />
                        Modifier
                      </Link>
                      <button
                        onClick={() => handleDelete(resume.id)}
                        className="inline-flex items-center justify-center gap-2 text-sm font-semibold bg-red-50 hover:bg-red-100 text-red-500 px-4 py-2 rounded-lg transition"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
