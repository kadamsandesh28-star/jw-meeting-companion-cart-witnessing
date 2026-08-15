import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Props {
  id: string;
  title: string;
  minutes: number;
  category: "Midweek" | "Weekend";
}

export default function MeetingTimerCard({
  id,
  title,
  minutes,
  category,
}: Props) {
  const navigate = useNavigate();

  return (
    <Card
      elevation={3}
      sx={{
        mb: 2,
        borderRadius: 3,
      }}
    >
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography
              variant="h6"
              fontWeight="bold"
            >
              {title}
            </Typography>

            <Typography color="text.secondary">
              ⏱ {minutes} Minutes
            </Typography>

            <Chip
              label={category}
              size="small"
              color={
                category === "Midweek"
                  ? "primary"
                  : "success"
              }
              sx={{ mt: 1 }}
            />
          </Box>

          <Button
            variant="contained"
            size="large"
            onClick={() =>
              navigate("/practice-timer", {
                state: {
                  id,
                  title,
                  minutes,
                },
              })
            }
          >
            ▶ Practice
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}