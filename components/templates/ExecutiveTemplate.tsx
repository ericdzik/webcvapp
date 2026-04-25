"use client";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { ResumeData } from "@/types/resume";

const styles = StyleSheet.create({
  page: { fontFamily: "Helvetica", fontSize: 10, color: "#1a1a2e" },
  header: { backgroundColor: "#1a1a2e", padding: "28 40 24 40", color: "#fff" },
  name: { fontSize: 28, fontFamily: "Helvetica-Bold", letterSpacing: 2, color: "#fff", marginBottom: 4 },
  title: { fontSize: 12, color: "#a8b4c8", letterSpacing: 1, marginBottom: 12 },
  contactRow: { flexDirection: "row", gap: 16, flexWrap: "wrap" },
  contactItem: { fontSize: 9, color: "#c8d4e8" },
  dividerGold: { height: 2, backgroundColor: "#c9a84c", width: 60, marginTop: 12 },
  body: { padding: "20 40" },
  section: { marginBottom: 16 },
  sectionHeader: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  sectionTitle: { fontSize: 10, fontFamily: "Helvetica-Bold", color: "#1a1a2e", textTransform: "uppercase", letterSpacing: 2 },
  sectionLine: { flex: 1, height: 1, backgroundColor: "#c9a84c", marginLeft: 8 },
  entryRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 1 },
  bold: { fontFamily: "Helvetica-Bold", fontSize: 10 },
  company: { fontSize: 9, color: "#c9a84c", fontFamily: "Helvetica-Bold", marginBottom: 2 },
  date: { fontSize: 9, color: "#888", fontFamily: "Helvetica-Oblique" },
  description: { fontSize: 9, color: "#444", lineHeight: 1.5, marginTop: 2 },
  twoCol: { flexDirection: "row", gap: 24 },
  col: { flex: 1 },
  skillTag: { backgroundColor: "#f0ece0", borderLeft: "3px solid #c9a84c", paddingHorizontal: 6, paddingVertical: 3, marginBottom: 4, fontSize: 9 },
  skillRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  skillLevel: { fontSize: 8, color: "#c9a84c", fontFamily: "Helvetica-Bold" },
  langRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4, fontSize: 9 },
  langLevel: { color: "#c9a84c", fontFamily: "Helvetica-Bold", fontSize: 9 },
});

export default function ExecutiveTemplate({ data }: { data: ResumeData }) {
  const { personalInfo: p, summary, experiences, education, skills, languages, interests } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
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

        <View style={styles.body}>
          {/* Summary */}
          {summary.text && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Profil</Text>
                <View style={styles.sectionLine} />
              </View>
              <Text style={styles.description}>{summary.text}</Text>
            </View>
          )}

          {/* Experience */}
          {experiences.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Expériences</Text>
                <View style={styles.sectionLine} />
              </View>
              {experiences.map((exp) => (
                <View key={exp.id} style={{ marginBottom: 10 }}>
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

          {/* Two columns: Education + Skills / Languages */}
          <View style={styles.twoCol}>
            <View style={styles.col}>
              {education.length > 0 && (
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Formation</Text>
                    <View style={styles.sectionLine} />
                  </View>
                  {education.map((edu) => (
                    <View key={edu.id} style={{ marginBottom: 8 }}>
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
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Langues</Text>
                    <View style={styles.sectionLine} />
                  </View>
                  {languages.map((l) => (
                    <View key={l.id} style={styles.langRow}>
                      <Text>{l.name}</Text>
                      <Text style={styles.langLevel}>{l.level}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>

            <View style={styles.col}>
              {skills.length > 0 && (
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Compétences</Text>
                    <View style={styles.sectionLine} />
                  </View>
                  {skills.map((s) => (
                    <View key={s.id} style={styles.skillTag}>
                      <View style={styles.skillRow}>
                        <Text>{s.name}</Text>
                        <Text style={styles.skillLevel}>{s.level}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              )}

              {interests.length > 0 && (
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Intérêts</Text>
                    <View style={styles.sectionLine} />
                  </View>
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
