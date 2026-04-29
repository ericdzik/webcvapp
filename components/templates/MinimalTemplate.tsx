"use client";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import { ResumeData } from "@/types/resume";
import { getContentScore, getFontSize, getSpacing } from "@/lib/pdfUtils";

export default function MinimalTemplate({ data }: { data: ResumeData }) {
  const { personalInfo: p, summary, experiences, education, skills, languages, interests } = data;
  const score = getContentScore(data);
  const f = (b: number) => getFontSize(b, score);
  const s = (b: number) => getSpacing(b, score);

  const styles = StyleSheet.create({
    page: { padding: 48, fontFamily: "Helvetica", fontSize: f(11), color: "#333" },
    headerRow: { flexDirection: "row", alignItems: "flex-start", gap: 16, marginBottom: s(22) },
    headerText: { flex: 1 },
    photo: { width: 72, height: 72, borderRadius: 36, objectFit: "cover" },
    name: { fontSize: f(28), fontFamily: "Helvetica-Bold", letterSpacing: 2, marginBottom: 3 },
    title: { fontSize: f(12), color: "#888", letterSpacing: 1, marginBottom: s(7) },
    contact: { flexDirection: "row", gap: 16, fontSize: f(10), color: "#aaa" },
    divider: { borderBottom: "1px solid #eee", marginBottom: s(18) },
    section: { marginBottom: s(22) },
    sectionTitle: { fontSize: f(10), fontFamily: "Helvetica-Bold", color: "#aaa", textTransform: "uppercase", letterSpacing: 2, marginBottom: s(12) },
    row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 1 },
    bold: { fontFamily: "Helvetica-Bold", fontSize: f(11) },
    gray: { color: "#999", fontSize: f(10) },
    description: { marginTop: 3, color: "#555", lineHeight: 1.5, fontSize: f(10) },
    entryWrap: { marginBottom: s(10) },
    tags: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
    tag: { borderWidth: 1, borderColor: "#ddd", paddingHorizontal: 7, paddingVertical: 3, borderRadius: 2, fontSize: f(10), color: "#555" },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerRow}>
          {p.photo ? <Image src={p.photo} style={styles.photo} /> : null}
          <View style={styles.headerText}>
            <Text style={styles.name}>{p.firstName} {p.lastName}</Text>
            <Text style={styles.title}>{p.title}</Text>
            <View style={styles.contact}>
              {p.email && <Text>{p.email}</Text>}
              {p.phone && <Text>{p.phone}</Text>}
              {p.city && <Text>{p.city}{p.country ? `, ${p.country}` : ""}</Text>}
              {p.linkedin && <Text>{p.linkedin}</Text>}
            </View>
          </View>
        </View>
        <View style={styles.divider} />

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
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Formation</Text>
            {education.map((edu) => (
              <View key={edu.id} style={styles.entryWrap}>
                <View style={styles.row}>
                  <Text style={styles.bold}>{edu.degree}</Text>
                  <Text style={styles.gray}>{edu.year}</Text>
                </View>
                <Text style={styles.gray}>{edu.school}{edu.city ? ` · ${edu.city}` : ""}</Text>
              </View>
            ))}
          </View>
        )}
        {skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Compétences</Text>
            <View style={styles.tags}>
              {skills.map((sk) => <Text key={sk.id} style={styles.tag}>{sk.name}</Text>)}
            </View>
          </View>
        )}
        {languages.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Langues</Text>
            <View style={styles.tags}>
              {languages.map((l) => <Text key={l.id} style={styles.tag}>{l.name} {l.level}</Text>)}
            </View>
          </View>
        )}
        {interests.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Intérêts</Text>
            <Text style={styles.description}>{interests.join(" · ")}</Text>
          </View>
        )}
      </Page>
    </Document>
  );
}
