"use client";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { ResumeData } from "@/types/resume";

const styles = StyleSheet.create({
  page: { padding: 48, fontFamily: "Helvetica", fontSize: 10, color: "#333" },
  name: { fontSize: 26, fontFamily: "Helvetica-Bold", letterSpacing: 2, marginBottom: 2 },
  title: { fontSize: 11, color: "#888", letterSpacing: 1, marginBottom: 6 },
  contact: { flexDirection: "row", gap: 16, fontSize: 9, color: "#aaa", marginBottom: 20 },
  divider: { borderBottom: "1px solid #eee", marginBottom: 14 },
  section: { marginBottom: 16 },
  sectionTitle: { fontSize: 9, fontFamily: "Helvetica-Bold", color: "#aaa", textTransform: "uppercase", letterSpacing: 2, marginBottom: 8 },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 1 },
  bold: { fontFamily: "Helvetica-Bold", fontSize: 10 },
  gray: { color: "#999", fontSize: 9 },
  description: { marginTop: 3, color: "#555", lineHeight: 1.5, fontSize: 9 },
  tags: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  tag: { borderWidth: 1, borderColor: "#ddd", paddingHorizontal: 6, paddingVertical: 2, borderRadius: 2, fontSize: 9, color: "#555" },
});

export default function MinimalTemplate({ data }: { data: ResumeData }) {
  const { personalInfo: p, summary, experiences, education, skills, languages, interests } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.name}>{p.firstName} {p.lastName}</Text>
        <Text style={styles.title}>{p.title}</Text>
        <View style={styles.contact}>
          {p.email && <Text>{p.email}</Text>}
          {p.phone && <Text>{p.phone}</Text>}
          {p.city && <Text>{p.city}{p.country ? `, ${p.country}` : ""}</Text>}
          {p.linkedin && <Text>{p.linkedin}</Text>}
        </View>
        <View style={styles.divider} />

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
              <View key={exp.id} style={{ marginBottom: 8 }}>
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
              <View key={edu.id} style={{ marginBottom: 6 }}>
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
      </Page>
    </Document>
  );
}
