import { useParams } from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";

import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

import { territoryService } from "../services/territoryService";

export default function TerritoryProfile() {
  const { id } = useParams();

  const territory = id
    ? territoryService.getById(id)
    : undefined;

  if (!territory) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h5">
          Territory not found
        </Typography>
      </Box>
    );
  }

  const currentTerritory = territory;

  function openAttachment() {
    if (!currentTerritory.attachment) {
      return;
    }

    const newWindow =
      window.open("", "_blank");

    if (!newWindow) {
      return;
    }

    newWindow.document.write(`
      <html>
        <head>
          <title>${currentTerritory.attachment.name}</title>

          <style>
            html,
            body {
              margin: 0;
              padding: 0;
              width: 100%;
              height: 100%;
              background: #f5f5f5;
            }

            iframe,
            img {
              width: 100%;
              height: 100%;
              border: 0;
              object-fit: contain;
            }
          </style>
        </head>

        <body>
          ${
            currentTerritory.attachment.type ===
            "pdf"
              ? `<iframe src="${currentTerritory.attachment.data}"></iframe>`
              : `<img src="${currentTerritory.attachment.data}" alt="${currentTerritory.attachment.name}" />`
          }
        </body>
      </html>
    `);

    newWindow.document.close();
  }

  function wrapText(
    text: string,
    maxLength: number
  ): string[] {
    const words = text.split(" ");
    const lines: string[] = [];

    let currentLine = "";

    for (const word of words) {
      const testLine = currentLine
        ? `${currentLine} ${word}`
        : word;

      if (testLine.length > maxLength) {
        if (currentLine) {
          lines.push(currentLine);
        }

        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }

    if (currentLine) {
      lines.push(currentLine);
    }

    return lines;
  }

  async function renderPdfPageToPng(
    pdfBytes: ArrayBuffer
  ): Promise<{
    pngBytes: ArrayBuffer;
    pageCount: number;
  }> {
    const loadingTask = pdfjsLib.getDocument({
      data: new Uint8Array(pdfBytes),
    });

    const sourcePdf = await loadingTask.promise;
    const firstPage = await sourcePdf.getPage(1);

    const viewport = firstPage.getViewport({
      scale: 1.5,
    });

    const canvas = document.createElement("canvas");
    canvas.width = Math.ceil(viewport.width);
    canvas.height = Math.ceil(viewport.height);

    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Unable to create map preview.");
    }

    await firstPage.render({
  canvasContext: context,
  viewport,
  canvas,
}).promise;

    const dataUrl = canvas.toDataURL("image/png");
    const response = await fetch(dataUrl);
    const pngBytes = await response.arrayBuffer();

    return {
      pngBytes,
      pageCount: sourcePdf.numPages,
    };
  }

  async function createCombinedPdf(): Promise<Blob> {
    const pdfDoc = await PDFDocument.create();

    const font = await pdfDoc.embedFont(
      StandardFonts.Helvetica
    );

    const boldFont = await pdfDoc.embedFont(
      StandardFonts.HelveticaBold
    );

    const pageWidth = 595.28;
    const pageHeight = 841.89;
    const margin = 42;

    // First page: details + map + handwritten notes.
    const page = pdfDoc.addPage([
      pageWidth,
      pageHeight,
    ]);

    let y = pageHeight - margin;

    page.drawText(
      `Territory ${currentTerritory.number}`,
      {
        x: margin,
        y,
        size: 21,
        font: boldFont,
        color: rgb(0.1, 0.1, 0.1),
      }
    );

    y -= 25;

    page.drawText(
      currentTerritory.name || "Territory",
      {
        x: margin,
        y,
        size: 12,
        font,
        color: rgb(0.35, 0.35, 0.35),
      }
    );

    y -= 18;

    page.drawLine({
      start: { x: margin, y },
      end: { x: pageWidth - margin, y },
      thickness: 1,
      color: rgb(0.8, 0.8, 0.8),
    });

    y -= 17;

    const leftDetails: Array<[string, string]> = [
      ["Type", currentTerritory.type || "None"],
      ["Status", currentTerritory.status || "None"],
      [
        "Service Group",
        currentTerritory.assignedServiceGroupId || "None",
      ],
      [
        "Map Reference",
        currentTerritory.mapReference || "None",
      ],
    ];

    const rightDetails: Array<[string, string]> = [
      [
        "Last Worked",
        currentTerritory.lastWorked || "Not Recorded",
      ],
      [
        "Next Due",
        currentTerritory.nextDue || "Not Scheduled",
      ],
    ];

    let detailY = y;

    for (let index = 0; index < leftDetails.length; index += 1) {
      const [label, value] = leftDetails[index];

      page.drawText(`${label}:`, {
        x: margin,
        y: detailY,
        size: 8.5,
        font: boldFont,
        color: rgb(0.2, 0.2, 0.2),
      });

      page.drawText(value, {
        x: margin + 72,
        y: detailY,
        size: 8.5,
        font,
        color: rgb(0.25, 0.25, 0.25),
      });

      const right = rightDetails[index];

      if (right) {
        const [rightLabel, rightValue] = right;

        page.drawText(`${rightLabel}:`, {
          x: 315,
          y: detailY,
          size: 8.5,
          font: boldFont,
          color: rgb(0.2, 0.2, 0.2),
        });

        page.drawText(rightValue, {
          x: 385,
          y: detailY,
          size: 8.5,
          font,
          color: rgb(0.25, 0.25, 0.25),
        });
      }

      detailY -= 14;
    }

    y = detailY - 3;

    page.drawText("Address Notes:", {
      x: margin,
      y,
      size: 8.5,
      font: boldFont,
      color: rgb(0.2, 0.2, 0.2),
    });

    const addressLines = wrapText(
      currentTerritory.addressNotes || "None",
      92
    ).slice(0, 2);

    page.drawText(addressLines.join(" "), {
      x: margin + 75,
      y,
      size: 8.5,
      font,
      color: rgb(0.25, 0.25, 0.25),
      maxWidth: 430,
    });

    y -= Math.max(16, addressLines.length * 11);

    page.drawText("Notes:", {
      x: margin,
      y,
      size: 8.5,
      font: boldFont,
      color: rgb(0.2, 0.2, 0.2),
    });

    const territoryNotes = wrapText(
      currentTerritory.notes || "None",
      92
    ).slice(0, 2);

    page.drawText(territoryNotes.join(" "), {
      x: margin + 75,
      y,
      size: 8.5,
      font,
      color: rgb(0.25, 0.25, 0.25),
      maxWidth: 430,
    });

    y -= Math.max(18, territoryNotes.length * 11);

    page.drawLine({
      start: { x: margin, y },
      end: { x: pageWidth - margin, y },
      thickness: 1,
      color: rgb(0.8, 0.8, 0.8),
    });

    y -= 16;

    page.drawText("Territory Map", {
      x: margin,
      y,
      size: 12,
      font: boldFont,
      color: rgb(0.1, 0.1, 0.1),
    });

    y -= 13;

    const notesAreaHeight = 105;
    const notesTop = margin + notesAreaHeight;
    const mapTop = y;
    const mapBottom = notesTop + 8;

    if (!currentTerritory.attachment) {
      page.drawText("No territory map attached.", {
        x: margin,
        y: mapTop - 15,
        size: 9,
        font,
        color: rgb(0.4, 0.4, 0.4),
      });
    } else {
      page.drawText(
        `Attachment: ${currentTerritory.attachment.name}`,
        {
          x: margin,
          y: mapTop,
          size: 7.5,
          font,
          color: rgb(0.45, 0.45, 0.45),
        }
      );

      const mapAreaTop = mapTop - 10;
      const mapAreaBottom = mapBottom;
      const mapAreaWidth = pageWidth - margin * 2;
      const mapAreaHeight = mapAreaTop - mapAreaBottom;

      if (
        currentTerritory.attachment.type === "image"
      ) {
        const response = await fetch(
          currentTerritory.attachment.data
        );

        const imageBytes = await response.arrayBuffer();
        const fileName =
          currentTerritory.attachment.name.toLowerCase();

        const image = fileName.endsWith(".png")
          ? await pdfDoc.embedPng(imageBytes)
          : await pdfDoc.embedJpg(imageBytes);

        const scale = Math.min(
          mapAreaWidth / image.width,
          mapAreaHeight / image.height,
          1
        );

        const displayWidth = image.width * scale;
        const displayHeight = image.height * scale;

        page.drawImage(image, {
          x:
            margin +
            (mapAreaWidth - displayWidth) / 2,
          y:
            mapAreaBottom +
            (mapAreaHeight - displayHeight) / 2,
          width: displayWidth,
          height: displayHeight,
        });
      }

      if (
        currentTerritory.attachment.type === "pdf"
      ) {
        const response = await fetch(
          currentTerritory.attachment.data
        );

        const arrayBuffer = await response.arrayBuffer();

        const rendered = await renderPdfPageToPng(
          arrayBuffer
        );

        const mapImage = await pdfDoc.embedPng(
          rendered.pngBytes
        );

        const scale = Math.min(
          mapAreaWidth / mapImage.width,
          mapAreaHeight / mapImage.height,
          1
        );

        const displayWidth = mapImage.width * scale;
        const displayHeight = mapImage.height * scale;

        page.drawImage(mapImage, {
          x:
            margin +
            (mapAreaWidth - displayWidth) / 2,
          y:
            mapAreaBottom +
            (mapAreaHeight - displayHeight) / 2,
          width: displayWidth,
          height: displayHeight,
        });

        // Preserve additional pages from a multi-page map PDF.
        if (rendered.pageCount > 1) {
          const sourcePdf = await PDFDocument.load(
            arrayBuffer
          );

          const additionalPages = await pdfDoc.copyPages(
            sourcePdf,
            Array.from(
              { length: rendered.pageCount - 1 },
              (_, index) => index + 1
            )
          );

          for (const additionalPage of additionalPages) {
            pdfDoc.addPage(additionalPage);
          }
        }
      }
    }

    // Five blank handwritten note lines at the bottom.
    const notesTitleY =
      margin + notesAreaHeight - 8;

    page.drawText("Additional Notes", {
      x: margin,
      y: notesTitleY,
      size: 9,
      font: boldFont,
      color: rgb(0.2, 0.2, 0.2),
    });

    const firstLineY = notesTitleY - 17;

    for (let index = 0; index < 5; index += 1) {
      const lineY = firstLineY - index * 15;

      page.drawLine({
        start: { x: margin, y: lineY },
        end: { x: pageWidth - margin, y: lineY },
        thickness: 0.6,
        color: rgb(0.7, 0.7, 0.7),
      });
    }

    const pdfBytes = await pdfDoc.save();

    const pdfArrayBuffer = new ArrayBuffer(
      pdfBytes.byteLength
    );

    new Uint8Array(pdfArrayBuffer).set(pdfBytes);

    return new Blob([pdfArrayBuffer], {
      type: "application/pdf",
    });
  }

  async function shareTerritory() {
    try {
      const pdfBlob =
        await createCombinedPdf();

      const pdfFile =
        new File(
          [
            pdfBlob,
          ],
          `Territory-${currentTerritory.number}-${currentTerritory.name || "Map"}.pdf`,
          {
            type:
              "application/pdf",
          }
        );

      if (
        navigator.share &&
        navigator.canShare &&
        navigator.canShare({
          files: [pdfFile],
        })
      ) {
        await navigator.share({
          title:
            `Territory ${currentTerritory.number}`,
          text:
            `Territory ${currentTerritory.number} - ${currentTerritory.name}`,
          files: [pdfFile],
        });

        return;
      }

      /*
       * Desktop fallback:
       * download the combined PDF.
       */
      const url =
        URL.createObjectURL(
          pdfBlob
        );

      const link =
        document.createElement(
          "a"
        );

      link.href = url;

      link.download =
        `Territory-${currentTerritory.number}.pdf`;

      document.body.appendChild(
        link
      );

      link.click();

      link.remove();

      URL.revokeObjectURL(
        url
      );

      alert(
        "✅ Combined territory PDF created successfully."
      );
    } catch (error) {
      console.error(
        "Territory PDF error:",
        error
      );

      alert(
        "❌ Unable to create the territory PDF."
      );
    }
  }

  return (
    <Box sx={{ p: 3 }}>
      <Stack spacing={3}>

        <Typography
          variant="h4"
          fontWeight={800}
        >
          Territory{" "}
          {currentTerritory.number}
        </Typography>

        <Card>
          <CardContent>
            <Stack spacing={2}>

              <Typography>
                <strong>Name:</strong>{" "}
                {currentTerritory.name}
              </Typography>

              <Typography>
                <strong>Type:</strong>{" "}
                {currentTerritory.type}
              </Typography>

              <Typography>
                <strong>Status:</strong>{" "}
                {currentTerritory.status}
              </Typography>

              <Typography>
                <strong>
                  Assigned Service Group:
                </strong>{" "}
                {currentTerritory
                  .assignedServiceGroupId ||
                  "None"}
              </Typography>

              <Divider />

              <Typography variant="h6">
                Address Notes
              </Typography>

              <Typography color="text.secondary">
                {currentTerritory
                  .addressNotes ||
                  "None"}
              </Typography>

              <Typography>
                <strong>
                  Map Reference:
                </strong>{" "}
                {currentTerritory
                  .mapReference ||
                  "None"}
              </Typography>

              <Divider />

              <Typography>
                <strong>
                  Last Worked:
                </strong>{" "}
                {currentTerritory
                  .lastWorked ||
                  "Not Recorded"}
              </Typography>

              <Typography>
                <strong>
                  Next Due:
                </strong>{" "}
                {currentTerritory
                  .nextDue ||
                  "Not Scheduled"}
              </Typography>

              {currentTerritory.notes && (
                <>
                  <Divider />

                  <Typography variant="h6">
                    Notes
                  </Typography>

                  <Typography color="text.secondary">
                    {currentTerritory.notes}
                  </Typography>
                </>
              )}

              {currentTerritory.attachment && (
                <>
                  <Divider />

                  <Typography
                    variant="h6"
                    fontWeight={700}
                  >
                    Territory Map
                  </Typography>

                  <Typography
                    color="text.secondary"
                  >
                    📎{" "}
                    {
                      currentTerritory
                        .attachment.name
                    }
                  </Typography>

                  <Stack
                    direction={{
                      xs: "column",
                      sm: "row",
                    }}
                    spacing={2}
                  >
                    <Button
                      variant="contained"
                      startIcon={
                        <OpenInNewRoundedIcon />
                      }
                      onClick={
                        openAttachment
                      }
                      sx={{
                        width:
                          "fit-content",
                      }}
                    >
                      Open Map
                    </Button>

                    <Button
                      variant="outlined"
                      startIcon={
                        <ShareRoundedIcon />
                      }
                      onClick={
                        shareTerritory
                      }
                      sx={{
                        width:
                          "fit-content",
                      }}
                    >
                      Share Territory
                    </Button>
                  </Stack>
                </>
              )}

              {!currentTerritory.attachment && (
                <Button
                  variant="outlined"
                  startIcon={
                    <ShareRoundedIcon />
                  }
                  onClick={
                    shareTerritory
                  }
                  sx={{
                    width:
                      "fit-content",
                  }}
                >
                  Share Territory
                </Button>
              )}

              <Divider />

              <Chip
                label={
                  currentTerritory.status
                }
                color={
                  currentTerritory.status ===
                  "Available"
                    ? "success"
                    : currentTerritory.status ===
                      "Assigned"
                    ? "warning"
                    : "default"
                }
                sx={{
                  width:
                    "fit-content",
                }}
              />

            </Stack>
          </CardContent>
        </Card>

      </Stack>
    </Box>
  );
}