import React from "react";
import {
  Card,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";

export interface InfoCardProps {
  title: string;
  children: React.ReactNode;
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  children,
}) => {
  return (
    <Card
      variant="outlined"
      sx={{
        mb: 2,
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          gutterBottom
        >
          {title}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {children}
      </CardContent>
    </Card>
  );
};

export default InfoCard;