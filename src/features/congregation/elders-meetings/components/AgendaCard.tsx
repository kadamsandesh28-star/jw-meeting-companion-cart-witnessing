import AddRoundedIcon from "@mui/icons-material/AddRounded";

import {
  Button,
  Stack,
} from "@mui/material";

import MeetingCard from "../../../../shared/meeting-workspace/MeetingCard";

import AgendaItemCard from "./AgendaItemCard";

import { useMeeting } from "../context/MeetingContext";

export default function AgendaCard() {
  const { agenda } = useMeeting();

  return (
    <MeetingCard
      title="Meeting Agenda"
      subtitle="Discussion items for this meeting."
    >
      <Stack spacing={3}>
        {agenda.agendaItems.map((item, index) => (
          <AgendaItemCard
            key={item.id}
            number={index + 1}
            item={item}
            onChange={agenda.updateAgendaItem}
          />
        ))}

        <Button
          variant="contained"
          startIcon={<AddRoundedIcon />}
          onClick={agenda.addAgendaItem}
        >
          Add Agenda Item
        </Button>
      </Stack>
    </MeetingCard>
  );
}