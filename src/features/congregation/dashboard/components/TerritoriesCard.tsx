import DashboardSection from "../../../../shared/components/dashboard/DashboardSection";
import StatRow from "../../../../shared/components/dashboard/StatRow";

type TerritoriesCardProps = {
  totalTerritories: number;
};

const TerritoriesCard = ({
  totalTerritories,
}: TerritoriesCardProps) => {
  return (
    <DashboardSection title="Territories">
      <StatRow
        label="Total Territories"
        value={totalTerritories}
      />
      <StatRow label="Status" value="Available" />
    </DashboardSection>
  );
};

export default TerritoriesCard;