import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Grid,
  Stack,
} from "@mui/material";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";

import HeroBanner from "../../../../shared/dashboard/HeroBanner";
import QuickActionCard from "../../../../shared/dashboard/QuickActionCard";

import MeetingStatsCard from "../components/MeetingStatsCard";
import MeetingList from "../components/MeetingList";
import CreateMeetingDialog from "../dialogs/CreateMeetingDialog";

import { meetingHistoryStorage } from "../storage/meetingHistoryStorage";

import type { Meeting } from "../models/Meeting";

export default function MeetingLibraryPage() {
  const navigate = useNavigate();

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const handleCreate = ({
    title,
    meetingType,
    meetingDate,
    meetingTime,
  }: {
    title: string;
    meetingType: string;
    meetingDate: string;
    meetingTime: string;
  }) => {
    const meeting: Meeting = {
      id: crypto.randomUUID(),

      title,

      createdAt: new Date().toISOString(),

      updatedAt: new Date().toISOString(),

      archived: false,

      info: {
        congregation: "",
        meetingType,
        meetingDate,
        meetingTime,
        chairman: "",
        openingPrayer: "",
        closingPrayer: "",
        nextChairman: "",
      },

      attendance: [],

      agenda: [],

      minutes: "",
    };

    meetingHistoryStorage.create(meeting);

    switch (meetingType) {
      case "Body of Elders":
        navigate(
          "/congregation/elders-meetings/body-of-elders"
        );
        break;

      case "Service Committee":
        navigate(
          "/congregation/elders-meetings/service-committee"
        );
        break;

      default:
        navigate(
          "/congregation/elders-meetings/other"
        );
    }
  };

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
      <Stack spacing={4}>
        <HeroBanner
          title="Body of Elders Meetings"
          subtitle="Manage agendas, attendance, assignments, minutes and congregation decisions in one organized workspace."
          primaryAction={
            <Button
              startIcon={<AddRoundedIcon />}
              onClick={() =>
                setDialogOpen(true)
              }
              sx={{
                color: "white",
                px: 4,
                py: 1.3,
                borderRadius: 999,
                border:
                  "1px solid rgba(255,255,255,.25)",
                bgcolor:
                  "rgba(255,255,255,.12)",
                backdropFilter: "blur(8px)",
                textTransform: "none",
                fontWeight: 600,

                "&:hover": {
                  bgcolor: "white",
                  color: "#2F4858",
                },
              }}
            >
              New Meeting
            </Button>
          }
        />

        <Grid
          container
          spacing={3}
        >
          <Grid size={{ xs: 12, md: 3 }}>
            <QuickActionCard
              icon={
                <AddRoundedIcon
                  color="primary"
                  fontSize="large"
                />
              }
              title="New Meeting"
              description="Create a new meeting workspace."
              onClick={() =>
                setDialogOpen(true)
              }
            />
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <QuickActionCard
              icon={
                <HistoryRoundedIcon
                  color="primary"
                  fontSize="large"
                />
              }
              title="Meeting History"
              description="Browse previous meetings."
              onClick={() => {}}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <QuickActionCard
              icon={
                <DescriptionRoundedIcon
                  color="primary"
                  fontSize="large"
                />
              }
              title="Templates"
              description="Start from meeting templates."
              onClick={() => {}}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <QuickActionCard
              icon={
                <AssessmentRoundedIcon
                  color="primary"
                  fontSize="large"
                />
              }
              title="Reports"
              description="View meeting analytics."
              onClick={() => {}}
            />
          </Grid>
        </Grid>

        <Grid
          container
          spacing={3}
        >
          <Grid size={{ xs: 12, md: 8 }}>
            <MeetingList />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <MeetingStatsCard />
          </Grid>
        </Grid>

        <CreateMeetingDialog
          open={dialogOpen}
          onClose={() =>
            setDialogOpen(false)
          }
          onCreate={handleCreate}
        />
      </Stack>
    </Box>
  );
}