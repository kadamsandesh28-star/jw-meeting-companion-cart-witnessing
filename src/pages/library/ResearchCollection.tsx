import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Alert,
  Box,
  Card,
  CardContent,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";

import {
  getCollection,
  updateCollection,
  ResearchCollection,
} from "../../services/researchService";

export default function ResearchCollectionPage() {
  const { id } = useParams();

  const [collection, setCollection] =
    useState<ResearchCollection | null>(null);

  const [tab, setTab] = useState(0);

  useEffect(() => {
    if (!id) return;

    const loaded = getCollection(id);

    if (loaded) {
      setCollection(loaded);
    }
  }, [id]);

  function updateNotes(notes: string) {
    if (!collection) return;

    const updated = {
      ...collection,
      notes,
    };

    setCollection(updated);

    updateCollection(updated);
  }

  if (!collection) {
    return (
      <Alert severity="error">
        Collection not found.
      </Alert>
    );
  }

  return (
    <Box>
      <Typography
        variant="h4"
        fontWeight="bold"
      >
        {collection.icon} {collection.title}
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mb: 3 }}
      >
        Research Notebook
      </Typography>

      <Card
        sx={{
          mb: 3,
          borderRadius: 3,
        }}
      >
        <Tabs
          value={tab}
          onChange={(_, value) => setTab(value)}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="📝 Notes" />
          <Tab label="📖 Scriptures" />
          <Tab label="📎 References" />
          <Tab label="💎 Gems" />
          <Tab label="⭐ Favorites" />
          <Tab label="🗄 Archive" />
        </Tabs>
      </Card>

      {tab === 0 && (
        <Card
          sx={{
            borderRadius: 3,
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              gutterBottom
            >
              📝 Research Notes
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={12}
              value={collection.notes}
              onChange={(e) =>
                updateNotes(e.target.value)
              }
              placeholder="Write your research notes..."
            />

            <Typography
              color="success.main"
              sx={{ mt: 2 }}
            >
              ✅ Saved Automatically
            </Typography>
          </CardContent>
        </Card>
      )}

      {tab === 1 && (
        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6">
              📖 Scriptures
            </Typography>

            <Typography color="text.secondary">
              Coming next...
            </Typography>
          </CardContent>
        </Card>
      )}

      {tab === 2 && (
        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6">
              📎 References
            </Typography>

            <Typography color="text.secondary">
              Coming next...
            </Typography>
          </CardContent>
        </Card>
      )}

      {tab === 3 && (
        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6">
              💎 Gems
            </Typography>

            <Typography color="text.secondary">
              Coming next...
            </Typography>
          </CardContent>
        </Card>
      )}

      {tab === 4 && (
        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6">
              ⭐ Favorites
            </Typography>

            <Typography color="text.secondary">
              Coming next...
            </Typography>
          </CardContent>
        </Card>
      )}

      {tab === 5 && (
        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6">
              🗄 Archive
            </Typography>

            <Typography color="text.secondary">
              Coming next...
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}