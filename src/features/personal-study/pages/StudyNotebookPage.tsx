import { useEffect, useState } from "react";

import {
  Alert,
  Box,
  CircularProgress,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import ExportDialog from "../components/ExportDialog";
import NotebookHeader from "../components/NotebookHeader";
import NotebookSections from "../components/NotebookSections";
import { Study } from "../models/Study";
import { StudyNotebook } from "../models/StudyNotebook";
import {
  getNotebook,
  saveNotebook,
} from "../services/notebookService";
import { studyService } from "../services/studyService";

import { exportToMarkdown } from "../../shared/export/markdownExporter";
import { exportToPdf } from "../../shared/export/pdfExporter";
import { sharePdf } from "../../shared/export/shareService";
import { exportToText } from "../../shared/export/textExporter";
import { exportToWord } from "../../shared/export/wordExporter";
export default function StudyNotebookPage() {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const [study, setStudy] = useState<Study | null>(null);

  const [notebook, setNotebook] =
    useState<StudyNotebook | null>(null);

  const [exportOpen, setExportOpen] =
    useState(false);

  useEffect(() => {
    if (!id) return;

    const studies = studyService.getAll();

    const found = studies.find(
      (s: Study) => s.id === id
    );

    if (!found) return;

    setStudy(found);
    setNotebook(getNotebook(found.id));
  }, [id]);

  const handleNotebookChange = (
    updated: StudyNotebook
  ) => {
    setNotebook(updated);
    saveNotebook(updated);
  };
function createExportDocument() {
  if (!study || !notebook) {
    throw new Error("Study or notebook not loaded");
  }

  return {
    title: study.title,
    subtitle: study.type,
    createdAt: notebook.createdAt,
    updatedAt: notebook.updatedAt,
    sections: [
      {
        title: "Objective",
        content: notebook.objective,
      },
      {
        title: "Questions",
        content: notebook.questions,
      },
      {
        title: "Research",
        content: notebook.research,
      },
      {
        title: "Application",
        content: notebook.application,
      },
      {
        title: "Prayer",
        content: notebook.prayer,
      },
      {
        title: "Notes",
        content: notebook.notes,
      },
    ],
  };
}

  async function createPdf() {
  return exportToPdf(
    createExportDocument()
  );
}

  async function handleExportPdf() {
    const pdf = await createPdf();

    if (!pdf || !study) return;

    await sharePdf(pdf, `${study.title}.pdf`);
  }

  async function handleSharePdf() {
    await handleExportPdf();
  }

 async function handleExportWord() {
  exportToWord(
    createExportDocument()
  );
}

  function handleMarkdown() {
  exportToMarkdown(
    createExportDocument()
  );
}

  function handleExportText() {
  exportToText(
    createExportDocument()
  );
}

  function handlePrint() {
    window.print();
  }

  if (!study || !notebook) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        py={8}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <NotebookHeader
        study={study}
        onBack={() =>
          navigate("/personal/personal-study")
        }
        onExport={() =>
          setExportOpen(true)
        }
      />

      <Alert
        severity="info"
        sx={{ mb: 3 }}
      >
        Changes are saved automatically.
      </Alert>

      <NotebookSections
        notebook={notebook}
        onChange={handleNotebookChange}
      />

      <ExportDialog
        open={exportOpen}
        onClose={() =>
          setExportOpen(false)
        }
        onExportPdf={handleExportPdf}
        onExportWord={handleExportWord}
        onSharePdf={handleSharePdf}
        onExportMarkdown={handleMarkdown}
        onExportText={handleExportText}
        onPrint={handlePrint}
      />
    </Box>
  );
}