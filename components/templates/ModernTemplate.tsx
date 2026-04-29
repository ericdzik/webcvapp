"use client";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import { ResumeData } from "@/types/resume";
import { getFontScale, fs } from "@/lib/pdfUtils";

const ACCENT = "#2563eb";

export default function ModernTemplate({ data }: { data: ResumeData }) {
  const { personalInfo: p, summary, experiences, education, skills, languages, interests } = data;
  const sc = getFontScale(data);

  const styles = StyleSheet.create({
    page: { flexDirection: "row", fontFamily: "Helvetica", fontSize: fs(10, sc), color: "#222", minHeight: "100%" },
    sidebar: { width: "34%", backgroundColor: "#1e3a5f", color: "#fff", padding: fs(22, sc), display: "flex", flexDirection: "column" },
    main: { width: "66%", padding: fs(22, sc), display: "flex", flexDirection: "column" },
    photo: { width: fs(60, sc), height: fs(60, sc), borderRadius: fs(30, sc), objectFit: "cover", marginBottom: fs(8, sc) },
    name: { fontSize: fs(17, sc), fontFamily: "Helvetica-Bold", color: "#fff", marginBottom: 2 },
    title: { fontSize: fs(9, sc), color: "#93c5fd", marginBottom: fs(14, sc) },
    sideSection: { marginBottom: fs(12, sc) },
    sideSectionTitle: { fontSize: fs(8, sc), fontFamily: "Helvetica-Bold", color: "#93c5fd", textTransform: "uppercase", letterSpacing: 1, borderBottom: "1px solid #3b5998", paddingBottom: 3, marginBottom: fs(5, sc) },
    sideText: { color: "#dbeafe", fontSize: fs(8.5, sc), marginBottom: 3 },
    mainSection: { marginBottom: fs(12, sc) },
    mainSectionTitle: { fontSize: fs(10, sc), fontFamily: "Helvetica-Bold", color: ACCENT, borderBottom: `1px solid ${ACCENT}`, paddingBottom: 2, marginBottom: fs(5, sc), textTransform: "uppercase", letterSpacing: 1 },
    row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 1 },
    bold: { fontFamily: "Helvetica-Bold", fontSize: fs(10, sc) },
    gray: { color: "#666", fontSize: fs(8.5, sc) },
    description: { marginTop: 2, color: "#444", lineHeight: 1.4, fontSize: fs(9, sc) },
    skillBar: { flexDirection: "row", alignItems: "center", marginBottom: fs(4, sc) },
    skillName: { color: "#dbeafe", fontSize: fs(8.5, sc), width: fs(78, sc) },
    barBg: { flex: 1, height: 3, backgroundColor: "#3b5998", borderRadius: 2 },
    barFill: { height: 3, backgroundColor: "#93c5fd", borderRadius: 2 },
  });

  const levelToPercent = { débutant: "33%", intermédiaire: "66%", expert: "100%" };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.sidebar}>
          {p.photo ? <Image src={p.photo} style={styles.photo} /> : null}
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
            <View style={styles.mainSection}>
              <Text style={styles.mainSectionTitle}>Formation</Text>
              {education.map((edu) => (
                <View key={edu.id} style={{ marginBottom: fs(5, sc) }}>
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
