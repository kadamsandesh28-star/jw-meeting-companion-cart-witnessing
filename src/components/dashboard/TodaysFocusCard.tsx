import { ArrowRight, Target } from "lucide-react";
import { Link } from "react-router-dom";
import Card from "../ui/Card";

interface Props {
  title: string;
  description: string;
  button: string;
  path: string;
}

export default function TodaysFocusCard({
  title,
  description,
  button,
  path,
}: Props) {
  return (
    <Card
      title="Today's Focus"
      icon={<Target className="h-6 w-6 text-amber-600" />}
    >
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>

          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            {description}
          </p>
        </div>

        <Link
          to={path}
          className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 font-medium text-white transition hover:bg-amber-600"
        >
          {button}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </Card>
  );
}