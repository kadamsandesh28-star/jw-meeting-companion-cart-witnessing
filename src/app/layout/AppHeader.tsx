import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

interface AppHeaderProps {
  drawerWidth: number;
  onMenuClick: () => void;
}

export default function AppHeader({
  drawerWidth,
  onMenuClick,
}: AppHeaderProps) {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: {
          md: `calc(100% - ${drawerWidth}px)`,
        },
        ml: {
          md: `${drawerWidth}px`,
        },

        background: "rgba(255,255,255,0.88)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",

        color: "#1E293B",

        borderBottom: "1px solid #E2E8F0",

        boxShadow: "0 4px 20px rgba(15,23,42,.04)",
      }}
    >
      <Toolbar
        sx={{
          minHeight: 70,
          px: 3,
        }}
      >
        <IconButton
          edge="start"
          onClick={onMenuClick}
          sx={{
            mr: 2,
            color: "#475569",
            display: {
              md: "none",
            },
          }}
        >
          <MenuIcon />
        </IconButton>

        <Box flexGrow={1}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "#0F172A",
            }}
          >
            JW Meeting Companion
          </Typography>

          <Typography
            variant="caption"
            sx={{
              color: "#64748B",
              display: "block",
              mt: "-2px",
            }}
          >
            Personal Productivity Workspace
          </Typography>
        </Box>

        <Typography
          variant="body2"
          sx={{
            color: "#64748B",
            fontWeight: 500,
          }}
        >
          Congregation Management
        </Typography>
      </Toolbar>
    </AppBar>
  );
}