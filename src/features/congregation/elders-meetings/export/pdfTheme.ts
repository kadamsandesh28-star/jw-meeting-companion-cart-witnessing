import { StyleDictionary } from "pdfmake/interfaces";

export const pdfStyles: StyleDictionary = {
  title: {
    fontSize: 22,
    bold: true,
    margin: [0, 0, 0, 6],
  },

  subtitle: {
    fontSize: 11,
    color: "#666666",
    margin: [0, 0, 0, 18],
  },

  sectionHeader: {
    fontSize: 15,
    bold: true,
    margin: [0, 18, 0, 8],
    color: "#0D47A1",
  },

  label: {
    bold: true,
  },

  normal: {
    fontSize: 10,
  },

  tableHeader: {
    bold: true,
    fillColor: "#E3F2FD",
    fontSize: 10,
  },

  footer: {
    fontSize: 8,
    italics: true,
    color: "#888888",
    alignment: "center",
  },
};

export const pdfPageMargins: [number, number, number, number] = [
  40,
  60,
  40,
  60,
];