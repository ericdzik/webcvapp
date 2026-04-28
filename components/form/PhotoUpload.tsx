"use client";
import { useRef } from "react";
import { Camera, X } from "lucide-react";

interface Props {
  value: string;
  onChange: (base64: string) => void;
}

export default function PhotoUpload({ value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex items-center gap-4">
      {/* Preview */}
      <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200 bg-gray-50 flex-shrink-0">
        {value ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt="Photo" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
            >
              <X size={10} />
            </button>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <Camera size={28} />
          </div>
        )}
      </div>

      {/* Actions */}
      <div>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          {value ? "Changer la photo" : "Ajouter une photo"}
        </button>
        <p className="text-xs text-gray-400 mt-0.5">JPG, PNG — max 2 Mo</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={handleFile}
        />
      </div>
    </div>
  );
}
