"use client";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import { ResumeData } from "@/types/resume";
import { getContentScore, getFontSize, getSpacing } from "@/lib/pdfUtils";

export default function ExecutiveTemplate({ data }: { data: ResumeData }) {
  const { personalInfo: p, summary, experiences, education, skills, languages, interests } = data;
  const score = getContentScore(data);
  const f = (b: number) => getFontSize(b, score);
  const s = (b: number) => getSpacing(b, score);

  const styles = StyleSheet.create({
    page: { fontFamily: "Helvetica", fontSize: f(11), color: "#1a1a2e" },
    header: { backgroundColor: "#1a1a2e", padding: "30 40 26 40", color: "#fff", flexDirection: "row", gap: 20, alignItems: "flex-start" },
    headerText: { flex: 1 },
    photo: { width: 76, height: 76, borderRadius: 38, objectFit: "cover", borderWidth: 2, borderColor: "#c9a84c" },
    name: { fontSize: f(26), fontFamily: "Helvetica-Bold", letterSpacing: 2, color: "#fff", marginBottom: 3 },
    title: { fontSize: f(12), color: "#a8b4c8", letterSpacing: 1, marginBottom: s(12) },
    contactRow: { flexDirection: "row", gap: 12, flexWrap: "wrap" },
    contactItem: { fontSize: f(10), color: "#c8d4e8" },
    dividerGold: { height: 2, backgroundColor: "#c9a84c", width: 60, marginTop: s(12) },
    body: { padding: "22 40" },
    section: { marginBottom: s(20) },
    sectionHeader: { flexDirection: "row", alignItems: "center", marginBottom: s(10) },
    sectionTitle: { fontSize: f(11), fontFamily: "Helvetica-Bold", color: "#1a1a2e", textTransform: "uppercase", letterSpacing: 2 },
    sectionLine: { flex: 1, height: 1, backgroundColor: "#c9a84c", marginLeft: 8 },
    entryRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
    bold: { fontFamily: "Helvetica-Bold", fontSize: f(11) },
    company: { fontSize: f(10), color: "#c9a84c", fontFamily: "Helvetica-Bold", marginBottom: 4 },
    date: { fontSize: f(10), color: "#888", fontFamily: "Helvetica-Oblique" },
    description: { fontSize: f(10), color: "#444", lineHeight: 1.6, marginTop: 5 },
    entryWrap: { marginBottom: s(14) },
    twoCol: { flexDirection: "row", gap: 24 },
    col: { flex: 1 },
    skillTag: { backgroundColor: "#f0ece0", borderLeft: "3px solid #c9a84c", paddingHorizontal: 6, paddingVertical: s(3), marginBottom: s(5), fontSize: f(10) },
    skillRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    skillLevel: { fontSize: f(9), color: "#c9a84c", fontFamily: "Helvetica-Bold" },
    langRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: s(5), fontSize: f(10) },
    langLevel: { color: "#c9a84c", fontFamily: "Helvetica-Bold", fontSize: f(10) },
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
                <View key={exp.id} style={styles.entryWrap}>
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
                    <View key={edu.id} style={styles.entryWrap}>
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
                    <View key={l.id} style={styles.langRow}><Text>{l.name}</Text><Text style={styles.langLevel}>{l.level}</Text></View>
                  ))}
                </View>
              )}
            </View>
            <View style={styles.col}>
              {skills.length > 0 && (
                <View style={styles.section}>
                  <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Compétences</Text><View style={styles.sectionLine} /></View>
                  {skills.map((sk) => (
                    <View key={sk.id} style={styles.skillTag}>
                      <View style={styles.skillRow}><Text>{sk.name}</Text><Text style={styles.skillLevel}>{sk.level}</Text></View>
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
