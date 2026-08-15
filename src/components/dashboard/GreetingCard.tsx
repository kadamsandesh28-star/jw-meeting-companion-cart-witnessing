import { useEffect, useState } from "react";
import { Hand } from "lucide-react";
import { getOverallProgress } from "../../services/plannerService";

interface Props {
  greeting: string;
}

export default function GreetingCard({ greeting }: Props) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const today = new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(now);

  const time = new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  }).format(now);

  const { progress } = getOverallProgress();

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-500 to-violet-600 p-8 text-white shadow-xl">
      {/* Decorative glow */}
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-white/5 blur-3xl" />

      <div className="relative flex items-start justify-between">
        <div>
          <div className="mb-2 flex items-center gap-3">
            <div className="rounded-2xl bg-white/15 p-3 backdrop-blur">
              <Hand className="h-6 w-6" />
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {greeting}
              </h1>

              <p className="mt-1 text-indigo-100">
                {today}
              </p>

              <p className="mt-1 font-mono text-lg font-semibold tracking-wide text-white">
                {time}
              </p>
            </div>
          </div>

          <p className="mt-6 max-w-md leading-relaxed text-indigo-100">
            Let's get prepared for this week's spiritual activities and stay
            focused on what matters most.
          </p>
        </div>

        <div className="hidden rounded-2xl bg-white/10 px-4 py-3 backdrop-blur md:block">
          <p className="text-sm text-indigo-100">
            Preparation
          </p>

          <p className="mt-1 text-2xl font-bold">
            {progress}%
          </p>
        </div>
      </div>
    </div>
  );
}