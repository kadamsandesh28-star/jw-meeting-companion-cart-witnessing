export interface MarkdownStudyExport {
  title: string;
  type: string;
  createdAt: string;
  updatedAt: string;

  objective: string;
  questions: string;
  research: string;
  application: string;
  prayer: string;
  notes: string;
}

export function exportStudyToMarkdown(
  study: MarkdownStudyExport
) {
  const markdown = `# ${study.title}

**Type:** ${study.type}

**Created:** ${study.createdAt}

**Updated:** ${study.updatedAt}

---

## 🎯 Objective

${study.objective}

---

## ❓ Questions

${study.questions}

---

## 📚 Research

${study.research}

---

## 💡 Application

${study.application}

---

## 🙏 Prayer

${study.prayer}

---

## 📝 Notes

${study.notes}
`;

  const blob = new Blob([markdown], {
    type: "text/markdown;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = `${study.title}.md`;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}