import {
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { publisherService } from "../../publishers/services/publisherService";

interface DepartmentMembersCardProps {
  overseer?: string;
  assistant?: string;
  members: string[];
  keyMembers: string[];
}

const publishers = publisherService.getAll();

const getPublisherName = (id?: string) => {
  if (!id) return "Not Assigned";

  const publisher = publishers.find((p) => p.id === id);

  if (!publisher) return "Unknown Publisher";

  return `${publisher.firstName} ${publisher.lastName}`;
};

export default function DepartmentMembersCard({
  overseer,
  assistant,
  members,
  keyMembers,
}: DepartmentMembersCardProps) {
  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Stack spacing={3}>
        <Typography variant="h6">
          Department Members
        </Typography>

        <Stack spacing={1}>
          <Typography variant="subtitle2">
            Overseer
          </Typography>

          <Chip
            color="primary"
            label={getPublisherName(overseer)}
          />
        </Stack>

        <Stack spacing={1}>
          <Typography variant="subtitle2">
            Assistant
          </Typography>

          <Chip
            color="secondary"
            label={getPublisherName(assistant)}
          />
        </Stack>

        <Stack spacing={1}>
          <Typography variant="subtitle2">
            Members ({members.length})
          </Typography>

          <List dense>
            {members.length === 0 ? (
              <ListItem>
                <ListItemText primary="No members assigned" />
              </ListItem>
            ) : (
              members.map((memberId) => (
                <ListItem key={memberId}>
                  <ListItemAvatar>
                    <Avatar>
                      {getPublisherName(memberId)
                        .charAt(0)
                        .toUpperCase()}
                    </Avatar>
                  </ListItemAvatar>

                  <ListItemText
                    primary={getPublisherName(memberId)}
                  />
                </ListItem>
              ))
            )}
          </List>
        </Stack>

        <Stack spacing={1}>
          <Typography variant="subtitle2">
            Key Members
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            flexWrap="wrap"
          >
            {keyMembers.length === 0 ? (
              <Chip label="None" />
            ) : (
              keyMembers.map((memberId) => (
                <Chip
                  key={memberId}
                  color="success"
                  label={getPublisherName(memberId)}
                />
              ))
            )}
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
}