import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import {
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";

interface Props {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick(): void;
}

export default function QuickActionCard({
  icon,
  title,
  description,
  onClick,
}: Props) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        transition: ".25s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 6,
        },
      }}
    >
      <CardActionArea onClick={onClick}>
        <CardContent sx={{ p: 3 }}>
          <Stack spacing={2}>
            {icon}

            <Typography
              variant="h6"
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
              justifyContent="flex-end"
            >
              <ChevronRightRoundedIcon
                color="primary"
              />
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}