"use client";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import { ResumeData } from "@/types/resume";
import { getFontScale, fs } from "@/lib/pdfUtils";

export default function ClassicTemplate({ data }: { data: ResumeData }) {
  const { personalInfo: p, summary, experiences, education, skills, languages, interests } = data;
  const sc = getFontScale(data);

  const styles = StyleSheet.create({
    page: { padding: 36, fontFamily: "Helvetica", fontSize: fs(10, sc), color: "#222", display: "flex", flexDirection: "column", minHeight: "100%" },
    header: { marginBottom: fs(14, sc), borderBottom: "2px solid #222", paddingBottom: fs(10, sc), flexDirection: "row", gap: fs(14, sc), alignItems: "flex-start" },
    headerText: { flex: 1 },
    photo: { width: fs(68, sc), height: fs(68, sc), borderRadius: fs(34, sc), objectFit: "cover" },
    name: { fontSize: fs(22, sc), fontFamily: "Helvetica-Bold", marginBottom: 2 },
    title: { fontSize: fs(11, sc), color: "#555", marginBottom: 4 },
    contact: { flexDirection: "row", gap: fs(10, sc), fontSize: fs(8.5, sc), color: "#555", flexWrap: "wrap" },
    body: { flex: 1 },
    section: { marginTop: fs(12, sc) },
    sectionTitle: { fontSize: fs(10, sc), fontFamily: "Helvetica-Bold", borderBottom: "1px solid #222", paddingBottom: 2, marginBottom: fs(6, sc), textTransform: "uppercase", letterSpacing: 1 },
    row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 2 },
    bold: { fontFamily: "Helvetica-Bold", fontSize: fs(10, sc) },
    gray: { color: "#666", fontSize: fs(8.5, sc) },
    description: { marginTop: 2, color: "#444", lineHeight: 1.4, fontSize: fs(9, sc) },
    skillRow: { flexDirection: "row", flexWrap: "wrap", gap: fs(5, sc) },
    skill: { backgroundColor: "#eee", paddingHorizontal: fs(5, sc), paddingVertical: 2, borderRadius: 3, fontSize: fs(8.5, sc) },
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

        <View style={styles.body}>
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
                <View key={exp.id} style={{ marginBottom: fs(7, sc) }}>
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
                <View key={edu.id} style={{ marginBottom: fs(5, sc) }}>
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
        </View>
      </Page>
    </Document>
  );
}
