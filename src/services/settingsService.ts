export type ThemeMode = "light" | "dark" | "system";

export interface CongregationSettings {
  congregationName: string;
  circuit: string;
  language: string;
  coordinator: string;
  secretary: string;
  serviceOverseer: string;
}

export interface DashboardSettings {
  scripture: string;
  scriptureReference: string;
}

export interface StudyResourcesSettings {
  workbookTitle: string;
  workbookUrl: string;

  watchtowerTitle: string;
  watchtowerUrl: string;

  dailyScriptureUrl: string;
}

export interface AppSettings {
  // Appearance
  theme: ThemeMode;
  accentColor: string;

  // Dashboard
  showDailyScripture: boolean;
  showHeroClock: boolean;
  showQuickActions: boolean;
  showSpiritualSnapshot: boolean;

  // Congregation
  congregation: CongregationSettings;

  // Dashboard Header
  dashboard: DashboardSettings;

  // Meeting Resources
  resources: StudyResourcesSettings;
}

const STORAGE_KEY = "jw-app-settings";

const defaultSettings: AppSettings = {
  theme: "system",

  accentColor: "#1976d2",

  showDailyScripture: true,

  showHeroClock: true,

  showQuickActions: true,

  showSpiritualSnapshot: true,

  congregation: {
    congregationName: "West Hills Congregation",
    circuit: "",
    language: "English",
    coordinator: "",
    secretary: "",
    serviceOverseer: "",
  },

  dashboard: {
    scripture: "Shepherd the flock of God.",
    scriptureReference: "1 Peter 5:2",
  },

  resources: {
    workbookTitle: "Meeting Workbook",
    workbookUrl: "",

    watchtowerTitle: "Watchtower Study",
    watchtowerUrl: "",

    dailyScriptureUrl: "",
  },
};

export function loadSettings(): AppSettings {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    return defaultSettings;
  }

  try {
    const parsed = JSON.parse(saved);

    return {
      ...defaultSettings,
      ...parsed,

      congregation: {
        ...defaultSettings.congregation,
        ...(parsed.congregation ?? {}),
      },

      dashboard: {
        ...defaultSettings.dashboard,
        ...(parsed.dashboard ?? {}),
      },

      resources: {
        ...defaultSettings.resources,
        ...(parsed.resources ?? {}),
      },
    };
  } catch {
    return defaultSettings;
  }
}

export function saveSettings(
  settings: AppSettings
) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(settings)
  );
}

export function updateSettings(
  partial: Partial<AppSettings>
) {
  const current = loadSettings();

  saveSettings({
    ...current,
    ...partial,
  });
}

export function updateCongregationSettings(
  partial: Partial<CongregationSettings>
) {
  const current = loadSettings();

  saveSettings({
    ...current,
    congregation: {
      ...current.congregation,
      ...partial,
    },
  });
}

export function updateDashboardSettings(
  partial: Partial<DashboardSettings>
) {
  const current = loadSettings();

  saveSettings({
    ...current,
    dashboard: {
      ...current.dashboard,
      ...partial,
    },
  });
}

export function updateStudyResources(
  partial: Partial<StudyResourcesSettings>
) {
  const current = loadSettings();

  saveSettings({
    ...current,
    resources: {
      ...current.resources,
      ...partial,
    },
  });
}

export function resetSettings() {
  saveSettings(defaultSettings);
}