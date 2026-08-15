import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import Diversity3RoundedIcon from "@mui/icons-material/Diversity3Rounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

import {
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
  Avatar,
} from "@mui/material";

interface MeetingCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}

function MeetingCard({
  title,
  description,
  icon,
  onClick,
}: MeetingCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 5,
        border: "1px solid",
        borderColor: "divider",
        transition: ".25s",

        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 5,
          borderColor: "primary.main",
        },
      }}
    >
      <CardActionArea onClick={onClick}>
        <CardContent sx={{ p: 4 }}>
          <Stack spacing={3}>
            <Avatar
              sx={{
                width: 62,
                height: 62,
                bgcolor: "#E3F2FD",
                color: "primary.main",
              }}
            >
              {icon}
            </Avatar>

            <Typography
              variant="h5"
              fontWeight={700}
            >
              {title}
            </Typography>

            <Typography
              color="text.secondary"
            >
              {description}
            </Typography>

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                color="primary"
                fontWeight={700}
              >
                Open
              </Typography>

              <ArrowForwardRoundedIcon
                color="primary"
              />
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default function MeetingTabs() {
  return (
    <Stack spacing={3}>

      <MeetingCard
        title="Body of Elders"
        description="Prepare agendas, record minutes, assign responsibilities and monitor follow-up tasks."
        icon={<GroupsRoundedIcon />}
        onClick={() => {
          console.log("Body of Elders");
        }}
      />

      <MeetingCard
        title="Service Committee"
        description="Manage congregation service committee meetings and organizational matters."
        icon={<Diversity3RoundedIcon />}
        onClick={() => {
          console.log("Service Committee");
        }}
      />

      <MeetingCard
        title="Other Meetings"
        description="Special Talk, Memorial, Circuit Assembly, Regional Convention and other congregation events."
        icon={<EventAvailableRoundedIcon />}
        onClick={() => {
          console.log("Other Meetings");
        }}
      />

    </Stack>
  );
}