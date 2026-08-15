interface DashboardCardProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export default function DashboardCard({
  title,
  icon,
  children,
}: DashboardCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center gap-2 mb-5">
        {icon}

        <h2 className="text-xl font-semibold text-gray-800">
          {title}
        </h2>
      </div>

      {children}
    </div>
  );
}