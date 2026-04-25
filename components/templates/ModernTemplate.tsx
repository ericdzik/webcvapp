"use client";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { ResumeData } from "@/types/resume";

const ACCENT = "#2563eb";

const styles = StyleSheet.create({
  page: { flexDirection: "row", fontFamily: "Helvetica", fontSize: 10, color: "#222" },
  sidebar: { width: "35%", backgroundColor: "#1e3a5f", color: "#fff", padding: 24 },
  main: { width: "65%", padding: 24 },
  name: { fontSize: 18, fontFamily: "Helvetica-Bold", color: "#fff", marginBottom: 2 },
  title: { fontSize: 10, color: "#93c5fd", marginBottom: 16 },
  sideSection: { marginBottom: 14 },
  sideSectionTitle: { fontSize: 9, fontFamily: "Helvetica-Bold", color: "#93c5fd", textTransform: "uppercase", letterSpacing: 1, borderBottom: "1px solid #3b5998", paddingBottom: 3, marginBottom: 6 },
  sideText: { color: "#dbeafe", fontSize: 9, marginBottom: 3 },
  mainSection: { marginBottom: 14 },
  mainSectionTitle: { fontSize: 11, fontFamily: "Helvetica-Bold", color: ACCENT, borderBottom: `1px solid ${ACCENT}`, paddingBottom: 2, marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 1 },
  bold: { fontFamily: "Helvetica-Bold" },
  gray: { color: "#666", fontSize: 9 },
  description: { marginTop: 2, color: "#444", lineHeight: 1.4 },
  skillBar: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
  skillName: { color: "#dbeafe", fontSize: 9, width: 80 },
  barBg: { flex: 1, height: 4, backgroundColor: "#3b5998", borderRadius: 2 },
  barFill: { height: 4, backgroundColor: "#93c5fd", borderRadius: 2 },
});

const levelToPercent = { débutant: "33%", intermédiaire: "66%", expert: "100%" };

export default function ModernTemplate({ data }: { data: ResumeData }) {
  const { personalInfo: p, summary, experiences, education, skills, languages, interests } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Sidebar */}
        <View style={styles.sidebar}>
          <Text style={styles.name}>{p.firstName} {p.lastName}</Text>
          <Text style={styles.title}>{p.title}</Text>

          <View style={styles.sideSection}>
            <Text style={styles.sideSectionTitle}>Contact</Text>
            {p.email && <Text style={styles.sideText}>{p.email}</Text>}
            {p.phone && <Text style={styles.sideText}>{p.phone}</Text>}
            {p.city && <Text style={styles.sideText}>{p.city}{p.country ? `, ${p.country}` : ""}</Text>}
            {p.linkedin && <Text style={styles.sideText}>{p.linkedin}</Text>}
            {p.website && <Text style={styles.sideText}>{p.website}</Text>}
          </View>

          {skills.length > 0 && (
            <View style={styles.sideSection}>
              <Text style={styles.sideSectionTitle}>Compétences</Text>
              {skills.map((s) => (
                <View key={s.id} style={styles.skillBar}>
                  <Text style={styles.skillName}>{s.name}</Text>
                  <View style={styles.barBg}>
                    <View style={[styles.barFill, { width: levelToPercent[s.level] }]} />
                  </View>
                </View>
              ))}
            </View>
          )}

          {languages.length > 0 && (
            <View style={styles.sideSection}>
              <Text style={styles.sideSectionTitle}>Langues</Text>
              {languages.map((l) => (
                <Text key={l.id} style={styles.sideText}>{l.name} — {l.level}</Text>
              ))}
            </View>
          )}

          {interests.length > 0 && (
            <View style={styles.sideSection}>
              <Text style={styles.sideSectionTitle}>Intérêts</Text>
              <Text style={styles.sideText}>{interests.join(" · ")}</Text>
            </View>
          )}
        </View>

        {/* Main */}
        <View style={styles.main}>
          {summary.text && (
            <View style={styles.mainSection}>
              <Text style={styles.mainSectionTitle}>Profil</Text>
              <Text style={styles.description}>{summary.text}</Text>
            </View>
          )}

          {experiences.length > 0 && (
            <View style={styles.mainSection}>
              <Text style={styles.mainSectionTitle}>Expériences</Text>
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
            <View style={styles.mainSection}>
              <Text style={styles.mainSectionTitle}>Formation</Text>
              {education.map((edu) => (
                <View key={edu.id} style={{ marginBottom: 6 }}>
                  <View style={styles.row}>
                    <Text style={styles.bold}>{edu.degree}</Text>
                    <Text style={styles.gray}>{edu.year}</Text>
                  </View>
                  <Text style={styles.gray}>{edu.school}{edu.city ? ` · ${edu.city}` : ""}</Text>
                  {edu.description && <Text style={styles.description}>{edu.description}</Text>}
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
}
