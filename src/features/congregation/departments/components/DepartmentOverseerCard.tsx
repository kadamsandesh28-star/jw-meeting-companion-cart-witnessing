import {
  Checkbox,
  Chip,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";

import { publisherService } from "../../publishers/services/publisherService";

interface DepartmentOverseerCardProps {
  overseerId?: string;
  assistantId?: string;
  memberIds?: string[];
  keyMemberIds?: string[];

  onOverseerChange?: (publisherId: string) => void;
  onAssistantChange?: (publisherId: string) => void;
  onMembersChange?: (memberIds: string[]) => void;
  onKeyMembersChange?: (memberIds: string[]) => void;
}

export default function DepartmentOverseerCard({
  overseerId = "",
  assistantId = "",
  memberIds = [],
  keyMemberIds = [],

  onOverseerChange,
  onAssistantChange,
  onMembersChange,
  onKeyMembersChange,
}: DepartmentOverseerCardProps) {
  const publishers = publisherService.getAll();

  const departmentMembers = publishers.filter((publisher) =>
    memberIds.includes(publisher.id)
  );

  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Stack spacing={3}>
        <Typography variant="h6">
          Overseer & Members
        </Typography>

        <FormControl fullWidth>
          <InputLabel>Department Overseer</InputLabel>

          <Select
            value={overseerId}
            label="Department Overseer"
            onChange={(e) =>
              onOverseerChange?.(e.target.value as string)
            }
          >
            <MenuItem value="">None</MenuItem>

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
          <InputLabel>Assistant</InputLabel>

          <Select
            value={assistantId}
            label="Assistant"
            onChange={(e) =>
              onAssistantChange?.(e.target.value as string)
            }
          >
            <MenuItem value="">None</MenuItem>

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
          <InputLabel>Department Members</InputLabel>

          <Select
            multiple
            value={memberIds}
            input={
              <OutlinedInput label="Department Members" />
            }
            onChange={(e) =>
              onMembersChange?.(
                e.target.value as string[]
              )
            }
            renderValue={(selected) => (
              <Stack
                direction="row"
                spacing={1}
                flexWrap="wrap"
              >
                {(selected as string[]).map((id) => {
                  const publisher = publishers.find(
                    (p) => p.id === id
                  );

                  return (
                    <Chip
                      key={id}
                      size="small"
                      label={
                        publisher
                          ? `${publisher.firstName} ${publisher.lastName}`
                          : id
                      }
                    />
                  );
                })}
              </Stack>
            )}
          >
            {publishers.map((publisher) => (
              <MenuItem
                key={publisher.id}
                value={publisher.id}
              >
                <Checkbox
                  checked={memberIds.includes(
                    publisher.id
                  )}
                />

                <ListItemText
                  primary={`${publisher.firstName} ${publisher.lastName}`}
                />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl
          fullWidth
          disabled={memberIds.length === 0}
        >
          <InputLabel>Key Members</InputLabel>

          <Select
            multiple
            value={keyMemberIds}
            input={
              <OutlinedInput label="Key Members" />
            }
            onChange={(e) =>
              onKeyMembersChange?.(
                e.target.value as string[]
              )
            }
            renderValue={(selected) => (
              <Stack
                direction="row"
                spacing={1}
                flexWrap="wrap"
              >
                {(selected as string[]).map((id) => {
                  const publisher = publishers.find(
                    (p) => p.id === id
                  );

                  return (
                    <Chip
                      key={id}
                      color="warning"
                      size="small"
                      label={
                        publisher
                          ? `${publisher.firstName} ${publisher.lastName}`
                          : id
                      }
                    />
                  );
                })}
              </Stack>
            )}
          >
            {departmentMembers.map((publisher) => (
              <MenuItem
                key={publisher.id}
                value={publisher.id}
              >
                <Checkbox
                  checked={keyMemberIds.includes(
                    publisher.id
                  )}
                />

                <ListItemText
                  primary={`${publisher.firstName} ${publisher.lastName}`}
                />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </Paper>
  );
}