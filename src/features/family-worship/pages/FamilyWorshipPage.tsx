import { useMemo, useState } from "react";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import {
  Alert,
  Box,
  Button,
  Chip,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import ContinueSessionCard from "../components/ContinueSessionCard";
import FamilyWorshipHeader from "../components/FamilyWorshipHeader";
import HistoryDialog from "../components/HistoryDialog";
import NewSessionCard from "../components/NewSessionCard";
import RecentSessionList from "../components/RecentSessionList";
import SurpriseMeCard from "../components/SurpriseMeCard";
import TemplateLibrary from "../components/TemplateLibrary";
import TemplatePreviewDialog from "../components/TemplatePreviewDialog";
import WorshipSessionEditor from "../components/WorshipSessionEditor";

import { worshipTemplates } from "../data";
import { useFamilyWorship } from "../hooks/useFamilyWorship";
import { FamilyWorshipSession } from "../models/FamilyWorshipSession";
import { WorshipTemplate } from "../models/WorshipTemplate";
import { createEmptySession } from "../utils/createEmptySession";
import { createSessionFromTemplate } from "../utils/createSessionFromTemplate";
import {
  formatSessionDate,
  formatSessionTime,
} from "../utils/dateFormatter";
import { getRandomTemplate } from "../utils/getRandomTemplate";

export default function FamilyWorshipPage() {
  const {
    sessions,
    saveSession,
    removeSession,
  } = useFamilyWorship();

  const [editing, setEditing] =
    useState(false);

  const [historyOpen, setHistoryOpen] =
    useState(false);

  const [previewOpen, setPreviewOpen] =
    useState(false);

  const [
    selectedTemplate,
    setSelectedTemplate,
  ] =
    useState<WorshipTemplate | null>(
      null
    );

  const [session, setSession] =
    useState<FamilyWorshipSession>(
      createEmptySession()
    );

  const recentSessions = useMemo(
    () =>
      [...sessions]
        .sort(
          (a, b) =>
            b.updatedAt - a.updatedAt
        )
        .slice(0, 5),
    [sessions]
  );

  const lastSession =
    recentSessions[0] ?? null;

  const upcomingSessions =
    useMemo(
      () =>
        [...sessions]
          .filter(
            (session) =>
              !!session.scheduledDate
          )
          .sort((a, b) => {
            const left = new Date(
              `${a.scheduledDate}T${a.scheduledTime}`
            ).getTime();

            const right = new Date(
              `${b.scheduledDate}T${b.scheduledTime}`
            ).getTime();

            return left - right;
          }),
      [sessions]
    );

  const nextSession =
    upcomingSessions[0] ?? null;

  function handleNewSession() {
    setSession(createEmptySession());
    setEditing(true);
  }

  function handleSave(
    updated: FamilyWorshipSession
  ) {
    saveSession(updated);
    setEditing(false);
  }

  function handleContinue(
    existing: FamilyWorshipSession
  ) {
    setSession(existing);
    setEditing(true);
  }

  function handleTemplateSelected(
    template: WorshipTemplate
  ) {
    setSelectedTemplate(template);
    setPreviewOpen(true);
  }

  function handleUseTemplate(
    template: WorshipTemplate
  ) {
    const newSession =
      createSessionFromTemplate(
        template
      );

    setSession(newSession);

    setPreviewOpen(false);
    setSelectedTemplate(null);

    setEditing(true);
  }

  function handleSurpriseMe() {
    const template =
      getRandomTemplate(
        worshipTemplates
      );

    if (!template) {
      return;
    }

    setSelectedTemplate(template);
    setPreviewOpen(true);
  }

  if (editing) {
    return (
      <Box
        sx={{
          maxWidth: 1100,
          mx: "auto",
          p: 3,
          pb: 10,
        }}
      >
        <Button
          startIcon={
            <ArrowBackRoundedIcon />
          }
          onClick={() =>
            setEditing(false)
          }
          sx={{ mb: 3 }}
        >
          Back to Dashboard
        </Button>

        <WorshipSessionEditor
          session={session}
          onChange={setSession}
          onSave={handleSave}
        />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: 1100,
        mx: "auto",
        p: 3,
        pb: 10,
      }}
    >
      <FamilyWorshipHeader />

      {nextSession && (
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mt: 4,
            mb: 4,
            borderRadius: 4,
            border: 2,
            borderColor:
              "primary.main",
          }}
        >
          <Stack spacing={2}>
            <Chip
              label="NEXT FAMILY WORSHIP"
              color="primary"
              sx={{
                width: "fit-content",
                fontWeight: 700,
              }}
            />

            <Typography
              variant="h4"
              fontWeight={700}
            >
              {nextSession.title ||
                "Family Worship"}
            </Typography>

            {nextSession.theme && (
              <Typography
                color="text.secondary"
              >
                {nextSession.theme}
              </Typography>
            )}

            <Typography color="text.secondary">
              📅{" "}
              {formatSessionDate(
                nextSession.scheduledDate
              )}
            </Typography>

            <Typography color="text.secondary">
              🕖{" "}
              {formatSessionTime(
                nextSession.scheduledTime
              )}
            </Typography>
{nextSession.goals.length > 0 && (
  <>
    <Typography
      variant="subtitle2"
      fontWeight={700}
    >
      Goal Progress
    </Typography>

    <LinearProgress
      variant="determinate"
      value={
        (nextSession.goals.filter(
          (goal) => goal.completed
        ).length /
          nextSession.goals.length) *
        100
      }
      sx={{
        height: 10,
        borderRadius: 999,
      }}
    />

    <Typography
      variant="body2"
      color="text.secondary"
    >
      {
        nextSession.goals.filter(
          (goal) => goal.completed
        ).length
      }{" "}
      of {nextSession.goals.length} goals completed
    </Typography>
  </>
)}
            <Alert severity="info">
              Your next scheduled
              Family Worship session.
            </Alert>

            <Button
              variant="contained"
              onClick={() =>
                handleContinue(
                  nextSession
                )
              }
            >
              Open Session
            </Button>
          </Stack>
        </Paper>
      )}

      <Box
        display="flex"
        justifyContent="flex-end"
        mb={3}
      >
        <Button
          variant="outlined"
          onClick={() =>
            setHistoryOpen(true)
          }
        >
          📚 History
        </Button>
      </Box>

      <ContinueSessionCard
        session={lastSession}
        onContinue={handleContinue}
      />

      <NewSessionCard
        onCreate={handleNewSession}
      />

      <SurpriseMeCard
        onSurprise={handleSurpriseMe}
      />

      <TemplateLibrary
        templates={worshipTemplates}
        onSelect={
          handleTemplateSelected
        }
      />

      {upcomingSessions.length >
        1 && (
        <Paper
          elevation={0}
          sx={{
            mt: 5,
            p: 3,
            borderRadius: 4,
            border: 1,
            borderColor:
              "divider",
          }}
        >
          <Typography
            variant="h6"
            fontWeight={700}
            mb={2}
          >
            Upcoming Sessions
          </Typography>

          <Stack spacing={2}>
            {upcomingSessions
              .slice(1)
              .map((item) => (
                <Paper
                  key={item.id}
                  variant="outlined"
                  sx={{
                    p: 2,
                  }}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box>
                      <Typography fontWeight={700}>
                        {item.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        📅{" "}
                        {formatSessionDate(
                          item.scheduledDate
                        )}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        🕖{" "}
                        {formatSessionTime(
                          item.scheduledTime
                        )}
                      </Typography>
                    </Box>

                    <Button
                      size="small"
                      onClick={() =>
                        handleContinue(
                          item
                        )
                      }
                    >
                      Open
                    </Button>
                  </Stack>
                </Paper>
              ))}
          </Stack>
        </Paper>
      )}

      <Box sx={{ mt: 5 }}>
        <RecentSessionList
          sessions={recentSessions}
        />
      </Box>

      <TemplatePreviewDialog
        open={previewOpen}
        template={
          selectedTemplate
        }
        onClose={() => {
          setPreviewOpen(false);
          setSelectedTemplate(
            null
          );
        }}
        onUse={handleUseTemplate}
      />

      <HistoryDialog
        open={historyOpen}
        sessions={sessions}
        onClose={() =>
          setHistoryOpen(false)
        }
        onOpen={(selected) => {
          setSession(selected);
          setEditing(true);
          setHistoryOpen(false);
        }}
        onDelete={removeSession}
      />
    </Box>
  );
}