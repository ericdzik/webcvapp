"use client";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import { ResumeData } from "@/types/resume";
import { getContentScore, getFontSize, getSpacing } from "@/lib/pdfUtils";

const ACCENT = "#e63946";
const LIGHT = "#fff5f5";

export default function CreativeTemplate({ data }: { data: ResumeData }) {
  const { personalInfo: p, summary, experiences, education, skills, languages, interests } = data;
  const score = getContentScore(data);
  const f = (b: number) => getFontSize(b, score);
  const s = (b: number) => getSpacing(b, score);
  const initials = `${p.firstName?.[0] ?? ""}${p.lastName?.[0] ?? ""}`.toUpperCase();

  const levelToPercent = { débutant: "33%", intermédiaire: "66%", expert: "100%" };

  const styles = StyleSheet.create({
    page: { flexDirection: "row", fontFamily: "Helvetica", fontSize: f(11), color: "#2d2d2d" },
    sidebar: { width: "32%", backgroundColor: LIGHT, padding: 24, borderRight: `3px solid ${ACCENT}` },
    main: { width: "68%", padding: 24 },
    avatarBox: { width: 68, height: 68, borderRadius: 34, backgroundColor: ACCENT, alignItems: "center", justifyContent: "center", marginBottom: s(12), overflow: "hidden" },
    avatarImg: { width: 68, height: 68, borderRadius: 34, objectFit: "cover" },
    sideTitle: { fontSize: f(9), fontFamily: "Helvetica-Bold", color: ACCENT, textTransform: "uppercase", letterSpacing: 2, marginBottom: s(6), marginTop: s(14) },
    sideDivider: { height: 1, backgroundColor: ACCENT, marginBottom: s(8), opacity: 0.3 },
    sideText: { fontSize: f(10), color: "#555", marginBottom: s(3), lineHeight: 1.4 },
    skillBar: { marginBottom: s(5) },
    skillName: { fontSize: f(10), color: "#333", marginBottom: 2 },
    barBg: { height: 3, backgroundColor: "#f0c0c3", borderRadius: 2 },
    barFill: { height: 3, backgroundColor: ACCENT, borderRadius: 2 },
    langRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: s(3) },
    langLevel: { fontSize: f(9), color: ACCENT, fontFamily: "Helvetica-Bold" },
    accentLine: { height: 3, width: 40, backgroundColor: ACCENT, marginBottom: s(16) },
    sectionTitle: { fontSize: f(11), fontFamily: "Helvetica-Bold", color: ACCENT, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: s(8) },
    entryRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 1 },
    bold: { fontFamily: "Helvetica-Bold", fontSize: f(11) },
    sub: { fontSize: f(10), color: "#888", marginBottom: 2 },
    description: { fontSize: f(10), color: "#555", lineHeight: 1.5, marginTop: 2 },
    section: { marginBottom: s(20) },
    dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: ACCENT, marginRight: 6, marginTop: 2 },
    dotRow: { flexDirection: "row", alignItems: "flex-start", marginBottom: s(10) },
    dotContent: { flex: 1 },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.sidebar}>
          <View style={styles.avatarBox}>
            {p.photo
              ? <Image src={p.photo} style={styles.avatarImg} />
              : <Text style={{ color: "#fff", fontSize: f(22), fontFamily: "Helvetica-Bold" }}>{initials}</Text>
            }
          </View>
          <Text style={{ fontSize: f(16), fontFamily: "Helvetica-Bold", color: "#1a1a1a" }}>{p.firstName}</Text>
          <Text style={{ fontSize: f(16), fontFamily: "Helvetica-Bold", color: "#1a1a1a" }}>{p.lastName}</Text>
          <Text style={{ fontSize: f(9), color: ACCENT, fontFamily: "Helvetica-Bold", marginTop: 2, marginBottom: s(12) }}>{p.title}</Text>

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
              {skills.map((sk) => (
                <View key={sk.id} style={styles.skillBar}>
                  <Text style={styles.skillName}>{sk.name}</Text>
                  <View style={styles.barBg}>
                    <View style={[styles.barFill, { width: levelToPercent[sk.level] }]} />
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
