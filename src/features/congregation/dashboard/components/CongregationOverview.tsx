import DashboardSection from "../../../../shared/components/dashboard/DashboardSection";
import StatRow from "../../../../shared/components/dashboard/StatRow";

import { publisherService } from "../../publishers/services/publisherService";
import { bodyMemberService } from "../../body-of-elders/services/bodyMemberService";
import { serviceGroupService } from "../../service-groups/services/serviceGroupService";
import { territoryService } from "../../territories/services/territoryService";
import { serviceCommitteeService } from "../../service-committee/services/serviceCommitteeService";

const CongregationOverview = () => {
  const publishers = publisherService.getAll();
  const elders = bodyMemberService.getAll();
  const groups = serviceGroupService.getAll();
  const territories = territoryService.getAll();
  const committees = serviceCommitteeService.getAll();

  return (
    <DashboardSection title="Congregation Overview">
      <StatRow label="Publishers" value={publishers.length} />
      <StatRow label="Body of Elders" value={elders.length} />
      <StatRow label="Service Groups" value={groups.length} />
      <StatRow label="Territories" value={territories.length} />
      <StatRow
        label="Service Committees"
        value={committees.length}
      />
    </DashboardSection>
  );
};

export default CongregationOverview;