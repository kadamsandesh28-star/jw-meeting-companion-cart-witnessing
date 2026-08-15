import { Content } from "pdfmake/interfaces";

/**
 * Creates the document header.
 */
export function createPdfHeader(
  title: string,
  subtitle?: string
): Content[] {
  const header: Content[] = [
    {
      text: title,
      style: "coverTitle",
    },
  ];

  if (subtitle) {
    header.push({
      text: subtitle,
      style: "coverSubtitle",
    });
  }

  header.push({
    text: "Faith • Family • Spiritual Growth",
    alignment: "center",
    italics: true,
    margin: [0, 0, 0, 20],
    fontSize: 11,
  });

  return header;
}