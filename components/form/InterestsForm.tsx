"use client";
import { useState } from "react";
import { UseFormGetValues, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { ResumeData } from "@/types/resume";

interface Props {
  watch: UseFormWatch<ResumeData>;
  setValue: UseFormSetValue<ResumeData>;
  getValues: UseFormGetValues<ResumeData>;
}

export default function InterestsForm({ watch, setValue, getValues }: Props) {
  const [input, setInput] = useState("");
  const interests = watch("interests") || [];

  const add = () => {
    const val = input.trim();
    if (!val) return;
    setValue("interests", [...getValues("interests"), val]);
    setInput("");
  };

  const remove = (i: number) => {
    const updated = [...getValues("interests")];
    updated.splice(i, 1);
    setValue("interests", updated);
  };

  return (
    <div className="space-y-3">
      <h2 className="font-bold text-gray-700 text-sm uppercase tracking-wide">Centres d&apos;intérêt</h2>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), add())}
          placeholder="Ex: Photographie"
          className="input flex-1"
        />
        <button type="button" onClick={add} className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
          +
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {interests.map((item, i) => (
          <span key={i} className="flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
            {item}
            <button type="button" onClick={() => remove(i)} className="text-gray-400 hover:text-red-500 ml-1">✕</button>
          </span>
        ))}
      </div>
    </div>
  );
}
