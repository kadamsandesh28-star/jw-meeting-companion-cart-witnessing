import {
  Autocomplete,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { publisherService } from "../../publishers/services/publisherService";
import { ServiceGroup } from "../types/serviceGroup";

interface MembersSectionProps {
  serviceGroup: ServiceGroup;
  onChange: (serviceGroup: ServiceGroup) => void;
}

export default function MembersSection({
  serviceGroup,
  onChange,
}: MembersSectionProps) {
  const publishers = publisherService.getAll();

  const getPublisher = (id?: string) =>
    publishers.find((p) => p.id === id) ?? null;

  return (
    <Stack spacing={3}>
      <Typography variant="h6">
        Members
      </Typography>

      <Autocomplete
        options={publishers}
        value={getPublisher(
          serviceGroup.overseerPublisherId
        )}
        getOptionLabel={(option) =>
          `${option.firstName} ${option.lastName}`
        }
        onChange={(_, value) =>
          onChange({
            ...serviceGroup,
            overseerPublisherId: value?.id ?? "",
          })
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Overseer"
          />
        )}
      />

      <Autocomplete
        options={publishers}
        value={getPublisher(
          serviceGroup.assistantPublisherId
        )}
        getOptionLabel={(option) =>
          `${option.firstName} ${option.lastName}`
        }
        onChange={(_, value) =>
          onChange({
            ...serviceGroup,
            assistantPublisherId: value?.id ?? "",
          })
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Assistant"
          />
        )}
      />

      <Autocomplete
        multiple
        options={publishers}
        value={publishers.filter((publisher) =>
          serviceGroup.publisherIds.includes(
            publisher.id
          )
        )}
        getOptionLabel={(option) =>
          `${option.firstName} ${option.lastName}`
        }
        onChange={(_, values) =>
          onChange({
            ...serviceGroup,
            publisherIds: values.map((p) => p.id),
          })
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Publishers"
          />
        )}
      />
    </Stack>
  );
}