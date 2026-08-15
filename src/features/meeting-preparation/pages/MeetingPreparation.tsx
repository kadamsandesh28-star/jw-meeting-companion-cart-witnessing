import {
  ArrowBackRounded,
  CheckCircleRounded,
  CircleOutlined,
} from "@mui/icons-material";

import {
  Box,
  Card,
  CardContent,
  Divider,
  IconButton,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  loadMeetingPreparation,
  saveMeetingPreparation,
  type MeetingPreparationItem,
} from "../storage/meetingPreparationStorage";

export default function MeetingPreparation() {
  const navigate = useNavigate();

  const [items, setItems] =
    useState<MeetingPreparationItem[]>(
      () => loadMeetingPreparation()
    );

  const completed = items.filter(
    (item) => item.completed
  ).length;

  const total = items.length;

  const percentage =
    total === 0
      ? 0
      : (completed / total) * 100;

  function handleToggle(id: string) {
    const updated = items.map((item) =>
      item.id === id
        ? {
            ...item,
            completed: !item.completed,
          }
        : item
    );

    setItems(updated);
    saveMeetingPreparation(updated);
  }

  return (
    <Box
      sx={{
        maxWidth: 760,
        mx: "auto",
        p: {
          xs: 2,
          sm: 3,
        },
      }}
    >
      <Stack spacing={3}>
        {/* Header */}
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
        >
          <IconButton
            onClick={() => navigate("/")}
            aria-label="Back to Home"
          >
            <ArrowBackRounded />
          </IconButton>

          <Box>
            <Typography
              variant="h4"
              fontWeight={800}
            >
              Meeting Preparation
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              A simple checklist for this week.
            </Typography>
          </Box>
        </Stack>

        {/* Progress */}
        <Card
          elevation={0}
          sx={{
            borderRadius: 4,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <CardContent>
            <Stack spacing={2}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  fontWeight={700}
                >
                  Preparation progress
                </Typography>

                <Typography
                  fontWeight={700}
                  color={
                    completed === total &&
                    total > 0
                      ? "success.main"
                      : "text.secondary"
                  }
                >
                  {completed} of {total}
                </Typography>
              </Stack>

              <LinearProgress
                variant="determinate"
                value={percentage}
                sx={{
                  height: 9,
                  borderRadius: 5,
                }}
              />

              <Typography
                variant="body2"
                color="text.secondary"
              >
                {completed === total &&
                total > 0
                  ? "You're ready for the meeting."
                  : `${total - completed} ${
                      total - completed === 1
                        ? "item"
                        : "items"
                    } remaining`}
              </Typography>
            </Stack>
          </CardContent>
        </Card>

        {/* Checklist */}
        <Card
          elevation={0}
          sx={{
            borderRadius: 4,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <CardContent sx={{ p: 0 }}>
            {items.map((item, index) => (
              <Box key={item.id}>
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  sx={{
                    px: 2.5,
                    py: 2,
                    cursor: "pointer",
                    transition:
                      "background-color 0.2s ease",
                    "&:hover": {
                      backgroundColor:
                        "action.hover",
                    },
                  }}
                  onClick={() =>
                    handleToggle(item.id)
                  }
                >
                  <IconButton
                    size="small"
                    color={
                      item.completed
                        ? "success"
                        : "default"
                    }
                    aria-label={
                      item.completed
                        ? "Mark incomplete"
                        : "Mark complete"
                    }
                  >
                    {item.completed ? (
                      <CheckCircleRounded />
                    ) : (
                      <CircleOutlined />
                    )}
                  </IconButton>

                  <Typography
                    sx={{
                      flex: 1,
                      textDecoration:
                        item.completed
                          ? "line-through"
                          : "none",
                      color:
                        item.completed
                          ? "text.secondary"
                          : "text.primary",
                      fontWeight: 500,
                    }}
                  >
                    {item.title}
                  </Typography>
                </Stack>

                {index <
                  items.length - 1 && (
                  <Divider />
                )}
              </Box>
            ))}
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}