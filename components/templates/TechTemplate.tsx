"use client";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import { ResumeData } from "@/types/resume";
import { getContentScore, getFontSize, getSpacing } from "@/lib/pdfUtils";

const GREEN = "#00d4aa";
const DARK = "#0d1117";
const CARD = "#161b22";
const BORDER = "#30363d";
const MUTED = "#8b949e";

export default function TechTemplate({ data }: { data: ResumeData }) {
  const { personalInfo: p, summary, experiences, education, skills, languages, interests } = data;
  const score = getContentScore(data);
  const f = (b: number) => getFontSize(b, score);
  const s = (b: number) => getSpacing(b, score);

  const levelToPercent = { débutant: "33%", intermédiaire: "66%", expert: "100%" };

  const styles = StyleSheet.create({
    page: { backgroundColor: DARK, fontFamily: "Helvetica", fontSize: f(11), color: "#e6edf3", padding: 32 },
    header: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: s(18), paddingBottom: s(14), borderBottom: `1px solid ${BORDER}` },
    headerLeft: { flex: 1 },
    photo: { width: 62, height: 62, borderRadius: 31, objectFit: "cover", borderWidth: 2, borderColor: GREEN, marginBottom: s(6) },
    name: { fontSize: f(25), fontFamily: "Helvetica-Bold", color: "#e6edf3", marginBottom: 3 },
    titleText: { fontSize: f(12), color: GREEN, fontFamily: "Helvetica-Bold", marginBottom: s(7) },
    contactGrid: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
    contactChip: { backgroundColor: CARD, borderWidth: 1, borderColor: BORDER, paddingHorizontal: 7, paddingVertical: 2, borderRadius: 4, fontSize: f(9), color: MUTED },
    grid: { flexDirection: "row", gap: s(14) },
    mainCol: { flex: 2 },
    sideCol: { flex: 1 },
    card: { backgroundColor: CARD, borderWidth: 1, borderColor: BORDER, borderRadius: 6, padding: s(14), marginBottom: s(14) },
    sectionTitle: { fontSize: f(9), fontFamily: "Helvetica-Bold", color: GREEN, textTransform: "uppercase", letterSpacing: 2, marginBottom: s(8) },
    entryRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
    bold: { fontFamily: "Helvetica-Bold", color: "#e6edf3", fontSize: f(11) },
    sub: { fontSize: f(10), color: MUTED, marginBottom: 4 },
    description: { fontSize: f(10), color: MUTED, lineHeight: 1.6, marginTop: 5 },
    entry: { marginBottom: s(9), paddingBottom: s(9), borderBottom: `1px solid ${BORDER}` },
    entryLast: { marginBottom: 0, paddingBottom: 0 },
    tagGreen: { backgroundColor: "#0d2818", borderWidth: 1, borderColor: "#166534", paddingHorizontal: 6, paddingVertical: 2, borderRadius: 3, fontSize: f(9), color: GREEN, marginBottom: 4, marginRight: 4 },
    tagsRow: { flexDirection: "row", flexWrap: "wrap" },
    progressRow: { marginBottom: s(6) },
    progressLabel: { flexDirection: "row", justifyContent: "space-between", marginBottom: 2 },
    progressName: { fontSize: f(10), color: "#e6edf3" },
    progressLevel: { fontSize: f(9), color: GREEN },
    progressBg: { height: 3, backgroundColor: BORDER, borderRadius: 2 },
    progressFill: { height: 3, backgroundColor: GREEN, borderRadius: 2 },
    langRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: s(5) },
    langName: { fontSize: f(10), color: "#e6edf3" },
    langLevel: { fontSize: f(9), color: GREEN, fontFamily: "Helvetica-Bold" },
    summaryText: { fontSize: f(10), color: MUTED, lineHeight: 1.6 },
  });

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

        <View style={styles.grid}>
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
                {skills.map((sk) => (
                  <View key={sk.id} style={styles.progressRow}>
                    <View style={styles.progressLabel}>
                      <Text style={styles.progressName}>{sk.name}</Text>
                      <Text style={styles.progressLevel}>{sk.level}</Text>
                    </View>
                    <View style={styles.progressBg}>
                      <View style={[styles.progressFill, { width: levelToPercent[sk.level] }]} />
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
