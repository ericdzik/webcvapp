export type TemplateId = "classic" | "modern" | "minimal" | "executive" | "creative" | "tech";

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  linkedin?: string;
  website?: string;
  photo?: string;
}

export interface Summary {
  text: string;
}

export interface Experience {
  id: string;
  position: string;
  company: string;
  city: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  city: string;
  year: string;
  description?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: "débutant" | "intermédiaire" | "expert";
}

export interface Language {
  id: string;
  name: string;
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | "Natif";
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: Summary;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
  interests: string[];
  templateId: TemplateId;
}

export const defaultResumeData: ResumeData = {
  personalInfo: {
    firstName: "",
    lastName: "",
    title: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    linkedin: "",
    website: "",
    photo: "",
  },
  summary: { text: "" },
  experiences: [],
  education: [],
  skills: [],
  languages: [],
  interests: [],
  templateId: "classic",
};
