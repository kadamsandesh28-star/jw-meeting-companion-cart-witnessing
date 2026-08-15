import React from "react";
import {
  Avatar,
  Box,
  Chip,
  Divider,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PersonIcon from "@mui/icons-material/Person";

export interface ProfileHeaderProps {
  fullName: string;
  displayName?: string;
  role?: string;
  congregationGroup?: string;
  phone?: string;
  email?: string;
  whatsapp?: string;
  avatarUrl?: string;
  privileges?: string[];
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  fullName,
  displayName,
  role,
  congregationGroup,
  phone,
  email,
  whatsapp,
  avatarUrl,
  privileges = [],
}) => {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 3,
        mb: 3,
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={3}
        alignItems={{ xs: "center", md: "flex-start" }}
      >
        <Avatar
          src={avatarUrl}
          sx={{
            width: 110,
            height: 110,
            bgcolor: "primary.main",
            fontSize: 42,
          }}
        >
          {!avatarUrl && <PersonIcon fontSize="large" />}
        </Avatar>

        <Box flex={1}>
          <Typography variant="h4" fontWeight={700}>
            {fullName}
          </Typography>

          {displayName && (
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              {displayName}
            </Typography>
          )}

          <Stack
            direction="row"
            spacing={1}
            flexWrap="wrap"
            sx={{ mt: 2 }}
          >
            {role && (
              <Chip
                color="primary"
                label={role}
              />
            )}

            {congregationGroup && (
              <Chip
                variant="outlined"
                label={`Group ${congregationGroup}`}
              />
            )}

            {privileges.map((privilege) => (
              <Chip
                key={privilege}
                size="small"
                color="success"
                label={privilege}
              />
            ))}
          </Stack>

          <Divider sx={{ my: 2 }} />

          <Stack direction="row" spacing={1}>
            {phone && (
              <Tooltip title={phone}>
                <IconButton color="primary">
                  <CallIcon />
                </IconButton>
              </Tooltip>
            )}

            {email && (
              <Tooltip title={email}>
                <IconButton color="primary">
                  <EmailIcon />
                </IconButton>
              </Tooltip>
            )}

            {whatsapp && (
              <Tooltip title={whatsapp}>
                <IconButton color="success">
                  <WhatsAppIcon />
                </IconButton>
              </Tooltip>
            )}
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
};

export default ProfileHeader;