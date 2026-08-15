import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { ReactNode } from "react";

type DashboardCardProps = {
  title: string;
  icon: ReactNode;
  onClick: () => void;
};

export default function DashboardCard({
  title,
  icon,
  onClick,
}: DashboardCardProps) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        height: 140,
      }}
    >
      <CardActionArea
        onClick={onClick}
        sx={{
          height: "100%",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <div style={{ fontSize: 40 }}>{icon}</div>

          <Typography
            variant="h6"
            sx={{
              mt: 2,
              fontWeight: "bold",
            }}
          >
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}