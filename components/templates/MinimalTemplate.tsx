"use client";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import { ResumeData } from "@/types/resume";
import { getFontScale, fs } from "@/lib/pdfUtils";

export default function MinimalTemplate({ data }: { data: ResumeData }) {
  const { personalInfo: p, summary, experiences, education, skills, languages, interests } = data;
  const sc = getFontScale(data);

  const styles = StyleSheet.create({
    page: { padding: fs(44, sc), fontFamily: "Helvetica", fontSize: fs(10, sc), color: "#333", display: "flex", flexDirection: "column", minHeight: "100%" },
    headerRow: { flexDirection: "row", alignItems: "flex-start", gap: fs(14, sc), marginBottom: fs(16, sc) },
    headerText: { flex: 1 },
    photo: { width: fs(64, sc), height: fs(64, sc), borderRadius: fs(32, sc), objectFit: "cover" },
    name: { fontSize: fs(24, sc), fontFamily: "Helvetica-Bold", letterSpacing: 2, marginBottom: 2 },
    title: { fontSize: fs(10, sc), color: "#888", letterSpacing: 1, marginBottom: fs(5, sc) },
    contact: { flexDirection: "row", gap: fs(14, sc), fontSize: fs(8.5, sc), color: "#aaa" },
    divider: { borderBottom: "1px solid #eee", marginBottom: fs(12, sc) },
    body: { flex: 1 },
    section: { marginBottom: fs(14, sc) },
    sectionTitle: { fontSize: fs(8.5, sc), fontFamily: "Helvetica-Bold", color: "#aaa", textTransform: "uppercase", letterSpacing: 2, marginBottom: fs(7, sc) },
    row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 1 },
    bold: { fontFamily: "Helvetica-Bold", fontSize: fs(10, sc) },
    gray: { color: "#999", fontSize: fs(8.5, sc) },
    description: { marginTop: 3, color: "#555", lineHeight: 1.5, fontSize: fs(9, sc) },
    tags: { flexDirection: "row", flexWrap: "wrap", gap: fs(5, sc) },
    tag: { borderWidth: 1, borderColor: "#ddd", paddingHorizontal: fs(5, sc), paddingVertical: 2, borderRadius: 2, fontSize: fs(8.5, sc), color: "#555" },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerRow}>
          {p.photo ? <Image src={p.photo} style={styles.photo} /> : null}
          <View style={styles.headerText}>
            <Text style={styles.name}>{p.firstName} {p.lastName}</Text>
            <Text style={styles.title}>{p.title}</Text>
            <View style={styles.contact}>
              {p.email && <Text>{p.email}</Text>}
              {p.phone && <Text>{p.phone}</Text>}
              {p.city && <Text>{p.city}{p.country ? `, ${p.country}` : ""}</Text>}
              {p.linkedin && <Text>{p.linkedin}</Text>}
            </View>
          </View>
        </View>
        <View style={styles.divider} />

        <View style={styles.body}>
          {summary.text && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>À propos</Text>
              <Text style={styles.description}>{summary.text}</Text>
            </View>
          )}

          {experiences.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Expériences</Text>
              {experiences.map((exp) => (
                <View key={exp.id} style={{ marginBottom: fs(7, sc) }}>
                  <View style={styles.row}>
                    <Text style={styles.bold}>{exp.position}</Text>
                    <Text style={styles.gray}>{exp.startDate} – {exp.current ? "Présent" : exp.endDate}</Text>
                  </View>
                  <Text style={styles.gray}>{exp.company}{exp.city ? ` · ${exp.city}` : ""}</Text>
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
                    <Text style={styles.bold}>{edu.degree}</Text>
                    <Text style={styles.gray}>{edu.year}</Text>
                  </View>
                  <Text style={styles.gray}>{edu.school}{edu.city ? ` · ${edu.city}` : ""}</Text>
                </View>
              ))}
            </View>
          )}

          {skills.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Compétences</Text>
              <View style={styles.tags}>
                {skills.map((s) => <Text key={s.id} style={styles.tag}>{s.name}</Text>)}
              </View>
            </View>
          )}

          {languages.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Langues</Text>
              <View style={styles.tags}>
                {languages.map((l) => <Text key={l.id} style={styles.tag}>{l.name} {l.level}</Text>)}
              </View>
            </View>
          )}

          {interests.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Intérêts</Text>
              <Text style={styles.description}>{interests.join(" · ")}</Text>
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
}
