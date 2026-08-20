export interface StarSection {
  label: "Problem" | "Action" | "Result";
  subhead: string;
  body: string;
}

export const SLIDES_PLACEHOLDER =
  "- Figma deck embed\n- Visitor should be able to flip through Figma slide presentation here.";
export const REFLECTIONS_PLACEHOLDER = "*(optional — add later)*";

export function extractSection(markdownBody: string, heading: string): string {
  const pattern = new RegExp(`## ${heading}\\n([\\s\\S]*?)(?=\\n## |$)`);
  const match = markdownBody.match(pattern);
  return match ? match[1].trim() : "";
}

export function parseStarSections(markdownBody: string): StarSection[] {
  const summary = extractSection(markdownBody, "Project Summary");
  const pattern = /\*\*(Problem|Action|Result) — (.+?)\*\*\n([\s\S]*?)(?=\n\*\*(?:Problem|Action|Result) —|$)/g;
  return [...summary.matchAll(pattern)].map(([, label, subhead, body]) => ({
    label: label as StarSection["label"],
    subhead: subhead.trim(),
    body: body.trim(),
  }));
}

// Slides/Reflections are optional per the case study outline; both files
// currently ship with the same draft placeholder text until real content
// (a Figma embed link, actual reflections) is written, so treat that
// placeholder as "no content yet" rather than rendering it as real copy.
export function hasRealContent(section: string, placeholder: string): boolean {
  return section.length > 0 && section !== placeholder;
}
