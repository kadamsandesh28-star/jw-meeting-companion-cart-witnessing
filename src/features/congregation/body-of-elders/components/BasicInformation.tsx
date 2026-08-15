import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";

import { publisherService } from "../../publishers/services/publisherService";
import { BodyMember, BodyRole } from "../types/bodyMember";

interface Props {
  member: BodyMember;
  onChange: (member: BodyMember) => void;
}

const roles: BodyRole[] = [
  "Coordinator",
  "Secretary",
  "Service Overseer",
  "Life and Ministry Overseer",
  "Watchtower Overseer",
  "Public Talk Coordinator",
  "Territory Overseer",
  "Literature Servant",
  "Accounts Overseer",
  "Group Overseer",
  "Elder",
];

export default function BasicInformation({
  member,
  onChange,
}: Props) {
  const publishers = publisherService.getAll();

  return (
    <Stack spacing={3}>
      <FormControl fullWidth>
        <InputLabel>Publisher</InputLabel>

        <Select
          label="Publisher"
          value={member.publisherId}
          onChange={(e) =>
            onChange({
              ...member,
              publisherId: e.target.value,
            })
          }
        >
          {publishers.map((publisher) => (
            <MenuItem
              key={publisher.id}
              value={publisher.id}
            >
              {publisher.firstName} {publisher.lastName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Role</InputLabel>

        <Select
          label="Role"
          value={member.role}
          onChange={(e) =>
            onChange({
              ...member,
              role: e.target.value as BodyRole,
            })
          }
        >
          {roles.map((role) => (
            <MenuItem
              key={role}
              value={role}
            >
              {role}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
}