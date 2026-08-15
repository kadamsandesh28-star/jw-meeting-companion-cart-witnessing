import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import DirectionsWalkRoundedIcon from "@mui/icons-material/DirectionsWalkRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import FreeBreakfastRoundedIcon from "@mui/icons-material/FreeBreakfastRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import SelfImprovementRoundedIcon from "@mui/icons-material/SelfImprovementRounded";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";

import {
  Avatar,
  Checkbox,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { ScheduleItem } from "../models/ScheduleItem";

interface Props {
  item: ScheduleItem;
  onToggle: (id: string) => void;
  onEdit: (item: ScheduleItem) => void;
  onDelete: (id: string) => void;
}

function getActivityIcon(name: string) {
  switch (name) {
    case "prayer":
      return <SelfImprovementRoundedIcon color="primary" />;

    case "bible":
      return <MenuBookRoundedIcon color="success" />;

    case "study":
      return <AutoStoriesRoundedIcon color="secondary" />;

    case "walk":
      return <DirectionsWalkRoundedIcon color="success" />;

    case "breakfast":
      return <FreeBreakfastRoundedIcon color="warning" />;

    case "office":
      return <WorkRoundedIcon color="action" />;

    case "ministry":
      return <HomeRoundedIcon color="primary" />;

    case "meeting":
      return <GroupsRoundedIcon color="secondary" />;

    default:
      return <AccessTimeRoundedIcon color="action" />;
  }
}

export default function ScheduleRow({
  item,
  onToggle,
  onEdit,
  onDelete,
}: Props) {
  return (
    <Paper
      elevation={0}
      sx={{
        px: 2,
        py: 2.25,
        borderRadius: 3,
        border: 1,
        borderColor: "divider",
        bgcolor: "background.paper",
        transition: "all .2s ease",
        "&:hover": {
          borderColor: "primary.main",
          transform: "translateY(-1px)",
          boxShadow: 2,
        },
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
      >
        <Checkbox
          checked={item.completed}
          onChange={() => onToggle(item.id)}
        />

        <Typography
          sx={{
            width: 70,
            fontWeight: 700,
            color: "primary.main",
            fontSize: 15,
          }}
        >
          {item.time}
        </Typography>

        <Avatar
          sx={{
            width: 38,
            height: 38,
            bgcolor: "action.hover",
          }}
        >
          {getActivityIcon(item.icon)}
        </Avatar>

        <Typography
          sx={{
            flex: 1,
            fontSize: 15,
            fontWeight: 600,
            color: item.completed
              ? "text.disabled"
              : "text.primary",
            textDecoration: item.completed
              ? "line-through"
              : "none",
            opacity: item.completed ? 0.75 : 1,
          }}
        >
          {item.activity}
        </Typography>

        <IconButton
          color="primary"
          onClick={() => onEdit(item)}
        >
          <EditRoundedIcon />
        </IconButton>

        <IconButton
          color="error"
          onClick={() => onDelete(item.id)}
        >
          <DeleteOutlineRoundedIcon />
        </IconButton>
      </Stack>
    </Paper>
  );
}