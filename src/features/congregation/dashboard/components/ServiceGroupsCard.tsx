import DashboardSection from "../../../../shared/components/dashboard/DashboardSection";
import StatRow from "../../../../shared/components/dashboard/StatRow";

type ServiceGroupsCardProps = {
  totalGroups: number;
};

const ServiceGroupsCard = ({
  totalGroups,
}: ServiceGroupsCardProps) => {
  return (
    <DashboardSection title="Service Groups">
      <StatRow label="Total Groups" value={totalGroups} />
      <StatRow label="Status" value="Active" />
    </DashboardSection>
  );
};

export default ServiceGroupsCard;