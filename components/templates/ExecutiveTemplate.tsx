"use client";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import { ResumeData } from "@/types/resume";
import { getFontScale, fs } from "@/lib/pdfUtils";

export default function ExecutiveTemplate({ data }: { data: ResumeData }) {
  const { personalInfo: p, summary, experiences, education, skills, languages, interests } = data;
  const sc = getFontScale(data);

  const styles = StyleSheet.create({
    page: { fontFamily: "Helvetica", fontSize: fs(10, sc), color: "#1a1a2e", display: "flex", flexDirection: "column", minHeight: "100%" },
    header: { backgroundColor: "#1a1a2e", padding: `${fs(24, sc)} ${fs(36, sc)}`, color: "#fff", flexDirection: "row", gap: fs(18, sc), alignItems: "flex-start" },
    headerText: { flex: 1 },
    photo: { width: fs(68, sc), height: fs(68, sc), borderRadius: fs(34, sc), objectFit: "cover", borderWidth: 2, borderColor: "#c9a84c" },
    name: { fontSize: fs(24, sc), fontFamily: "Helvetica-Bold", letterSpacing: 2, color: "#fff", marginBottom: 3 },
    title: { fontSize: fs(11, sc), color: "#a8b4c8", letterSpacing: 1, marginBottom: fs(10, sc) },
    contactRow: { flexDirection: "row", gap: fs(12, sc), flexWrap: "wrap" },
    contactItem: { fontSize: fs(8.5, sc), color: "#c8d4e8" },
    dividerGold: { height: 2, backgroundColor: "#c9a84c", width: 50, marginTop: fs(10, sc) },
    body: { padding: `${fs(18, sc)} ${fs(36, sc)}`, flex: 1 },
    section: { marginBottom: fs(13, sc) },
    sectionHeader: { flexDirection: "row", alignItems: "center", marginBottom: fs(6, sc) },
    sectionTitle: { fontSize: fs(9.5, sc), fontFamily: "Helvetica-Bold", color: "#1a1a2e", textTransform: "uppercase", letterSpacing: 2 },
    sectionLine: { flex: 1, height: 1, backgroundColor: "#c9a84c", marginLeft: 8 },
    entryRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 1 },
    bold: { fontFamily: "Helvetica-Bold", fontSize: fs(10, sc) },
    company: { fontSize: fs(8.5, sc), color: "#c9a84c", fontFamily: "Helvetica-Bold", marginBottom: 2 },
    date: { fontSize: fs(8.5, sc), color: "#888", fontFamily: "Helvetica-Oblique" },
    description: { fontSize: fs(9, sc), color: "#444", lineHeight: 1.4, marginTop: 2 },
    twoCol: { flexDirection: "row", gap: fs(20, sc) },
    col: { flex: 1 },
    skillTag: { backgroundColor: "#f0ece0", borderLeft: "3px solid #c9a84c", paddingHorizontal: fs(5, sc), paddingVertical: 2, marginBottom: fs(3, sc), fontSize: fs(8.5, sc) },
    skillRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    skillLevel: { fontSize: fs(7.5, sc), color: "#c9a84c", fontFamily: "Helvetica-Bold" },
    langRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: fs(3, sc), fontSize: fs(8.5, sc) },
    langLevel: { color: "#c9a84c", fontFamily: "Helvetica-Bold", fontSize: fs(8.5, sc) },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          {p.photo ? <Image src={p.photo} style={styles.photo} /> : null}
          <View style={styles.headerText}>
            <Text style={styles.name}>{p.firstName} {p.lastName}</Text>
            <Text style={styles.title}>{p.title}</Text>
            <View style={styles.contactRow}>
              {p.email && <Text style={styles.contactItem}>{p.email}</Text>}
              {p.phone && <Text style={styles.contactItem}>{p.phone}</Text>}
              {p.city && <Text style={styles.contactItem}>{p.city}{p.country ? `, ${p.country}` : ""}</Text>}
              {p.linkedin && <Text style={styles.contactItem}>{p.linkedin}</Text>}
              {p.website && <Text style={styles.contactItem}>{p.website}</Text>}
            </View>
            <View style={styles.dividerGold} />
          </View>
        </View>

        <View style={styles.body}>
          {summary.text && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Profil</Text><View style={styles.sectionLine} /></View>
              <Text style={styles.description}>{summary.text}</Text>
            </View>
          )}

          {experiences.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Expériences</Text><View style={styles.sectionLine} /></View>
              {experiences.map((exp) => (
                <View key={exp.id} style={{ marginBottom: fs(8, sc) }}>
                  <View style={styles.entryRow}>
                    <Text style={styles.bold}>{exp.position}</Text>
                    <Text style={styles.date}>{exp.startDate} – {exp.current ? "Présent" : exp.endDate}</Text>
                  </View>
                  <Text style={styles.company}>{exp.company}{exp.city ? ` · ${exp.city}` : ""}</Text>
                  {exp.description && <Text style={styles.description}>{exp.description}</Text>}
                </View>
              ))}
            </View>
          )}

          <View style={styles.twoCol}>
            <View style={styles.col}>
              {education.length > 0 && (
                <View style={styles.section}>
                  <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Formation</Text><View style={styles.sectionLine} /></View>
                  {education.map((edu) => (
                    <View key={edu.id} style={{ marginBottom: fs(6, sc) }}>
                      <View style={styles.entryRow}>
                        <Text style={styles.bold}>{edu.degree}</Text>
                        <Text style={styles.date}>{edu.year}</Text>
                      </View>
                      <Text style={styles.company}>{edu.school}{edu.city ? ` · ${edu.city}` : ""}</Text>
                    </View>
                  ))}
                </View>
              )}
              {languages.length > 0 && (
                <View style={styles.section}>
                  <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Langues</Text><View style={styles.sectionLine} /></View>
                  {languages.map((l) => (
                    <View key={l.id} style={styles.langRow}>
                      <Text>{l.name}</Text><Text style={styles.langLevel}>{l.level}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
            <View style={styles.col}>
              {skills.length > 0 && (
                <View style={styles.section}>
                  <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Compétences</Text><View style={styles.sectionLine} /></View>
                  {skills.map((s) => (
                    <View key={s.id} style={styles.skillTag}>
                      <View style={styles.skillRow}>
                        <Text>{s.name}</Text><Text style={styles.skillLevel}>{s.level}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              )}
              {interests.length > 0 && (
                <View style={styles.section}>
                  <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Intérêts</Text><View style={styles.sectionLine} /></View>
                  <Text style={styles.description}>{interests.join(" · ")}</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
