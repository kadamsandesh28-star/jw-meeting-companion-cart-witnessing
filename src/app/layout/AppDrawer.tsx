import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";

import { navigationItems } from "./Navigation";

interface AppDrawerProps {
  drawerWidth: number;
  mobileOpen: boolean;
  onClose: () => void;
}

export default function AppDrawer({
  drawerWidth,
  mobileOpen,
  onClose,
}: AppDrawerProps) {
  const drawerContent = (
    <>
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          py: 3,
          px: 3,
          minHeight: 110,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            color: "#0F172A",
            lineHeight: 1.1,
          }}
        >
          JW Meeting
        </Typography>

        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            color: "#0F172A",
            lineHeight: 1.1,
          }}
        >
          Companion
        </Typography>

        <Typography
          variant="body2"
          sx={{
            mt: 1,
            color: "#64748B",
          }}
        >
          Personal Workspace
        </Typography>
      </Toolbar>

      <Divider sx={{ mx: 2 }} />

      <Typography
        variant="overline"
        sx={{
          px: 3,
          pt: 2,
          color: "#64748B",
          fontWeight: 700,
          letterSpacing: 1.2,
        }}
      >
        Navigation
      </Typography>

      <List
        sx={{
          px: 2,
          mt: 1,
        }}
      >
        {navigationItems.map((item) => {
          const Icon = item.icon;

          return (
            <ListItemButton
              key={item.path}
              component={NavLink}
              to={item.path}
              onClick={onClose}
              sx={{
                borderRadius: 3,
                mb: 0.5,
                py: 1.1,

                color: "#334155",

                "& .MuiListItemIcon-root": {
                  color: "#64748B",
                  minWidth: 40,
                },

                "&:hover": {
                  bgcolor: "#EEF4FF",
                },

                "&.active": {
                  bgcolor: "#2563EB",
                  color: "#fff",
                  boxShadow: "0 8px 18px rgba(37,99,235,.25)",

                  "& .MuiListItemIcon-root": {
                    color: "#fff",
                  },
                },
              }}
            >
              <ListItemIcon>
                <Icon />
              </ListItemIcon>

              <ListItemText
                primary={item.title}
                primaryTypographyProps={{
                  fontWeight: 600,
                }}
              />
            </ListItemButton>
          );
        })}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      <Divider sx={{ mx: 2 }} />

      <Box
        sx={{
          p: 3,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: "#94A3B8",
          }}
        >
          Version 2.0
        </Typography>
      </Box>
    </>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: {
          md: drawerWidth,
        },
        flexShrink: {
          md: 0,
        },
      }}
    >
      {/* Mobile Drawer */}

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: {
            xs: "block",
            md: "none",
          },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            bgcolor: "#F8FAFC",
            borderRight: "1px solid #E2E8F0",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop Drawer */}

      <Drawer
        variant="permanent"
        open
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "#F8FAFC",
            borderRight: "1px solid #E2E8F0",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}