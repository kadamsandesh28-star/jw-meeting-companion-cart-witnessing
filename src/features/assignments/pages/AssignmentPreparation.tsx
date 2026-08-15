import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";

import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  loadPlanner,
  type PlannerAssignment,
} from "../../../services/plannerService";

const STORAGE_KEY =
  "jwMeetingCompanion.assignmentPreparations";

interface AssignmentPreparationData {
  time: string;
  theme: string;
  scriptures: string;
  introduction: string;
  mainPoints: string;
  application: string;
  conclusion: string;
}

type SavedPreparations = Record<
  string,
  AssignmentPreparationData
>;

const EMPTY_PREPARATION: AssignmentPreparationData = {
  time: "",
  theme: "",
  scriptures: "",
  introduction: "",
  mainPoints: "",
  application: "",
  conclusion: "",
};

function loadPreparations(): SavedPreparations {
  try {
    const saved =
      localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return {};
    }

    const parsed = JSON.parse(saved);

    if (
      parsed &&
      typeof parsed === "object" &&
      !Array.isArray(parsed)
    ) {
      return parsed as SavedPreparations;
    }

    return {};
  } catch {
    return {};
  }
}

function savePreparations(
  preparations: SavedPreparations
) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(preparations)
    );
  } catch (error) {
    console.warn(
      "Unable to save assignment preparation:",
      error
    );
  }
}

function getTemplateForAssignment(
  assignment: PlannerAssignment
): {
  title: string;
  subtitle: string;
  fields: Array<{
    key: keyof AssignmentPreparationData;
    label: string;
    placeholder: string;
    rows: number;
  }>;
} {
  const title =
    assignment.title.toLowerCase();

  const isTreasures =
    title.includes("treasures") ||
    title.includes("god's word") ||
    title.includes("gods word");

  if (isTreasures) {
    return {
      title: "Treasures From God's Word",
      subtitle:
        "Prepare your main thoughts, scriptures, application, and conclusion.",
      fields: [
        {
          key: "theme",
          label: "Theme",
          placeholder:
            "Write the theme or main idea...",
          rows: 2,
        },
        {
          key: "scriptures",
          label: "Scripture(s)",
          placeholder:
            "List the scriptures you plan to use...",
          rows: 3,
        },
        {
          key: "introduction",
          label: "Introduction",
          placeholder:
            "How will you introduce the subject?",
          rows: 4,
        },
        {
          key: "mainPoints",
          label: "Main Points",
          placeholder:
            "Write your main thoughts, explanations, illustrations, or supporting points...",
          rows: 7,
        },
        {
          key: "application",
          label: "Application",
          placeholder:
            "How can this information benefit the congregation?",
          rows: 4,
        },
        {
          key: "conclusion",
          label: "Conclusion",
          placeholder:
            "How will you bring the assignment to a clear conclusion?",
          rows: 4,
        },
      ],
    };
  }

  return {
    title: assignment.title,
    subtitle:
      "Prepare your assignment using the notes below.",
    fields: [
      {
        key: "theme",
        label: "Theme / Objective",
        placeholder:
          "What is the main objective of this assignment?",
        rows: 3,
      },
      {
        key: "scriptures",
        label: "Scripture(s)",
        placeholder:
          "List the scriptures you plan to use...",
        rows: 3,
      },
      {
        key: "introduction",
        label: "Introduction",
        placeholder:
          "How will you begin?",
        rows: 4,
      },
      {
        key: "mainPoints",
        label: "Main Points / Outline",
        placeholder:
          "Write your outline, conversation, demonstration, or main points...",
        rows: 7,
      },
      {
        key: "application",
        label: "Application",
        placeholder:
          "What should the audience remember or apply?",
        rows: 4,
      },
      {
        key: "conclusion",
        label: "Conclusion",
        placeholder:
          "How will you finish?",
        rows: 4,
      },
    ],
  };
}

export default function AssignmentPreparation() {
  const navigate = useNavigate();

  const [searchParams] =
    useSearchParams();

  const assignmentId =
    searchParams.get("assignment");

  const [assignment, setAssignment] =
    useState<PlannerAssignment | null>(
      null
    );

  const [preparation, setPreparation] =
    useState<AssignmentPreparationData>(
      EMPTY_PREPARATION
    );

  const [saved, setSaved] =
    useState(false);

  const [exporting, setExporting] =
    useState(false);

  useEffect(() => {
    const planner = loadPlanner();

    const found = planner.find(
      (item) =>
        item.id === assignmentId
    );

    setAssignment(found ?? null);

    if (found) {
      const preparations =
        loadPreparations();

      setPreparation({
        ...EMPTY_PREPARATION,
        ...(preparations[found.id] ??
          {}),
      });
    }
  }, [assignmentId]);

  function updateField(
    key: keyof AssignmentPreparationData,
    value: string
  ) {
    setSaved(false);

    setPreparation((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function handleSave() {
    if (!assignment) {
      return;
    }

    const preparations =
      loadPreparations();

    preparations[assignment.id] =
      preparation;

    savePreparations(preparations);

    setSaved(true);
  }

  async function exportPdf() {
    if (!assignment) {
      return;
    }

    setExporting(true);

    try {
      const {
        PDFDocument,
        rgb,
        StandardFonts,
      } = await import("pdf-lib");

      const pdfDoc =
        await PDFDocument.create();

      const regularFont =
        await pdfDoc.embedFont(
          StandardFonts.Helvetica
        );

      const boldFont =
        await pdfDoc.embedFont(
          StandardFonts.HelveticaBold
        );

      const pageWidth = 595.28;
      const pageHeight = 841.89;
      const margin = 45;

      let page = pdfDoc.addPage([
        pageWidth,
        pageHeight,
      ]);

      let y =
        pageHeight - margin;

      const bottomMargin = 45;

      function addPageIfNeeded(
        requiredHeight: number
      ) {
        if (
          y - requiredHeight <
          bottomMargin
        ) {
          page = pdfDoc.addPage([
            pageWidth,
            pageHeight,
          ]);

          y =
            pageHeight - margin;
        }
      }

      function drawWrappedText(
        text: string,
        options: {
          x: number;
          width: number;
          size: number;
          lineHeight: number;
          font: typeof regularFont;
          color: ReturnType<typeof rgb>;
        }
      ) {
        const words =
          text.trim().split(/\s+/);

        if (
          !text.trim() ||
          words.length === 0
        ) {
          return;
        }

        const lines: string[] = [];
        let current = "";

        for (const word of words) {
          const test = current
            ? `${current} ${word}`
            : word;

          const measured =
            options.font.widthOfTextAtSize(
              test,
              options.size
            );

          if (
            measured >
              options.width &&
            current
          ) {
            lines.push(current);
            current = word;
          } else {
            current = test;
          }
        }

        if (current) {
          lines.push(current);
        }

        for (const line of lines) {
          addPageIfNeeded(
            options.lineHeight
          );

          page.drawText(line, {
            x: options.x,
            y,
            size: options.size,
            font: options.font,
            color: options.color,
          });

          y -= options.lineHeight;
        }
      }

      page.drawText(
        "Assignment Preparation",
        {
          x: margin,
          y,
          size: 22,
          font: boldFont,
          color: rgb(
            0.12,
            0.12,
            0.12
          ),
        }
      );

      y -= 28;

      page.drawText(
        template.title,
        {
          x: margin,
          y,
          size: 15,
          font: boldFont,
          color: rgb(
            0.2,
            0.2,
            0.2
          ),
        }
      );

      y -= 20;

      page.drawText(
        `${assignment.meeting} Meeting`,
        {
          x: margin,
          y,
          size: 10,
          font: regularFont,
          color: rgb(
            0.4,
            0.4,
            0.4
          ),
        }
      );

      y -= 18;

      page.drawText(
        `Time allotted: ${
          preparation.time ||
          "Not specified"
        }`,
        {
          x: margin,
          y,
          size: 10,
          font: boldFont,
          color: rgb(
            0.25,
            0.25,
            0.25
          ),
        }
      );

      y -= 18;

      page.drawLine({
        start: {
          x: margin,
          y,
        },
        end: {
          x:
            pageWidth - margin,
          y,
        },
        thickness: 1,
        color: rgb(
          0.8,
          0.8,
          0.8
        ),
      });

      y -= 24;

      const sections: Array<{
        label: string;
        value: string;
      }> = [
        {
          label: "Theme",
          value: preparation.theme,
        },
        {
          label: "Scripture(s)",
          value:
            preparation.scriptures,
        },
        {
          label: "Introduction",
          value:
            preparation.introduction,
        },
        {
          label: "Main Points",
          value:
            preparation.mainPoints,
        },
        {
          label: "Application",
          value:
            preparation.application,
        },
        {
          label: "Conclusion",
          value:
            preparation.conclusion,
        },
      ];

      for (const section of sections) {
        addPageIfNeeded(45);

        page.drawText(
          section.label,
          {
            x: margin,
            y,
            size: 11,
            font: boldFont,
            color: rgb(
              0.15,
              0.15,
              0.15
            ),
          }
        );

        y -= 16;

        if (
          section.value.trim()
        ) {
          drawWrappedText(
            section.value,
            {
              x: margin,
              width:
                pageWidth -
                margin * 2,
              size: 10,
              lineHeight: 14,
              font: regularFont,
              color: rgb(
                0.25,
                0.25,
                0.25
              ),
            }
          );
        } else {
          page.drawText(
            "Not entered",
            {
              x: margin,
              y,
              size: 10,
              font: regularFont,
              color: rgb(
                0.55,
                0.55,
                0.55
              ),
            }
          );

          y -= 14;
        }

        y -= 16;
      }

      const pdfBytes =
        await pdfDoc.save();

      /*
       * Convert the pdf-lib Uint8Array
       * into a standard ArrayBuffer for
       * the browser Blob constructor.
       *
       * This avoids the ArrayBufferLike /
       * BlobPart TypeScript error.
       */
      const pdfBuffer =
        pdfBytes.buffer as ArrayBuffer;

      const blob =
        new Blob(
          [pdfBuffer],
          {
            type:
              "application/pdf",
          }
        );

      const fileName =
        `Assignment-${assignment.title
          .replace(
            /[^a-z0-9]+/gi,
            "-"
          )
          .replace(
            /^-+|-+$/g,
            ""
          ) || "Preparation"}.pdf`;

      const file =
        new File(
          [blob],
          fileName,
          {
            type:
              "application/pdf",
          }
        );

      if (
        navigator.share &&
        navigator.canShare &&
        navigator.canShare({
          files: [file],
        })
      ) {
        await navigator.share({
          title:
            `Assignment Preparation - ${assignment.title}`,
          text:
            `${assignment.title} - ${assignment.meeting} Meeting`,
          files: [file],
        });

        return;
      }

      const url =
        URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;
      link.download = fileName;

      document.body.appendChild(link);

      link.click();

      link.remove();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(
        "Assignment PDF export error:",
        error
      );

      alert(
        "Unable to create the assignment PDF."
      );
    } finally {
      setExporting(false);
    }
  }

  if (!assignment) {
    return (
      <Box
        sx={{
          maxWidth: 760,
          mx: "auto",
          p: {
            xs: 2,
            sm: 3,
          },
        }}
      >
        <Stack spacing={2}>
          <Typography
            variant="h5"
            fontWeight={800}
          >
            Assignment not found
          </Typography>

          <Typography color="text.secondary">
            This assignment may have been
            removed from your planner.
          </Typography>

          <Button
            variant="contained"
            onClick={() =>
              navigate("/assignments")
            }
            sx={{
              width: "fit-content",
            }}
          >
            Back to Assignments
          </Button>
        </Stack>
      </Box>
    );
  }

  const template =
    getTemplateForAssignment(
      assignment
    );

  return (
    <Box
      sx={{
        maxWidth: 800,
        mx: "auto",
        p: {
          xs: 2,
          sm: 3,
        },
      }}
    >
      <Stack spacing={3}>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
        >
          <IconButton
            onClick={() =>
              navigate("/assignments")
            }
            aria-label="Back to Assignments"
          >
            <ArrowBackRoundedIcon />
          </IconButton>

          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h4"
              fontWeight={800}
            >
              Prepare Assignment
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              {assignment.meeting} Meeting
            </Typography>
          </Box>
        </Stack>

        <Card
          elevation={0}
          sx={{
            borderRadius: 4,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <CardContent>
            <Stack spacing={2}>
              <Typography
                variant="h5"
                fontWeight={800}
              >
                {template.title}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                {template.subtitle}
              </Typography>

              <FormControl
                size="small"
                sx={{
                  maxWidth: 220,
                }}
              >
                <InputLabel>
                  Time allotted
                </InputLabel>

                <Select
                  value={
                    preparation.time
                  }
                  label="Time allotted"
                  onChange={(event) =>
                    updateField(
                      "time",
                      event.target.value
                    )
                  }
                >
                  <MenuItem value="">
                    Not specified
                  </MenuItem>

                  <MenuItem value="5 minutes">
                    5 minutes
                  </MenuItem>

                  <MenuItem value="10 minutes">
                    10 minutes
                  </MenuItem>

                  <MenuItem value="15 minutes">
                    15 minutes
                  </MenuItem>

                  <MenuItem value="30 minutes">
                    30 minutes
                  </MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </CardContent>
        </Card>

        <Card
          elevation={0}
          sx={{
            borderRadius: 4,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <CardContent>
            <Stack spacing={3}>
              {template.fields.map(
                (field, index) => (
                  <Box key={field.key}>
                    {index > 0 && (
                      <Divider
                        sx={{ mb: 3 }}
                      />
                    )}

                    <TextField
                      fullWidth
                      multiline
                      minRows={field.rows}
                      label={field.label}
                      placeholder={
                        field.placeholder
                      }
                      value={
                        preparation[
                          field.key
                        ]
                      }
                      onChange={(event) =>
                        updateField(
                          field.key,
                          event.target.value
                        )
                      }
                    />
                  </Box>
                )
              )}
            </Stack>
          </CardContent>
        </Card>

        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          spacing={2}
        >
          <Button
            variant="contained"
            size="large"
            startIcon={
              <SaveRoundedIcon />
            }
            onClick={handleSave}
          >
            Save Preparation
          </Button>

          <Button
            variant="outlined"
            size="large"
            startIcon={
              <PictureAsPdfRoundedIcon />
            }
            onClick={exportPdf}
            disabled={exporting}
          >
            {exporting
              ? "Creating PDF..."
              : "Export PDF"}
          </Button>

          <Button
            variant="text"
            size="large"
            startIcon={
              <PlayArrowRoundedIcon />
            }
            onClick={() =>
              navigate(
                `/assignments?practice=${assignment.id}`
              )
            }
          >
            Practice Assignment
          </Button>
        </Stack>

        {saved && (
          <Typography
            variant="body2"
            color="success.main"
            fontWeight={600}
          >
            ✓ Preparation saved
          </Typography>
        )}
      </Stack>
    </Box>
  );
}