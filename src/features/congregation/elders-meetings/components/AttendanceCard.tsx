import { useEffect, useState } from "react";

import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import {
  Avatar,
  Button,
  Checkbox,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import MeetingCard from "../../../../shared/meeting-workspace/MeetingCard";

import { useMeetingElders } from "../hooks/useMeetingElders";
import { useMeeting } from "../context/MeetingContext";

export default function AttendanceCard() {
  const elders = useMeetingElders();

  const {
    meeting,
    setMeeting,
  } = useMeeting();

  const [elderName, setElderName] =
    useState("");

  /*
   * Add congregation elders to the
   * current meeting attendance list.
   */
  useEffect(() => {
    setMeeting((current) => {
      const existingIds = new Set(
        current.attendance.map(
          (member) => member.id
        )
      );

      const missingElders = elders
        .filter(
          (elder) =>
            !existingIds.has(elder.id)
        )
        .map((elder) => ({
          id: elder.id,
          name: elder.name,
          present: false,
        }));

      if (missingElders.length === 0) {
        return current;
      }

      return {
        ...current,
        attendance: [
          ...current.attendance,
          ...missingElders,
        ],
      };
    });
  }, [elders, setMeeting]);

  function handleToggle(
    id: string
  ) {
    setMeeting((current) => ({
      ...current,
      attendance:
        current.attendance.map(
          (member) =>
            member.id === id
              ? {
                  ...member,
                  present:
                    !member.present,
                }
              : member
        ),
    }));
  }

  function handleAddElder() {
    const name =
      elderName.trim();

    if (!name) {
      return;
    }

    setMeeting((current) => ({
      ...current,
      attendance: [
        ...current.attendance,
        {
          id: crypto.randomUUID(),
          name,
          present: false,
        },
      ],
    }));

    setElderName("");
  }

  return (
    <MeetingCard title="Attendance">
      <Stack spacing={2}>

        <Typography
          variant="body2"
          color="text.secondary"
        >
          Mark the brothers present
          for this meeting.
        </Typography>

        {meeting.attendance.length ===
          0 && (
          <Typography
            color="text.secondary"
          >
            No elders added yet.
          </Typography>
        )}

        {meeting.attendance.map(
          (elder) => (
            <Stack
              key={elder.id}
              direction="row"
              spacing={2}
              alignItems="center"
            >
              <Checkbox
                checked={
                  elder.present
                }
                onChange={() =>
                  handleToggle(
                    elder.id
                  )
                }
              />

              <Avatar
                sx={{
                  bgcolor: "#E3F2FD",
                  color:
                    "primary.main",
                }}
              >
                <PersonRoundedIcon />
              </Avatar>

              <Stack
                spacing={0}
                sx={{
                  flex: 1,
                }}
              >
                <Typography
                  fontWeight={600}
                >
                  {elder.name}
                </Typography>
              </Stack>
            </Stack>
          )
        )}

        <Divider />

        <Typography
          variant="subtitle1"
          fontWeight={700}
        >
          Add Elder
        </Typography>

        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          spacing={2}
        >
          <TextField
            fullWidth
            label="Elder Name"
            placeholder="Enter elder's name"
            value={elderName}
            onChange={(event) =>
              setElderName(
                event.target.value
              )
            }
            onKeyDown={(event) => {
              if (
                event.key === "Enter"
              ) {
                event.preventDefault();
                handleAddElder();
              }
            }}
          />

          <Button
            variant="contained"
            startIcon={
              <AddRoundedIcon />
            }
            onClick={
              handleAddElder
            }
            sx={{
              minWidth: 150,
            }}
          >
            Add Elder
          </Button>
        </Stack>

      </Stack>
    </MeetingCard>
  );
}