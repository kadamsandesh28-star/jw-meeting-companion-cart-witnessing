import {
  Card,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";

interface ProfileSectionProps {
  title: string;
  children: ReactNode;
}

export default function ProfileSection({
  title,
  children,
}: ProfileSectionProps) {
  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: 3,
        height: "100%",
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          fontWeight={700}
          gutterBottom
        >
          {title}
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {children}
      </CardContent>
    </Card>
  );
}