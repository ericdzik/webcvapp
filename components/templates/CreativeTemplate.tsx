"use client";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { ResumeData } from "@/types/resume";

const ACCENT = "#e63946";
const LIGHT = "#fff5f5";

const styles = StyleSheet.create({
  page: { flexDirection: "row", fontFamily: "Helvetica", fontSize: 10, color: "#2d2d2d" },
  sidebar: { width: "32%", backgroundColor: LIGHT, padding: "32 16 24 16", borderRight: `3px solid ${ACCENT}` },
  main: { width: "68%", padding: "32 24 24 24" },
  // Sidebar
  avatarBox: { width: 64, height: 64, borderRadius: 32, backgroundColor: ACCENT, alignItems: "center", justifyContent: "center", marginBottom: 12 },
  avatarText: { color: "#fff", fontSize: 22, fontFamily: "Helvetica-Bold" },
  sideTitle: { fontSize: 8, fontFamily: "Helvetica-Bold", color: ACCENT, textTransform: "uppercase", letterSpacing: 2, marginBottom: 6, marginTop: 14 },
  sideDivider: { height: 1, backgroundColor: ACCENT, marginBottom: 8, opacity: 0.3 },
  sideText: { fontSize: 9, color: "#555", marginBottom: 3, lineHeight: 1.4 },
  skillBar: { marginBottom: 5 },
  skillName: { fontSize: 9, color: "#333", marginBottom: 2 },
  barBg: { height: 3, backgroundColor: "#f0c0c3", borderRadius: 2 },
  barFill: { height: 3, backgroundColor: ACCENT, borderRadius: 2 },
  langRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 3 },
  langLevel: { fontSize: 8, color: ACCENT, fontFamily: "Helvetica-Bold" },
  // Main
  name: { fontSize: 24, fontFamily: "Helvetica-Bold", color: "#1a1a1a", marginBottom: 2 },
  titleText: { fontSize: 11, color: ACCENT, fontFamily: "Helvetica-Bold", letterSpacing: 1, marginBottom: 16 },
  accentLine: { height: 3, width: 40, backgroundColor: ACCENT, marginBottom: 16 },
  sectionTitle: { fontSize: 10, fontFamily: "Helvetica-Bold", color: ACCENT, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8 },
  entryRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 1 },
  bold: { fontFamily: "Helvetica-Bold", fontSize: 10 },
  sub: { fontSize: 9, color: "#888", marginBottom: 2 },
  description: { fontSize: 9, color: "#555", lineHeight: 1.5, marginTop: 2 },
  section: { marginBottom: 16 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: ACCENT, marginRight: 6, marginTop: 2 },
  dotRow: { flexDirection: "row", alignItems: "flex-start", marginBottom: 8 },
  dotContent: { flex: 1 },
});

const levelToPercent = { débutant: "33%", intermédiaire: "66%", expert: "100%" };

export default function CreativeTemplate({ data }: { data: ResumeData }) {
  const { personalInfo: p, summary, experiences, education, skills, languages, interests } = data;
  const initials = `${p.firstName?.[0] ?? ""}${p.lastName?.[0] ?? ""}`.toUpperCase();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Sidebar */}
        <View style={styles.sidebar}>
          <View style={styles.avatarBox}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>

          <Text style={styles.name}>{p.firstName}</Text>
          <Text style={{ ...styles.name, fontSize: 18 }}>{p.lastName}</Text>
          <Text style={{ fontSize: 9, color: ACCENT, fontFamily: "Helvetica-Bold", marginTop: 2, marginBottom: 12 }}>{p.title}</Text>

          <Text style={styles.sideTitle}>Contact</Text>
          <View style={styles.sideDivider} />
          {p.email && <Text style={styles.sideText}>{p.email}</Text>}
          {p.phone && <Text style={styles.sideText}>{p.phone}</Text>}
          {p.city && <Text style={styles.sideText}>{p.city}{p.country ? `, ${p.country}` : ""}</Text>}
          {p.linkedin && <Text style={styles.sideText}>{p.linkedin}</Text>}
          {p.website && <Text style={styles.sideText}>{p.website}</Text>}

          {skills.length > 0 && (
            <>
              <Text style={styles.sideTitle}>Compétences</Text>
              <View style={styles.sideDivider} />
              {skills.map((s) => (
                <View key={s.id} style={styles.skillBar}>
                  <Text style={styles.skillName}>{s.name}</Text>
                  <View style={styles.barBg}>
                    <View style={[styles.barFill, { width: levelToPercent[s.level] }]} />
                  </View>
                </View>
              ))}
            </>
          )}

          {languages.length > 0 && (
            <>
              <Text style={styles.sideTitle}>Langues</Text>
              <View style={styles.sideDivider} />
              {languages.map((l) => (
                <View key={l.id} style={styles.langRow}>
                  <Text style={styles.sideText}>{l.name}</Text>
                  <Text style={styles.langLevel}>{l.level}</Text>
                </View>
              ))}
            </>
          )}

          {interests.length > 0 && (
            <>
              <Text style={styles.sideTitle}>Intérêts</Text>
              <View style={styles.sideDivider} />
              <Text style={styles.sideText}>{interests.join(" · ")}</Text>
            </>
          )}
        </View>

        {/* Main */}
        <View style={styles.main}>
          <View style={styles.accentLine} />

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
                <View key={exp.id} style={styles.dotRow}>
                  <View style={styles.dot} />
                  <View style={styles.dotContent}>
                    <View style={styles.entryRow}>
                      <Text style={styles.bold}>{exp.position}</Text>
                      <Text style={styles.sub}>{exp.startDate} – {exp.current ? "Présent" : exp.endDate}</Text>
                    </View>
                    <Text style={styles.sub}>{exp.company}{exp.city ? ` · ${exp.city}` : ""}</Text>
                    {exp.description && <Text style={styles.description}>{exp.description}</Text>}
                  </View>
                </View>
              ))}
            </View>
          )}

          {education.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Formation</Text>
              {education.map((edu) => (
                <View key={edu.id} style={styles.dotRow}>
                  <View style={styles.dot} />
                  <View style={styles.dotContent}>
                    <View style={styles.entryRow}>
                      <Text style={styles.bold}>{edu.degree}</Text>
                      <Text style={styles.sub}>{edu.year}</Text>
                    </View>
                    <Text style={styles.sub}>{edu.school}{edu.city ? ` · ${edu.city}` : ""}</Text>
                    {edu.description && <Text style={styles.description}>{edu.description}</Text>}
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
}
