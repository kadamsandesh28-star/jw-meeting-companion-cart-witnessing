import React from "react";
import {
  Chip,
  Tooltip,
} from "@mui/material";

import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

export interface PrivilegeChipProps {
  label: string;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "error"
    | "info";
  icon?: React.ReactElement;
  tooltip?: string;
  variant?: "filled" | "outlined";
}

const PrivilegeChip: React.FC<PrivilegeChipProps> = ({
  label,
  color = "primary",
  icon,
  tooltip,
  variant = "filled",
}) => {
  const chip = (
    <Chip
      icon={icon ?? <WorkspacePremiumIcon />}
      label={label}
      color={color}
      variant={variant}
      size="small"
      sx={{
        fontWeight: 600,
        borderRadius: 2,
      }}
    />
  );

  if (tooltip) {
    return (
      <Tooltip title={tooltip}>
        <span>{chip}</span>
      </Tooltip>
    );
  }

  return chip;
};

export default PrivilegeChip;