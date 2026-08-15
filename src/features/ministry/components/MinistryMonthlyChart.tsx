import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import SectionCard from "../../../components/ui/SectionCard";
import { MonthlyReport } from "../types/report";

export interface MinistryMonthlyChartProps {
  title: string;
  subtitle?: string;
  data: MonthlyReport[];
  dataKey: keyof MonthlyReport;
}

export default function MinistryMonthlyChart({
  title,
  subtitle,
  data,
  dataKey,
}: MinistryMonthlyChartProps) {
  return (
    <SectionCard
      title={title}
      subtitle={subtitle}
    >
      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis allowDecimals={false} />

          <Tooltip />

          <Line
            type="monotone"
            dataKey={dataKey}
            stroke="#1976d2"
            strokeWidth={3}
            dot={{
              r: 4,
            }}
            activeDot={{
              r: 6,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </SectionCard>
  );
}