import Drawer from "@mui/material/Drawer";

import Sidebar from "./Sidebar";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function MobileDrawer({
  open,
  onClose,
}: Props) {
  return (
    <Drawer
      open={open}
      onClose={onClose}
      sx={{
        display: {
          xs: "block",
          md: "none",
        },
      }}
    >
      <Sidebar mobile />
    </Drawer>
  );
}