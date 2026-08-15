import { useEffect, useState } from "react";

import {
  Box,
  Card,
  CardContent,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";

const STORAGE_KEYS = {
  gems: "jw-gems-main",
  scriptures: "jw-gems-scriptures",
  applications: "jw-gems-applications",
  favorites: "jw-gems-favorites",
};

export default function Gems() {
  const [tab, setTab] = useState(0);

  const [gems, setGems] = useState("");
  const [scriptures, setScriptures] = useState("");
  const [applications, setApplications] = useState("");
  const [favorites, setFavorites] = useState("");

  useEffect(() => {
    setGems(localStorage.getItem(STORAGE_KEYS.gems) || "");
    setScriptures(localStorage.getItem(STORAGE_KEYS.scriptures) || "");
    setApplications(localStorage.getItem(STORAGE_KEYS.applications) || "");
    setFavorites(localStorage.getItem(STORAGE_KEYS.favorites) || "");
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.gems, gems);
  }, [gems]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.scriptures, scriptures);
  }, [scriptures]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.applications, applications);
  }, [applications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.favorites, favorites);
  }, [favorites]);

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold">
        💎 Gems Hub
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Record and treasure spiritual gems.
      </Typography>

      <Card sx={{ mb: 3, borderRadius: 3 }}>
        <Tabs
          value={tab}
          onChange={(_, value) => setTab(value)}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="💎 Gems" />
          <Tab label="📖 Scriptures" />
          <Tab label="❤️ Applications" />
          <Tab label="⭐ Favorites" />
        </Tabs>
      </Card>

      {tab === 0 && (
        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              💎 My Spiritual Gems
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={12}
              value={gems}
              onChange={(e) => setGems(e.target.value)}
              placeholder="Record your spiritual gems..."
            />

            <Typography color="success.main" sx={{ mt: 2 }}>
              ✅ Saved Automatically
            </Typography>
          </CardContent>
        </Card>
      )}

      {tab === 1 && (
        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              📖 Related Scriptures
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={12}
              value={scriptures}
              onChange={(e) => setScriptures(e.target.value)}
              placeholder="Record scriptures related to your gems..."
            />

            <Typography color="success.main" sx={{ mt: 2 }}>
              ✅ Saved Automatically
            </Typography>
          </CardContent>
        </Card>
      )}

      {tab === 2 && (
        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              ❤️ Personal Applications
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={12}
              value={applications}
              onChange={(e) => setApplications(e.target.value)}
              placeholder="How can these gems be applied?"
            />

            <Typography color="success.main" sx={{ mt: 2 }}>
              ✅ Saved Automatically
            </Typography>
          </CardContent>
        </Card>
      )}

      {tab === 3 && (
        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              ⭐ Favorite Gems
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={12}
              value={favorites}
              onChange={(e) => setFavorites(e.target.value)}
              placeholder="Keep your favorite spiritual gems here..."
            />

            <Typography color="success.main" sx={{ mt: 2 }}>
              ✅ Saved Automatically
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}