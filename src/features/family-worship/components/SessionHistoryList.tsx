import {
  Stack,
  Typography,
} from "@mui/material";

import { FamilyWorshipSession } from "../models/FamilyWorshipSession";
import SessionHistoryCard from "./SessionHistoryCard";

interface Props {
  sessions: FamilyWorshipSession[];

  onOpen: (
    session: FamilyWorshipSession
  ) => void;

  onDelete: (
    id: string
  ) => void;
}

export default function SessionHistoryList({
  sessions,
  onOpen,
  onDelete,
}: Props) {
  if (sessions.length === 0) {
    return (
      <Typography
        color="text.secondary"
      >
        No worship sessions have been created yet.
      </Typography>
    );
  }

  return (
    <Stack spacing={2}>
      {sessions.map((session) => (
        <SessionHistoryCard
          key={session.id}
          session={session}
          onOpen={onOpen}
          onDelete={onDelete}
        />
      ))}
    </Stack>
  );
}