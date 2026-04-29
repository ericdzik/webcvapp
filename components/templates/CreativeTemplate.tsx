"use client";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import { ResumeData } from "@/types/resume";
import { getFontScale, fs } from "@/lib/pdfUtils";

const ACCENT = "#e63946";
const LIGHT = "#fff5f5";

export default function CreativeTemplate({ data }: { data: ResumeData }) {
  const { personalInfo: p, summary, experiences, education, skills, languages, interests } = data;
  const sc = getFontScale(data);
  const initials = `${p.firstName?.[0] ?? ""}${p.lastName?.[0] ?? ""}`.toUpperCase();

  const styles = StyleSheet.create({
    page: { flexDirection: "row", fontFamily: "Helvetica", fontSize: fs(10, sc), color: "#2d2d2d", minHeight: "100%" },
    sidebar: { width: "32%", backgroundColor: LIGHT, padding: fs(24, sc), borderRight: `3px solid ${ACCENT}`, display: "flex", flexDirection: "column" },
    main: { width: "68%", padding: fs(24, sc), display: "flex", flexDirection: "column" },
    avatarBox: { width: fs(60, sc), height: fs(60, sc), borderRadius: fs(30, sc), backgroundColor: ACCENT, alignItems: "center", justifyContent: "center", marginBottom: fs(10, sc), overflow: "hidden" },
    avatarImg: { width: fs(60, sc), height: fs(60, sc), borderRadius: fs(30, sc), objectFit: "cover" },
    sideTitle: { fontSize: fs(7.5, sc), fontFamily: "Helvetica-Bold", color: ACCENT, textTransform: "uppercase", letterSpacing: 2, marginBottom: fs(5, sc), marginTop: fs(12, sc) },
    sideDivider: { height: 1, backgroundColor: ACCENT, marginBottom: fs(6, sc), opacity: 0.3 },
    sideText: { fontSize: fs(8.5, sc), color: "#555", marginBottom: 3, lineHeight: 1.4 },
    skillBar: { marginBottom: fs(4, sc) },
    skillName: { fontSize: fs(8.5, sc), color: "#333", marginBottom: 2 },
    barBg: { height: 3, backgroundColor: "#f0c0c3", borderRadius: 2 },
    barFill: { height: 3, backgroundColor: ACCENT, borderRadius: 2 },
    langRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 3 },
    langLevel: { fontSize: fs(7.5, sc), color: ACCENT, fontFamily: "Helvetica-Bold" },
    accentLine: { height: 3, width: 36, backgroundColor: ACCENT, marginBottom: fs(14, sc) },
    sectionTitle: { fontSize: fs(9.5, sc), fontFamily: "Helvetica-Bold", color: ACCENT, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: fs(7, sc) },
    entryRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 1 },
    bold: { fontFamily: "Helvetica-Bold", fontSize: fs(10, sc) },
    sub: { fontSize: fs(8.5, sc), color: "#888", marginBottom: 2 },
    description: { fontSize: fs(9, sc), color: "#555", lineHeight: 1.5, marginTop: 2 },
    section: { marginBottom: fs(13, sc) },
    dot: { width: fs(5, sc), height: fs(5, sc), borderRadius: fs(2.5, sc), backgroundColor: ACCENT, marginRight: fs(5, sc), marginTop: 2 },
    dotRow: { flexDirection: "row", alignItems: "flex-start", marginBottom: fs(7, sc) },
    dotContent: { flex: 1 },
  });

  const levelToPercent = { débutant: "33%", intermédiaire: "66%", expert: "100%" };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.sidebar}>
          <View style={styles.avatarBox}>
            {p.photo
              ? <Image src={p.photo} style={styles.avatarImg} />
              : <Text style={{ color: "#fff", fontSize: fs(20, sc), fontFamily: "Helvetica-Bold" }}>{initials}</Text>
            }
          </View>
          <Text style={{ fontSize: fs(15, sc), fontFamily: "Helvetica-Bold", color: "#1a1a1a" }}>{p.firstName}</Text>
          <Text style={{ fontSize: fs(15, sc), fontFamily: "Helvetica-Bold", color: "#1a1a1a" }}>{p.lastName}</Text>
          <Text style={{ fontSize: fs(8.5, sc), color: ACCENT, fontFamily: "Helvetica-Bold", marginTop: 2, marginBottom: fs(10, sc) }}>{p.title}</Text>

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
