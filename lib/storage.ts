import { ResumeData } from "@/types/resume";
import { createClient } from "@/lib/supabase/client";

export interface SavedResume {
  id: string;
  title: string;
  data: ResumeData;
  saved_at: string;
}

function getTitle(data: ResumeData): string {
  return (
    [data.personalInfo.firstName, data.personalInfo.lastName].filter(Boolean).join(" ") ||
    "CV sans titre"
  );
}

export async function getSavedResumes(): Promise<SavedResume[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("resumes")
    .select("*")
    .order("saved_at", { ascending: false });
  if (error) throw error;
  return data as SavedResume[];
}

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function saveResume(resumeData: ResumeData, existingId?: string): Promise<SavedResume> {
  const supabase = createClient();
  const title = getTitle(resumeData);

  if (existingId && UUID_REGEX.test(existingId)) {
    const { data, error } = await supabase
      .from("resumes")
      .update({ title, data: resumeData, saved_at: new Date().toISOString() })
      .eq("id", existingId)
      .select()
      .single();
    if (error) throw error;
    return data as SavedResume;
  }

  const { data, error } = await supabase
    .from("resumes")
    .insert({ title, data: resumeData })
    .select()
    .single();
  if (error) throw error;
  return data as SavedResume;
}

export async function deleteResume(id: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from("resumes").delete().eq("id", id);
  if (error) throw error;
}
