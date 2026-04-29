import Link from "next/link";
import { FileText, Download, Palette, Save, ArrowRight, CheckCircle } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Formulaire guidé",
    desc: "Remplis tes infos section par section. Expériences, formations, compétences, langues — tout est structuré.",
  },
  {
    icon: Palette,
    title: "6 templates pro",
    desc: "Classic, Modern, Minimal, Executive, Creative, Tech. Prévisualisation en temps réel à chaque changement.",
  },
  {
    icon: Download,
    title: "Export PDF instantané",
    desc: "Télécharge ton CV en PDF haute qualité en un clic, prêt a envoyer.",
  },
  {
    icon: Save,
    title: "Sauvegarde cloud",
    desc: "Tes CVs sont sauvegardés en base de données. Accès et modification depuis n'importe quel appareil.",
  },
];

const templates = [
  { name: "Classic", color: "bg-gray-800", desc: "Sobre & traditionnel" },
  { name: "Modern", color: "bg-blue-600", desc: "2 colonnes coloré" },
  { name: "Minimal", color: "bg-stone-500", desc: "Épuré & élégant" },
  { name: "Executive", color: "bg-slate-900", desc: "Dark header doré" },
  { name: "Creative", color: "bg-red-600", desc: "Sidebar dynamique" },
  { name: "Tech", color: "bg-emerald-500", desc: "Dark mode GitHub" },
];

const steps = [
  { n: "01", title: "Remplis le formulaire", desc: "Infos perso, expériences, compétences et plus." },
  { n: "02", title: "Choisis un template", desc: "6 designs professionnels avec prévisualisation live." },
  { n: "03", title: "Télécharge ton CV", desc: "Export PDF en un clic, prêt à envoyer." },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-lg font-bold text-blue-600 tracking-tight">CV Generator</span>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-900 transition">
              Mes CVs
            </Link>
            <Link
              href="/create"
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
            >
              Commencer
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-24 px-6 text-center bg-gradient-to-b from-blue-50/60 to-white">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-6 tracking-wide uppercase">
            6 templates professionnels
          </span>
          <h1 className="text-5xl font-bold leading-tight text-gray-900 mb-6">
            Crée ton CV en<br />
            <span className="text-blue-600">quelques minutes</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto mb-10">
            Remplis un formulaire simple, choisis un design, et télécharge ton CV en PDF instantanément. Sauvegardé dans le cloud pour y accéder partout.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/create"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3.5 rounded-xl text-base transition shadow-lg shadow-blue-200"
            >
              Créer mon CV
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 font-semibold px-7 py-3.5 rounded-xl text-base transition"
            >
              Voir mes CVs
            </Link>
          </div>
        </div>
      </section>

      {/* Templates */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">6 templates inclus</h2>
            <p className="text-gray-500">Prévisualisation en temps réel, changement en un clic.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {templates.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition group">
                <div className={`h-1.5 w-12 rounded-full ${t.color} mb-4 group-hover:w-20 transition-all duration-300`} />
                <p className="font-semibold text-gray-900">{t.name}</p>
                <p className="text-sm text-gray-400 mt-1">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Tout ce qu&apos;il te faut</h2>
            <p className="text-gray-500">Simple, rapide, professionnel.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((f) => (
              <div key={f.title} className="flex gap-4 p-6 rounded-2xl border border-gray-100 hover:border-blue-100 hover:bg-blue-50/30 transition">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <f.icon size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">{f.title}</p>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Comment ça marche</h2>
            <p className="text-gray-500">3 étapes, moins de 5 minutes.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <div key={s.n} className="relative text-center">
                {i < steps.length - 1 && (
                  <div className="hidden sm:block absolute top-6 left-[60%] w-full h-px bg-gray-200" />
                )}
                <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-bold text-sm mx-auto mb-4 relative z-10">
                  {s.n}
                </div>
                <p className="font-semibold text-gray-900 mb-2">{s.title}</p>
                <p className="text-sm text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center bg-blue-600">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">Prêt à créer ton CV ?</h2>
          <p className="text-blue-100 mb-8">Gratuit, sans inscription, en ligne en quelques minutes.</p>
          <Link
            href="/create"
            className="inline-flex items-center gap-2 bg-white text-blue-600 font-bold px-8 py-4 rounded-xl text-base hover:bg-blue-50 transition shadow-xl"
          >
            Créer mon CV maintenant
            <ArrowRight size={18} />
          </Link>
          <div className="flex items-center justify-center gap-6 mt-8 text-blue-100 text-sm">
            {["Gratuit", "6 templates", "Export PDF", "Sauvegarde cloud"].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <CheckCircle size={14} />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-100 text-center text-sm text-gray-400">
        CV Generator — Tous droits réservés {new Date().getFullYear()}
      </footer>
    </div>
  );
}
