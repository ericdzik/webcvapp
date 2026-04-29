"use client";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import { ResumeData } from "@/types/resume";
import { getContentScore, getFontSize, getSpacing } from "@/lib/pdfUtils";

export default function ClassicTemplate({ data }: { data: ResumeData }) {
  const { personalInfo: p, summary, experiences, education, skills, languages, interests } = data;
  const score = getContentScore(data);
  const f = (b: number) => getFontSize(b, score);
  const s = (b: number) => getSpacing(b, score);

  const styles = StyleSheet.create({
    page: { padding: 40, fontFamily: "Helvetica", fontSize: f(10), color: "#222" },
    header: { marginBottom: s(18), borderBottom: "2px solid #222", paddingBottom: s(12), flexDirection: "row", gap: s(14), alignItems: "flex-start" },
    headerText: { flex: 1 },
    photo: { width: 72, height: 72, borderRadius: 36, objectFit: "cover" },
    name: { fontSize: f(22), fontFamily: "Helvetica-Bold", marginBottom: 2 },
    title: { fontSize: f(12), color: "#555", marginBottom: 4 },
    contact: { flexDirection: "row", gap: 12, fontSize: f(9), color: "#555", flexWrap: "wrap" },
    section: { marginTop: s(16) },
    sectionTitle: { fontSize: f(10), fontFamily: "Helvetica-Bold", borderBottom: "1px solid #222", paddingBottom: 2, marginBottom: s(8), textTransform: "uppercase", letterSpacing: 1 },
    row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 2 },
    bold: { fontFamily: "Helvetica-Bold", fontSize: f(10) },
    gray: { color: "#666", fontSize: f(9) },
    description: { marginTop: 2, color: "#444", lineHeight: 1.5, fontSize: f(9) },
    entryWrap: { marginBottom: s(10) },
    skillRow: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
    skill: { backgroundColor: "#eee", paddingHorizontal: 6, paddingVertical: 2, borderRadius: 3, fontSize: f(9) },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          {p.photo ? <Image src={p.photo} style={styles.photo} /> : null}
          <View style={styles.headerText}>
            <Text style={styles.name}>{p.firstName} {p.lastName}</Text>
            <Text style={styles.title}>{p.title}</Text>
            <View style={styles.contact}>
              {p.email && <Text>{p.email}</Text>}
              {p.phone && <Text>{p.phone}</Text>}
              {p.city && <Text>{p.city}{p.country ? `, ${p.country}` : ""}</Text>}
              {p.linkedin && <Text>{p.linkedin}</Text>}
              {p.website && <Text>{p.website}</Text>}
            </View>
          </View>
        </View>

        {summary.text && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Profil</Text>
            <Text style={styles.description}>{summary.text}</Text>
          </View>
        )}

        {experiences.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Expériences</Text>
            {experiences.map((exp) => (
              <View key={exp.id} style={styles.entryWrap}>
                <View style={styles.row}>
                  <Text style={styles.bold}>{exp.position} — {exp.company}</Text>
                  <Text style={styles.gray}>{exp.startDate} – {exp.current ? "Présent" : exp.endDate}</Text>
                </View>
                {exp.city && <Text style={styles.gray}>{exp.city}</Text>}
                {exp.description && <Text style={styles.description}>{exp.description}</Text>}
              </View>
            ))}
          </View>
        )}

        {education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Formation</Text>
            {education.map((edu) => (
              <View key={edu.id} style={styles.entryWrap}>
                <View style={styles.row}>
                  <Text style={styles.bold}>{edu.degree} — {edu.school}</Text>
                  <Text style={styles.gray}>{edu.year}</Text>
                </View>
                {edu.city && <Text style={styles.gray}>{edu.city}</Text>}
                {edu.description && <Text style={styles.description}>{edu.description}</Text>}
              </View>
            ))}
          </View>
        )}

        {skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Compétences</Text>
            <View style={styles.skillRow}>
              {skills.map((s) => <Text key={s.id} style={styles.skill}>{s.name} ({s.level})</Text>)}
            </View>
          </View>
        )}

        {languages.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Langues</Text>
            <View style={styles.skillRow}>
              {languages.map((l) => <Text key={l.id} style={styles.skill}>{l.name} — {l.level}</Text>)}
            </View>
          </View>
        )}

        {interests.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Centres d&apos;intérêt</Text>
            <Text style={styles.description}>{interests.join(" · ")}</Text>
          </View>
        )}
      </Page>
    </Document>
  );
}
