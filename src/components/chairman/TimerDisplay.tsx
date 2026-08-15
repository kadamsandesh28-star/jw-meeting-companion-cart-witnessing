type TimerDisplayProps = {
  elapsedSeconds: number;
};

function formatTime(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds]
    .map((value) => value.toString().padStart(2, "0"))
    .join(":");
}

export default function TimerDisplay({
  elapsedSeconds,
}: TimerDisplayProps) {
  return (
    <div className="rounded-xl bg-slate-900 p-6 text-center text-white">
      <div className="font-mono text-5xl font-bold tracking-wider">
        {formatTime(elapsedSeconds)}
      </div>
    </div>
  );
}            