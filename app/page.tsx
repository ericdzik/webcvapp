import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-5xl font-bold text-gray-900 mb-4">
        Crée ton CV en <span className="text-blue-600">quelques minutes</span>
      </h1>
      <p className="text-lg text-gray-500 max-w-xl mb-8">
        Remplis un formulaire simple, choisis un template, et télécharge ton CV en PDF instantanément.
      </p>
      <Link
        href="/create"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl text-lg transition"
      >
        Créer mon CV →
      </Link>

      <div className="mt-16 grid grid-cols-3 gap-6 max-w-2xl w-full">
        {[
          { icon: "📝", title: "Formulaire simple", desc: "Remplis tes infos section par section" },
          { icon: "🎨", title: "3 templates", desc: "Classic, Modern ou Minimal" },
          { icon: "⬇️", title: "Export PDF", desc: "Télécharge ton CV en un clic" },
        ].map((f) => (
          <div key={f.title} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-left">
            <div className="text-2xl mb-2">{f.icon}</div>
            <p className="font-semibold text-gray-800">{f.title}</p>
            <p className="text-sm text-gray-500 mt-1">{f.desc}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
