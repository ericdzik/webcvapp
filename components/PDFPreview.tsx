"use client";
import dynamic from "next/dynamic";
import { ResumeData } from "@/types/resume";
import ClassicTemplate from "./templates/ClassicTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import ExecutiveTemplate from "./templates/ExecutiveTemplate";
import CreativeTemplate from "./templates/CreativeTemplate";
import TechTemplate from "./templates/TechTemplate";

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((m) => m.PDFViewer),
  { ssr: false, loading: () => <div className="flex items-center justify-center h-full text-gray-400">Chargement...</div> }
);

const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((m) => m.PDFDownloadLink),
  { ssr: false }
);

function getTemplate(data: ResumeData) {
  switch (data.templateId) {
    case "modern":    return <ModernTemplate data={data} />;
    case "minimal":   return <MinimalTemplate data={data} />;
    case "executive": return <ExecutiveTemplate data={data} />;
    case "creative":  return <CreativeTemplate data={data} />;
    case "tech":      return <TechTemplate data={data} />;
    default:          return <ClassicTemplate data={data} />;
  }
}

export default function PDFPreview({ data }: { data: ResumeData }) {
  const doc = getTemplate(data);
  const filename = `CV_${data.personalInfo.firstName}_${data.personalInfo.lastName || "export"}.pdf`;

  return (
    <div className="flex flex-col h-full gap-3">
      <PDFDownloadLink document={doc} fileName={filename}>
        {({ loading }) => (
          <button
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Génération..." : "⬇ Télécharger le PDF"}
          </button>
        )}
      </PDFDownloadLink>
      <div className="flex-1 rounded-lg overflow-hidden border border-gray-200">
        <PDFViewer width="100%" height="100%" showToolbar={false}>
          {doc}
        </PDFViewer>
      </div>
    </div>
  );
}
