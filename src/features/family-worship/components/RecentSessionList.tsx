import {
  Stack,
  Typography,
} from "@mui/material";

import { FamilyWorshipSession } from "../models/FamilyWorshipSession";
import RecentSessionCard from "./RecentSessionCard";

interface Props {
  sessions: FamilyWorshipSession[];
  onOpen?: (id: string) => void;
}

export default function RecentSessionList({
  sessions,
  onOpen,
}: Props) {
  return (
    <Stack spacing={3}>
      <Typography
        variant="h5"
        fontWeight={700}
      >
        Recent Worship Sessions
      </Typography>

      {sessions.length === 0 ? (
        <Typography color="text.secondary">
          Your completed and in-progress
          worship sessions will appear here.
        </Typography>
      ) : (
        <Stack spacing={2}>
          {sessions.map((session) => (
            <RecentSessionCard
              key={session.id}
              session={session}
              onOpen={onOpen}
            />
          ))}
        </Stack>
      )}
    </Stack>
  );
}