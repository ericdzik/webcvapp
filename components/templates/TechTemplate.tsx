"use client";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import { ResumeData } from "@/types/resume";
import { getFontScale, fs } from "@/lib/pdfUtils";

const GREEN = "#00d4aa";
const DARK = "#0d1117";
const CARD = "#161b22";
const BORDER = "#30363d";
const MUTED = "#8b949e";

export default function TechTemplate({ data }: { data: ResumeData }) {
  const { personalInfo: p, summary, experiences, education, skills, languages, interests } = data;
  const sc = getFontScale(data);

  const styles = StyleSheet.create({
    page: { backgroundColor: DARK, fontFamily: "Helvetica", fontSize: fs(10, sc), color: "#e6edf3", padding: fs(28, sc), display: "flex", flexDirection: "column", minHeight: "100%" },
    header: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: fs(16, sc), paddingBottom: fs(14, sc), borderBottom: `1px solid ${BORDER}` },
    headerLeft: { flex: 1 },
    photo: { width: fs(56, sc), height: fs(56, sc), borderRadius: fs(28, sc), objectFit: "cover", borderWidth: 2, borderColor: GREEN, marginBottom: fs(6, sc) },
    name: { fontSize: fs(22, sc), fontFamily: "Helvetica-Bold", color: "#e6edf3", marginBottom: 3 },
    titleText: { fontSize: fs(10, sc), color: GREEN, fontFamily: "Helvetica-Bold", marginBottom: fs(7, sc) },
    contactGrid: { flexDirection: "row", flexWrap: "wrap", gap: fs(6, sc) },
    contactChip: { backgroundColor: CARD, borderWidth: 1, borderColor: BORDER, paddingHorizontal: fs(6, sc), paddingVertical: 2, borderRadius: 4, fontSize: fs(7.5, sc), color: MUTED },
    body: { flex: 1, flexDirection: "row", gap: fs(14, sc) },
    mainCol: { flex: 2 },
    sideCol: { flex: 1 },
    card: { backgroundColor: CARD, borderWidth: 1, borderColor: BORDER, borderRadius: 5, padding: fs(10, sc), marginBottom: fs(10, sc) },
    sectionTitle: { fontSize: fs(8, sc), fontFamily: "Helvetica-Bold", color: GREEN, textTransform: "uppercase", letterSpacing: 2, marginBottom: fs(7, sc) },
    entryRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 1 },
    bold: { fontFamily: "Helvetica-Bold", color: "#e6edf3", fontSize: fs(10, sc) },
    sub: { fontSize: fs(8.5, sc), color: MUTED, marginBottom: 2 },
    description: { fontSize: fs(8.5, sc), color: MUTED, lineHeight: 1.5, marginTop: 3 },
    entry: { marginBottom: fs(8, sc), paddingBottom: fs(8, sc), borderBottom: `1px solid ${BORDER}` },
    entryLast: { marginBottom: 0, paddingBottom: 0 },
    tagGreen: { backgroundColor: "#0d2818", borderWidth: 1, borderColor: "#166534", paddingHorizontal: fs(5, sc), paddingVertical: 2, borderRadius: 3, fontSize: fs(7.5, sc), color: GREEN, marginBottom: 3, marginRight: 3 },
    tagsRow: { flexDirection: "row", flexWrap: "wrap" },
    progressRow: { marginBottom: fs(5, sc) },
    progressLabel: { flexDirection: "row", justifyContent: "space-between", marginBottom: 2 },
    progressName: { fontSize: fs(8.5, sc), color: "#e6edf3" },
    progressLevel: { fontSize: fs(7.5, sc), color: GREEN },
    progressBg: { height: 3, backgroundColor: BORDER, borderRadius: 2 },
    progressFill: { height: 3, backgroundColor: GREEN, borderRadius: 2 },
    langRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: fs(4, sc) },
    langName: { fontSize: fs(8.5, sc), color: "#e6edf3" },
    langLevel: { fontSize: fs(7.5, sc), color: GREEN, fontFamily: "Helvetica-Bold" },
    summaryText: { fontSize: fs(8.5, sc), color: MUTED, lineHeight: 1.6 },
  });

  const levelToPercent = { débutant: "33%", intermédiaire: "66%", expert: "100%" };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            {p.photo ? <Image src={p.photo} style={styles.photo} /> : null}
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

        <View style={styles.body}>
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
