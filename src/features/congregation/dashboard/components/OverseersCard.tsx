import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

interface OverseersCardProps {
  coordinator?: string;
  secretary?: string;
  serviceOverseer?: string;
}

interface RoleRowProps {
  role: string;
  name?: string;
  icon: React.ReactNode;
  color: string;
}

function RoleRow({
  role,
  name,
  icon,
  color,
}: RoleRowProps) {
  const assigned = Boolean(name);

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        transition: "all .25s ease",
        "&:hover": {
          boxShadow: 2,
          transform: "translateY(-2px)",
        },
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
      >
        <Avatar
          sx={{
            bgcolor: color,
            color: "white",
            width: 46,
            height: 46,
          }}
        >
          {icon}
        </Avatar>

        <Box flex={1}>
          <Typography
            fontWeight={700}
          >
            {role}
          </Typography>

          <Typography
            color={
              assigned
                ? "text.primary"
                : "text.secondary"
            }
            sx={{
              mt: 0.25,
              fontStyle: assigned
                ? "normal"
                : "italic",
            }}
          >
            {name ?? "Not Assigned"}
          </Typography>
        </Box>

        <ChevronRightRoundedIcon
          color="disabled"
        />
      </Stack>
    </Box>
  );
}

export default function OverseersCard({
  coordinator,
  secretary,
  serviceOverseer,
}: OverseersCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        height: "100%",
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Typography
          variant="h5"
          fontWeight={700}
        >
          Congregation Overseers
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mt: 1, mb: 3 }}
        >
          Current congregation leadership assignments.
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Stack spacing={2}>
          <RoleRow
            role="Coordinator"
            name={coordinator}
            icon={<PersonOutlineRoundedIcon />}
            color="#42A5F5"
          />

          <RoleRow
            role="Secretary"
            name={secretary}
            icon={<BadgeOutlinedIcon />}
            color="#66BB6A"
          />

          <RoleRow
            role="Service Overseer"
            name={serviceOverseer}
            icon={<ShieldOutlinedIcon />}
            color="#AB47BC"
          />
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            cursor: "pointer",
            color: "primary.main",
            fontWeight: 600,
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          <Typography
            fontWeight={600}
            color="primary"
          >
            View Body of Elders
          </Typography>

          <ChevronRightRoundedIcon
            color="primary"
          />
        </Stack>
      </CardContent>
    </Card>
  );
}