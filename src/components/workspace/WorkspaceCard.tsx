import { ReactNode } from "react";
import { Card, CardContent } from "@mui/material";

interface WorkspaceCardProps {
  children: ReactNode;
}

export default function WorkspaceCard({
  children,
}: WorkspaceCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        transition: "all .2s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: 3,
        },
      }}
    >
      <CardContent>{children}</CardContent>
    </Card>
  );
}