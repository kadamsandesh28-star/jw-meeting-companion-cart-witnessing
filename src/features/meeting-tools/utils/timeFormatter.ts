 export function formatTime(milliseconds: number): string {
  const totalCentiseconds = Math.floor(milliseconds / 10);

  const hours = Math.floor(totalCentiseconds / 360000);
  const minutes = Math.floor(
    (totalCentiseconds % 360000) / 6000
  );
  const seconds = Math.floor(
    (totalCentiseconds % 6000) / 100
  );
  const centiseconds = totalCentiseconds % 100;

  const pad = (value: number) =>
    value.toString().padStart(2, "0");

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(
    centiseconds
  )}`;
}   