import {
  Autocomplete,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { publisherService } from "../../publishers/services/publisherService";
import { getPublisherDisplayName } from "../../publishers/utils/getPublisherDisplayName";
import { ServiceCommittee } from "../types/ServiceCommittee";

interface CommitteeMembersProps {
  serviceCommittee: ServiceCommittee;
  onChange: (serviceCommittee: ServiceCommittee) => void;
}

export default function CommitteeMembers({
  serviceCommittee,
  onChange,
}: CommitteeMembersProps) {
  const publishers = publisherService.getAll();

  const getPublisher = (id?: string) =>
    publishers.find((p) => p.id === id) ?? null;

  return (
    <Stack spacing={3}>
      <Typography variant="h6">
        Committee Members
      </Typography>

      <Autocomplete
        options={publishers}
        value={getPublisher(
          serviceCommittee.coordinatorPublisherId
        )}
        getOptionLabel={getPublisherDisplayName}
        onChange={(_, value) =>
          onChange({
            ...serviceCommittee,
            coordinatorPublisherId: value?.id ?? "",
          })
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Coordinator"
          />
        )}
      />

      <Autocomplete
        options={publishers}
        value={getPublisher(
          serviceCommittee.secretaryPublisherId
        )}
        getOptionLabel={getPublisherDisplayName}
        onChange={(_, value) =>
          onChange({
            ...serviceCommittee,
            secretaryPublisherId: value?.id ?? "",
          })
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Secretary"
          />
        )}
      />

      <Autocomplete
        options={publishers}
        value={getPublisher(
          serviceCommittee.serviceOverseerPublisherId
        )}
        getOptionLabel={getPublisherDisplayName}
        onChange={(_, value) =>
          onChange({
            ...serviceCommittee,
            serviceOverseerPublisherId: value?.id ?? "",
          })
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Service Overseer"
          />
        )}
      />

      <Autocomplete
        multiple
        options={publishers}
        value={publishers.filter((publisher) =>
          serviceCommittee.memberPublisherIds.includes(
            publisher.id
          )
        )}
        getOptionLabel={getPublisherDisplayName}
        onChange={(_, values) =>
          onChange({
            ...serviceCommittee,
            memberPublisherIds: values
  .filter(
    (
      p
    ): p is NonNullable<typeof p> => p != null
  )
  .map((p) => p.id),
          })
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Committee Members"
          />
        )}
      />
    </Stack>
  );
}