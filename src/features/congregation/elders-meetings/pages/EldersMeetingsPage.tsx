import { useNavigate } from "react-router-dom";

import GavelRoundedIcon from "@mui/icons-material/GavelRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import CampaignRoundedIcon from "@mui/icons-material/CampaignRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

interface MeetingCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
}

function MeetingTypeCard({
  title,
  description,
  icon,
  color,
  onClick,
}: MeetingCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        cursor: "pointer",
        transition: "all .25s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 4,
        },
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Stack spacing={3}>
          <Avatar
            sx={{
              bgcolor: color,
              width: 64,
              height: 64,
            }}
          >
            {icon}
          </Avatar>

          <Box>
            <Typography
              variant="h5"
              fontWeight={700}
            >
              {title}
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ mt: 1 }}
            >
              {description}
            </Typography>
          </Box>

          <Button
            variant="contained"
            endIcon={<ChevronRightRoundedIcon />}
            onClick={onClick}
          >
            Open Workspace
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default function EldersMeetingsPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        maxWidth: 1600,
        mx: "auto",
        px: {
          xs: 2,
          md: 4,
        },
        py: 4,
      }}
    >
      <Stack spacing={5}>
        {/* Hero */}

        <Box>
          <Typography
            variant="h3"
            fontWeight={800}
          >
            Elders Meetings
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              mt: 1,
              maxWidth: 850,
            }}
          >
            Organize Body of Elders meetings,
            Service Committee meetings,
            special events, meeting agendas,
            assignments, minutes, and
            congregation planning in one
            professional workspace.
          </Typography>
        </Box>

        {/* Meeting Types */}

        <Grid
          container
          spacing={3}
        >
          <Grid
            size={{
              xs: 12,
              md: 4,
            }}
          >
            <MeetingTypeCard
              title="Body of Elders"
              description="Prepare agendas, record minutes, assign responsibilities and export professional meeting records."
              color="#E3F2FD"
              icon={
                <GavelRoundedIcon
                  color="primary"
                />
              }
              onClick={() =>
                navigate(
                  "/congregation/elders-meetings/body-of-elders"
                )
              }
            />
          </Grid>

          <Grid
            size={{
              xs: 12,
              md: 4,
            }}
          >
            <MeetingTypeCard
              title="Service Committee"
              description="Manage congregation service committee meetings and follow-up assignments."
              color="#E8F5E9"
              icon={
                <GroupsRoundedIcon
                  sx={{
                    color: "#2E7D32",
                  }}
                />
              }
              onClick={() =>
                navigate(
                  "/congregation/elders-meetings/service-committee"
                )
              }
            />
          </Grid>

          <Grid
            size={{
              xs: 12,
              md: 4,
            }}
          >
            <MeetingTypeCard
              title="Other Meetings"
              description="Special Talks, Memorial planning, Circuit Overseer visits and congregation events."
              color="#FFF3E0"
              icon={
                <CampaignRoundedIcon
                  sx={{
                    color: "#EF6C00",
                  }}
                />
              }
              onClick={() =>
                navigate(
                  "/congregation/elders-meetings/other"
                )
              }
            />
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}