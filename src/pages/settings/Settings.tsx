import { useEffect, useRef, useState } from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import SaveRoundedIcon from "@mui/icons-material/SaveRounded";

import {
  loadSettings,
  updateSettings,
  updateStudyResources,
  ThemeMode,
} from "../../services/settingsService";

import { useAppTheme } from "../../theme/ThemeContext";

import {
  downloadBackup,
  restoreBackup,
  BackupData,
} from "../../services/backupService";

import {
  getUserRole,
  setUserRole,
  UserRole,
} from "../../services/userRoleService";

import {
  loadCongregationProfile,
  saveCongregationProfile,
} from "../../features/settings/storage/congregationProfileStorage";

export default function Settings() {
  const [midweekLink, setMidweekLink] =
    useState("");

  const [weekendLink, setWeekendLink] =
    useState("");

  const [
    dailyScriptureLink,
    setDailyScriptureLink,
  ] = useState("");

  const [theme, setTheme] =
    useState<ThemeMode>("system");

  const [userRole, setUserRoleState] =
    useState<UserRole>("publisher");

  const [
    congregationName,
    setCongregationName,
  ] = useState("");

  const [
    kingdomHall,
    setKingdomHall,
  ] = useState("");

  const [city, setCity] =
    useState("");

  const [circuit, setCircuit] =
    useState("");

  const [language, setLanguage] =
    useState("English");

  const [
    scriptureText,
    setScriptureText,
  ] = useState("");

  const [
    scriptureReference,
    setScriptureReference,
  ] = useState("");

  const { setMode } =
    useAppTheme();

  const fileInputRef =
    useRef<HTMLInputElement | null>(
      null
    );

  useEffect(() => {
    const settings =
      loadSettings();

    setMidweekLink(
      settings.resources.workbookUrl
    );

    setWeekendLink(
      settings.resources.watchtowerUrl
    );

    setDailyScriptureLink(
      settings.resources.dailyScriptureUrl
    );

    setTheme(settings.theme);

    setUserRoleState(
      getUserRole()
    );

    const profile =
      loadCongregationProfile();

    setCongregationName(
      profile.congregationName
    );

    setKingdomHall(
      profile.kingdomHall
    );

    setCity(
      profile.city || ""
    );

    setCircuit(
      profile.circuit
    );

    setLanguage(
      profile.language
    );

    setScriptureText(
      profile.scriptureText
    );

    setScriptureReference(
      profile.scriptureReference
    );
  }, []);

  function saveAllSettings() {
    updateStudyResources({
      workbookUrl:
        midweekLink,

      watchtowerUrl:
        weekendLink,

      dailyScriptureUrl:
        dailyScriptureLink,
    });

    updateSettings({
      theme,
    });

    setMode(theme);

    setUserRole(userRole);

    saveCongregationProfile({
      congregationName,
      kingdomHall,
      city,
      circuit,
      language,
      scriptureText,
      scriptureReference,
    });

    alert(
      "✅ Settings saved successfully!"
    );
  }

  function handleRestore(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader =
      new FileReader();

    reader.onload = () => {
      try {
        const backup =
          JSON.parse(
            reader.result as string
          ) as BackupData;

        const confirmRestore =
          window.confirm(
            "Restore this backup? This will overwrite your current local data."
          );

        if (!confirmRestore) {
          return;
        }

        restoreBackup(
          backup
        );

        alert(
          "✅ Backup restored successfully.\n\nPlease refresh the application."
        );
      } catch {
        alert(
          "❌ Invalid backup file."
        );
      }
    };

    reader.readAsText(file);
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h4"
        fontWeight={800}
        sx={{ mb: 3 }}
      >
        ⚙️ Settings
      </Typography>

      <Card
        sx={{
          borderRadius: 4,
        }}
      >
        <CardContent>
          {/* Congregation */}

          <Typography
            variant="h6"
            gutterBottom
          >
            🏠 Congregation
          </Typography>

          <TextField
            fullWidth
            margin="normal"
            label="Congregation Name"
            value={congregationName}
            onChange={(e) =>
              setCongregationName(
                e.target.value
              )
            }
          />

          <TextField
            fullWidth
            margin="normal"
            label="Kingdom Hall"
            value={kingdomHall}
            onChange={(e) =>
              setKingdomHall(
                e.target.value
              )
            }
          />

          <TextField
            fullWidth
            margin="normal"
            label="City / Location"
            placeholder="e.g. Vadodara"
            helperText="Used to display current weather on the Home page."
            value={city}
            onChange={(e) =>
              setCity(
                e.target.value
              )
            }
          />

          <TextField
            fullWidth
            margin="normal"
            label="Circuit"
            value={circuit}
            onChange={(e) =>
              setCircuit(
                e.target.value
              )
            }
          />

          <TextField
            fullWidth
            margin="normal"
            label="Language"
            value={language}
            onChange={(e) =>
              setLanguage(
                e.target.value
              )
            }
          />

          <TextField
            fullWidth
            margin="normal"
            label="Dashboard Scripture"
            value={scriptureText}
            onChange={(e) =>
              setScriptureText(
                e.target.value
              )
            }
          />

          <TextField
            fullWidth
            margin="normal"
            label="Scripture Reference"
            value={
              scriptureReference
            }
            onChange={(e) =>
              setScriptureReference(
                e.target.value
              )
            }
          />

          <Divider
            sx={{ my: 4 }}
          />

          {/* Study Resources */}

          <Typography
            variant="h6"
            gutterBottom
          >
            📚 Study Resources
          </Typography>

          <TextField
            fullWidth
            label="Midweek Workbook URL"
            margin="normal"
            value={midweekLink}
            onChange={(e) =>
              setMidweekLink(
                e.target.value
              )
            }
          />

          <TextField
            fullWidth
            label="Weekend Study URL"
            margin="normal"
            value={weekendLink}
            onChange={(e) =>
              setWeekendLink(
                e.target.value
              )
            }
          />

          <TextField
            fullWidth
            label="Daily Scripture URL"
            margin="normal"
            value={
              dailyScriptureLink
            }
            onChange={(e) =>
              setDailyScriptureLink(
                e.target.value
              )
            }
          />

          <Divider
            sx={{ my: 4 }}
          />

          {/* Appearance */}

          <Typography
            variant="h6"
            gutterBottom
          >
            🎨 Appearance
          </Typography>

          <FormControl fullWidth>
            <InputLabel>
              Theme
            </InputLabel>

            <Select
              value={theme}
              label="Theme"
              onChange={(e) =>
                setTheme(
                  e.target.value as ThemeMode
                )
              }
            >
              <MenuItem value="system">
                🖥️ System
              </MenuItem>

              <MenuItem value="light">
                ☀️ Light
              </MenuItem>

              <MenuItem value="dark">
                🌙 Dark
              </MenuItem>
            </Select>
          </FormControl>

          <Divider
            sx={{ my: 4 }}
          />

          {/* Privileges */}

          <Typography
            variant="h6"
            gutterBottom
          >
            👤 Privileges &
            Responsibilities
          </Typography>

          <FormControl fullWidth>
            <InputLabel>
              Role
            </InputLabel>

            <Select
              value={userRole}
              label="Role"
              onChange={(e) =>
                setUserRoleState(
                  e.target.value as UserRole
                )
              }
            >
              <MenuItem value="publisher">
                General Publisher
              </MenuItem>

              <MenuItem value="ministerial-servant">
                Ministerial Servant
              </MenuItem>

              <MenuItem value="elder">
                Elder
              </MenuItem>
            </Select>
          </FormControl>

          <Divider
            sx={{ my: 4 }}
          />

          {/* Backup */}

          <Typography
            variant="h6"
            gutterBottom
          >
            💾 Backup & Restore
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            sx={{ mt: 2 }}
          >
            <Button
              variant="contained"
              onClick={
                downloadBackup
              }
            >
              ⬇️ Export Backup
            </Button>

            <Button
              variant="outlined"
              onClick={() =>
                fileInputRef.current?.click()
              }
            >
              📂 Restore Backup
            </Button>
          </Stack>

          <input
            hidden
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={
              handleRestore
            }
          />

          <Divider
            sx={{ my: 4 }}
          />

          <Button
            variant="contained"
            size="large"
            startIcon={
              <SaveRoundedIcon />
            }
            onClick={
              saveAllSettings
            }
          >
            Save Settings
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}