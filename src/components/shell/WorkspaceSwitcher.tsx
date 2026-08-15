import { useState } from "react";
import {
  Button,
  Menu,
  MenuItem,
  ListItemText,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useNavigate } from "react-router-dom";

import { useWorkspace } from "../../contexts/WorkspaceContext";
import UnlockCongregationDialog from "../dialogs/UnlockCongregationDialog";

export default function WorkspaceSwitcher() {
  const {
    workspace,
    setWorkspace,
    unlockCongregation,
  } = useWorkspace();

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] =
    useState<null | HTMLElement>(null);

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const open = Boolean(anchorEl);

  const handleUnlock = () => {
    unlockCongregation();

    setWorkspace("congregation");

    setDialogOpen(false);

    navigate("/congregation");
  };

  return (
    <>
      <Button
        color="inherit"
        endIcon={<KeyboardArrowDownIcon />}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        {workspace === "personal"
          ? "🏠 Personal"
          : "🏢 Congregation"}
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          onClick={() => {
            setWorkspace("personal");
            navigate("/");
            setAnchorEl(null);
          }}
        >
          <ListItemText
            primary="🏠 Personal"
            secondary="Personal study & meetings"
          />
        </MenuItem>

        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            setDialogOpen(true);
          }}
        >
          <ListItemText
            primary="🏢 Congregation"
            secondary="Publisher records & reports"
          />
        </MenuItem>
      </Menu>

      <UnlockCongregationDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onUnlock={handleUnlock}
      />
    </>
  );
}