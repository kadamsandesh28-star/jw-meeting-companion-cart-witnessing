import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

interface Props {
  title: string;
  value: string;
  subtitle: string;
  link: string;
}

export default function SummaryCard({
  title,
  value,
  subtitle,
  link,
}: Props) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        height: "100%",
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 6,
        },
      }}
    >
      <CardActionArea
        component={Link}
        to={link}
        sx={{ height: "100%" }}
      >
        <CardContent>
          <Typography
            variant="h6"
            gutterBottom
          >
            {title}
          </Typography>

          <Typography
            variant="h3"
            color="primary"
            fontWeight="bold"
          >
            {value}
          </Typography>

          <Typography color="text.secondary">
            {subtitle}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}