export async function sharePdf(
  pdfBytes: Uint8Array,
  filename: string
): Promise<void> {
const arrayBuffer = pdfBytes.buffer.slice(
  pdfBytes.byteOffset,
  pdfBytes.byteOffset + pdfBytes.byteLength
) as ArrayBuffer;

const blob = new Blob([arrayBuffer], {
  type: "application/pdf",
});
  const file = new File([blob], filename, {
    type: "application/pdf",
  });

  // Native share (Android, iPhone, some desktop browsers)
  if (
    navigator.share &&
    navigator.canShare?.({ files: [file] })
  ) {
    await navigator.share({
      title: filename,
      files: [file],
    });

    return;
  }

  // Fallback download
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = filename;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}