"use client";
import { TemplateId } from "@/types/resume";

const templates: { id: TemplateId; name: string; description: string; color: string }[] = [
  { id: "classic", name: "Classic", description: "Sobre et traditionnel", color: "bg-gray-800" },
  { id: "modern", name: "Modern", description: "2 colonnes, coloré", color: "bg-blue-700" },
  { id: "minimal", name: "Minimal", description: "Épuré, typographie soignée", color: "bg-stone-500" },
  { id: "executive", name: "Executive", description: "Dark header, accent doré", color: "bg-slate-900" },
  { id: "creative", name: "Creative", description: "Sidebar rouge, dynamique", color: "bg-red-600" },
  { id: "tech", name: "Tech", description: "Style dark mode GitHub", color: "bg-emerald-500" },
];

interface Props {
  selected: TemplateId;
  onChange: (id: TemplateId) => void;
}

export default function TemplatePicker({ selected, onChange }: Props) {
  return (
    <div className="flex gap-3 flex-wrap">
      {templates.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`flex-1 min-w-[120px] rounded-xl border-2 p-3 text-left transition ${
            selected === t.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <div className={`w-full h-2 rounded mb-2 ${t.color}`} />
          <p className="font-semibold text-sm">{t.name}</p>
          <p className="text-xs text-gray-500">{t.description}</p>
        </button>
      ))}
    </div>
  );
}
