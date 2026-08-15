import React from "react";
import {
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

export interface SectionCardProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}

const SectionCard: React.FC<SectionCardProps> = ({
  title,
  subtitle,
  action,
  children,
}) => {
  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: 3,
        mb: 3,
      }}
    >
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <div>
            <Typography
              variant="h6"
              fontWeight={700}
            >
              {title}
            </Typography>

            {subtitle && (
              <Typography
                variant="body2"
                color="text.secondary"
              >
                {subtitle}
              </Typography>
            )}
          </div>

          {action}
        </Stack>

        <Divider sx={{ my: 2 }} />

        {children}
      </CardContent>
    </Card>
  );
};

export default SectionCard;