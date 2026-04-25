"use client";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { ResumeData } from "@/types/resume";

const GREEN = "#00d4aa";
const DARK = "#0d1117";
const CARD = "#161b22";
const BORDER = "#30363d";
const MUTED = "#8b949e";

const styles = StyleSheet.create({
  page: { backgroundColor: DARK, fontFamily: "Helvetica", fontSize: 10, color: "#e6edf3", padding: 32 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20, paddingBottom: 16, borderBottom: `1px solid ${BORDER}` },
  headerLeft: { flex: 1 },
  name: { fontSize: 26, fontFamily: "Helvetica-Bold", color: "#e6edf3", marginBottom: 3 },
  titleText: { fontSize: 11, color: GREEN, fontFamily: "Helvetica-Bold", marginBottom: 8 },
  contactGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  contactChip: { backgroundColor: CARD, borderWidth: 1, borderColor: BORDER, paddingHorizontal: 7, paddingVertical: 3, borderRadius: 4, fontSize: 8, color: MUTED },
  grid: { flexDirection: "row", gap: 16 },
  mainCol: { flex: 2 },
  sideCol: { flex: 1 },
  card: { backgroundColor: CARD, borderWidth: 1, borderColor: BORDER, borderRadius: 6, padding: 12, marginBottom: 12 },
  sectionTitle: { fontSize: 9, fontFamily: "Helvetica-Bold", color: GREEN, textTransform: "uppercase", letterSpacing: 2, marginBottom: 8 },
  entryRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 1 },
  bold: { fontFamily: "Helvetica-Bold", color: "#e6edf3", fontSize: 10 },
  sub: { fontSize: 9, color: MUTED, marginBottom: 2 },
  description: { fontSize: 9, color: "#8b949e", lineHeight: 1.5, marginTop: 3 },
  entry: { marginBottom: 10, paddingBottom: 10, borderBottom: `1px solid ${BORDER}` },
  entryLast: { marginBottom: 0, paddingBottom: 0 },
  tag: { backgroundColor: "#1f2937", borderWidth: 1, borderColor: "#374151", paddingHorizontal: 6, paddingVertical: 2, borderRadius: 3, fontSize: 8, color: "#9ca3af", marginBottom: 4, marginRight: 4 },
  tagGreen: { backgroundColor: "#0d2818", borderWidth: 1, borderColor: "#166534", paddingHorizontal: 6, paddingVertical: 2, borderRadius: 3, fontSize: 8, color: GREEN, marginBottom: 4, marginRight: 4 },
  tagsRow: { flexDirection: "row", flexWrap: "wrap" },
  progressRow: { marginBottom: 6 },
  progressLabel: { flexDirection: "row", justifyContent: "space-between", marginBottom: 2 },
  progressName: { fontSize: 9, color: "#e6edf3" },
  progressLevel: { fontSize: 8, color: GREEN },
  progressBg: { height: 3, backgroundColor: BORDER, borderRadius: 2 },
  progressFill: { height: 3, backgroundColor: GREEN, borderRadius: 2 },
  langRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 5 },
  langName: { fontSize: 9, color: "#e6edf3" },
  langLevel: { fontSize: 8, color: GREEN, fontFamily: "Helvetica-Bold" },
  summaryText: { fontSize: 9, color: MUTED, lineHeight: 1.6 },
});

const levelToPercent = { débutant: "33%", intermédiaire: "66%", expert: "100%" };

export default function TechTemplate({ data }: { data: ResumeData }) {
  const { personalInfo: p, summary, experiences, education, skills, languages, interests } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.name}>{p.firstName} {p.lastName}</Text>
            <Text style={styles.titleText}>{p.title}</Text>
            <View style={styles.contactGrid}>
              {p.email && <Text style={styles.contactChip}>{p.email}</Text>}
              {p.phone && <Text style={styles.contactChip}>{p.phone}</Text>}
              {p.city && <Text style={styles.contactChip}>{p.city}{p.country ? `, ${p.country}` : ""}</Text>}
              {p.linkedin && <Text style={styles.contactChip}>{p.linkedin}</Text>}
              {p.website && <Text style={styles.contactChip}>{p.website}</Text>}
            </View>
          </View>
        </View>

        <View style={styles.grid}>
          {/* Main column */}
          <View style={styles.mainCol}>
            {summary.text && (
              <View style={styles.card}>
                <Text style={styles.sectionTitle}>// À propos</Text>
                <Text style={styles.summaryText}>{summary.text}</Text>
              </View>
            )}

            {experiences.length > 0 && (
              <View style={styles.card}>
                <Text style={styles.sectionTitle}>// Expériences</Text>
                {experiences.map((exp, idx) => (
                  <View key={exp.id} style={idx === experiences.length - 1 ? styles.entryLast : styles.entry}>
                    <View style={styles.entryRow}>
                      <Text style={styles.bold}>{exp.position}</Text>
                      <Text style={styles.sub}>{exp.startDate} – {exp.current ? "Présent" : exp.endDate}</Text>
                    </View>
                    <Text style={styles.sub}>{exp.company}{exp.city ? ` · ${exp.city}` : ""}</Text>
                    {exp.description && <Text style={styles.description}>{exp.description}</Text>}
                  </View>
                ))}
              </View>
            )}

            {education.length > 0 && (
              <View style={styles.card}>
                <Text style={styles.sectionTitle}>// Formation</Text>
                {education.map((edu, idx) => (
                  <View key={edu.id} style={idx === education.length - 1 ? styles.entryLast : styles.entry}>
                    <View style={styles.entryRow}>
                      <Text style={styles.bold}>{edu.degree}</Text>
                      <Text style={styles.sub}>{edu.year}</Text>
                    </View>
                    <Text style={styles.sub}>{edu.school}{edu.city ? ` · ${edu.city}` : ""}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Side column */}
          <View style={styles.sideCol}>
            {skills.length > 0 && (
              <View style={styles.card}>
                <Text style={styles.sectionTitle}>// Stack</Text>
                {skills.map((s) => (
                  <View key={s.id} style={styles.progressRow}>
                    <View style={styles.progressLabel}>
                      <Text style={styles.progressName}>{s.name}</Text>
                      <Text style={styles.progressLevel}>{s.level}</Text>
                    </View>
                    <View style={styles.progressBg}>
                      <View style={[styles.progressFill, { width: levelToPercent[s.level] }]} />
                    </View>
                  </View>
                ))}
              </View>
            )}

            {languages.length > 0 && (
              <View style={styles.card}>
                <Text style={styles.sectionTitle}>// Langues</Text>
                {languages.map((l) => (
                  <View key={l.id} style={styles.langRow}>
                    <Text style={styles.langName}>{l.name}</Text>
                    <Text style={styles.langLevel}>{l.level}</Text>
                  </View>
                ))}
              </View>
            )}

            {interests.length > 0 && (
              <View style={styles.card}>
                <Text style={styles.sectionTitle}>// Intérêts</Text>
                <View style={styles.tagsRow}>
                  {interests.map((item, i) => (
                    <Text key={i} style={styles.tagGreen}>{item}</Text>
                  ))}
                </View>
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}
