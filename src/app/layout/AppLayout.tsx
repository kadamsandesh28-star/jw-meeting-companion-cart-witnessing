import { useState } from "react";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";

import AppDrawer from "./AppDrawer";
import AppHeader from "./AppHeader";

const drawerWidth = 280;

export default function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((open) => !open);
  };

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppHeader
        drawerWidth={drawerWidth}
        onMenuClick={handleDrawerToggle}
      />

      <AppDrawer
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
        onClose={handleDrawerClose}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: {
            md: `calc(100% - ${drawerWidth}px)`,
          },

          /* Workspace background */
          minHeight: "100vh",

          background: `
            linear-gradient(
              180deg,
              #F8FAFC 0%,
              #EEF4FF 100%
            )
          `,
        }}
      >
        <Toolbar />

        <Outlet />
      </Box>
    </Box>
  );
}