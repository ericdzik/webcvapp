"use client";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import { ResumeData } from "@/types/resume";
import { getContentScore, getFontSize, getSpacing } from "@/lib/pdfUtils";

const ACCENT = "#2563eb";

export default function ModernTemplate({ data }: { data: ResumeData }) {
  const { personalInfo: p, summary, experiences, education, skills, languages, interests } = data;
  const score = getContentScore(data);
  const f = (b: number) => getFontSize(b, score);
  const s = (b: number) => getSpacing(b, score);

  const levelToPercent = { débutant: "33%", intermédiaire: "66%", expert: "100%" };

  const styles = StyleSheet.create({
    page: { flexDirection: "row", fontFamily: "Helvetica", fontSize: f(10), color: "#222" },
    sidebar: { width: "34%", backgroundColor: "#1e3a5f", color: "#fff", padding: 24 },
    main: { width: "66%", padding: 24 },
    photo: { width: 64, height: 64, borderRadius: 32, objectFit: "cover", marginBottom: s(10) },
    name: { fontSize: f(18), fontFamily: "Helvetica-Bold", color: "#fff", marginBottom: 2 },
    title: { fontSize: f(10), color: "#93c5fd", marginBottom: s(16) },
    sideSection: { marginBottom: s(14) },
    sideSectionTitle: { fontSize: f(9), fontFamily: "Helvetica-Bold", color: "#93c5fd", textTransform: "uppercase", letterSpacing: 1, borderBottom: "1px solid #3b5998", paddingBottom: 3, marginBottom: s(6) },
    sideText: { color: "#dbeafe", fontSize: f(9), marginBottom: s(3) },
    mainSection: { marginBottom: s(14) },
    mainSectionTitle: { fontSize: f(11), fontFamily: "Helvetica-Bold", color: ACCENT, borderBottom: `1px solid ${ACCENT}`, paddingBottom: 2, marginBottom: s(6), textTransform: "uppercase", letterSpacing: 1 },
    row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 1 },
    bold: { fontFamily: "Helvetica-Bold", fontSize: f(10) },
    gray: { color: "#666", fontSize: f(9) },
    description: { marginTop: 2, color: "#444", lineHeight: 1.4, fontSize: f(9) },
    entryWrap: { marginBottom: s(8) },
    skillBar: { flexDirection: "row", alignItems: "center", marginBottom: s(4) },
    skillName: { color: "#dbeafe", fontSize: f(9), width: 80 },
    barBg: { flex: 1, height: 4, backgroundColor: "#3b5998", borderRadius: 2 },
    barFill: { height: 4, backgroundColor: "#93c5fd", borderRadius: 2 },
  });

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
              {skills.map((sk) => (
                <View key={sk.id} style={styles.skillBar}>
                  <Text style={styles.skillName}>{sk.name}</Text>
                  <View style={styles.barBg}>
                    <View style={[styles.barFill, { width: levelToPercent[sk.level] }]} />
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
                <View key={exp.id} style={styles.entryWrap}>
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
                <View key={edu.id} style={styles.entryWrap}>
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
