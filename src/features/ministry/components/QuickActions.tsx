import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SchoolIcon from "@mui/icons-material/School";
import AssessmentIcon from "@mui/icons-material/Assessment";

import SectionCard from "../../../components/ui/SectionCard";
import ActionCard from "../../../components/ui/ActionCard";

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <SectionCard
      title="Quick Actions"
      subtitle="Common ministry tasks"
    >
      <Stack spacing={2}>
        <ActionCard
          title="Start Ministry Session"
          description="Record a new ministry session"
          icon={<PlayArrowIcon />}
          onClick={() =>
            navigate("/ministry/session/new")
          }
        />

        <ActionCard
          title="Add Return Visit"
          description="Create a new return visit"
          icon={<AddCircleOutlineIcon />}
          onClick={() =>
            navigate("/ministry/return-visits")
          }
        />

        <ActionCard
          title="Add Bible Study"
          description="Record a new Bible study"
          icon={<SchoolIcon />}
          onClick={() =>
            navigate("/ministry/bible-studies")
          }
        />

        <ActionCard
          title="Reports"
          description="View ministry reports and statistics"
          icon={<AssessmentIcon />}
          onClick={() =>
            navigate("/ministry/reports")
          }
        />
      </Stack>
    </SectionCard>
  );
}