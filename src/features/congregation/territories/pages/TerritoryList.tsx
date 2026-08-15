import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import MapIcon from "@mui/icons-material/Map";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useTerritories } from "../hooks/useTerritories";

export default function TerritoryList() {
  const { territories } = useTerritories();
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 3 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography variant="h4" fontWeight="bold">
          Territories
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() =>
            navigate("/congregation/territories/new")
          }
        >
          Add Territory
        </Button>
      </Box>

      <Stack spacing={2}>
        {territories.map((territory) => (
          <Card key={territory.id}>
            <CardContent>
              <Stack spacing={2}>
                <Typography variant="h6">
                  {territory.number}
                </Typography>

                <Typography variant="body1">
                  {territory.name}
                </Typography>

                <Stack
                  direction="row"
                  spacing={1}
                  flexWrap="wrap"
                >
                  <Chip
                    icon={<MapIcon />}
                    label={territory.type}
                    color="primary"
                    variant="outlined"
                  />

                  <Chip
                    label={territory.status}
                    color={
                      territory.status === "Available"
                        ? "success"
                        : territory.status === "Assigned"
                        ? "warning"
                        : "default"
                    }
                  />
                </Stack>

                {territory.addressNotes && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {territory.addressNotes}
                  </Typography>
                )}
              </Stack>
            </CardContent>

            <CardActions sx={{ px: 2, pb: 2 }}>
              <Button
                startIcon={<VisibilityIcon />}
                onClick={() =>
                  navigate(
                    `/congregation/territories/${territory.id}`
                  )
                }
              >
                View
              </Button>

              <Button
                startIcon={<EditIcon />}
                onClick={() =>
                  navigate(
                    `/congregation/territories/${territory.id}/edit`
                  )
                }
              >
                Edit
              </Button>
            </CardActions>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}