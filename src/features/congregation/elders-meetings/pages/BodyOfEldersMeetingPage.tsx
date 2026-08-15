import {
  useEffect,
} from "react";

import {
  Box,
  Button,
  Grid,
  Stack,
} from "@mui/material";

import SaveRoundedIcon from "@mui/icons-material/SaveRounded";

import {
  useSearchParams,
} from "react-router-dom";

import MeetingHeader from "../../../../shared/meeting-workspace/MeetingHeader";
import MeetingFooter from "../../../../shared/meeting-workspace/MeetingFooter";

import MeetingInfoCard from "../components/MeetingInfoCard";
import AttendanceCard from "../components/AttendanceCard";
import AgendaCard from "../components/AgendaCard";
import MinutesCard from "../components/MinutesCard";
import AssignmentsCard from "../components/AssignmentsCard";

import {
  MeetingProvider,
  useMeeting,
} from "../context/MeetingContext";

import ExportButton from "../export/ExportButton";
import { meetingPdfService } from "../export/meetingPdfService";

import {
  loadCongregationProfile,
} from "../../../../features/settings/storage/congregationProfileStorage";

import { meetingService } from "../services/meetingService";

import {
  meetingHistoryStorage,
} from "../storage/meetingHistoryStorage";

function MeetingWorkspace() {
  const {
    meeting,
    setMeeting,
  } = useMeeting();

  const [
    searchParams,
  ] = useSearchParams();

  const meetingId =
    searchParams.get(
      "meetingId"
    );

  const profile =
    loadCongregationProfile();

  /*
   * Load an existing saved meeting
   * when meetingId is present in the URL.
   */
  useEffect(() => {
    if (!meetingId) {
      return;
    }

    const savedMeeting =
      meetingHistoryStorage.getById(
        meetingId
      );

    if (savedMeeting) {
      setMeeting(
        savedMeeting
      );
    }
  }, [
    meetingId,
    setMeeting,
  ]);

  function handleSave() {
    const updatedMeeting = {
      ...meeting,

      info: {
        ...meeting.info,

        congregation:
          meeting.info.congregation ||
          profile.congregationName,
      },

      updatedAt:
        new Date().toISOString(),
    };

    setMeeting(
      updatedMeeting
    );

    /*
     * Save to the main meeting storage.
     */
    meetingService.save(
      updatedMeeting
    );

    /*
     * Also update the meeting history
     * so it appears correctly in the
     * Meetings list.
     */
    meetingHistoryStorage.update(
      updatedMeeting
    );

    alert(
      "✅ Meeting saved successfully."
    );
  }

  function handleExportPdf() {
    const pdfMeeting = {
      ...meeting,

      info: {
        ...meeting.info,

        congregation:
          meeting.info.congregation ||
          profile.congregationName,
      },
    };

    meetingPdfService.export(
      pdfMeeting
    );
  }

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
      <MeetingHeader
        title="Body of Elders Meeting"
        subtitle="Manage agenda, attendance, minutes and follow-up assignments."
        actions={
          <Stack
            direction="row"
            spacing={2}
          >
            <Button
              variant="outlined"
              startIcon={
                <SaveRoundedIcon />
              }
              onClick={
                handleSave
              }
            >
              Save
            </Button>

            <ExportButton
              onPdf={
                handleExportPdf
              }
            />
          </Stack>
        }
      />

      <Grid
        container
        spacing={3}
      >
        <Grid
          size={{
            xs: 12,
            md: 8,
          }}
        >
          <MeetingInfoCard />
        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 4,
          }}
        >
          <AttendanceCard />
        </Grid>
      </Grid>

      <AgendaCard />

      <MinutesCard />

      <AssignmentsCard />

      <MeetingFooter />
    </Box>
  );
}

export default function BodyOfEldersMeetingPage() {
  return (
    <MeetingProvider>
      <MeetingWorkspace />
    </MeetingProvider>
  );
}