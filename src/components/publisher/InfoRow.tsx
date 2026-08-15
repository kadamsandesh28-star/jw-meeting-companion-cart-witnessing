import React from "react";
import {
  Box,
  Stack,
  Typography,
} from "@mui/material";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export interface InfoRowProps {
  label: string;
  value?: React.ReactNode;
  icon?: React.ReactNode;
  divider?: boolean;
}

const InfoRow: React.FC<InfoRowProps> = ({
  label,
  value,
  icon,
  divider = true,
}) => {
  return (
    <Box
      sx={{
        py: 1.5,
        borderBottom: divider
          ? "1px solid"
          : "none",
        borderColor: "divider",
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Stack
          direction="row"
          spacing={1.5}
          alignItems="center"
          sx={{
            minWidth: 180,
          }}
        >
          {icon ?? (
            <ChevronRightIcon
              fontSize="small"
              color="action"
            />
          )}

          <Typography
            variant="body2"
            color="text.secondary"
          >
            {label}
          </Typography>
        </Stack>

        <Typography
          variant="body1"
          fontWeight={500}
          textAlign="right"
          sx={{
            flex: 1,
            wordBreak: "break-word",
          }}
        >
          {value || "-"}
        </Typography>
      </Stack>
    </Box>
  );
};

export default InfoRow;