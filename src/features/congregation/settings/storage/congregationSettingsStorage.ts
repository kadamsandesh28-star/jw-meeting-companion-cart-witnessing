import type { CongregationSettings } from "../models/CongregationSettings";

const STORAGE_KEY = "congregation-settings";

const defaultSettings: CongregationSettings = {
  congregationName: "Sunrise Congregation",

  kingdomHall: "",

  city: "",

  circuit: "",

  language: "English",

  scripture: {
    text: "Do not go beyond the things that are written.",
    reference: "1 Corinthians 4:6",
  },
};

export const congregationSettingsStorage = {
  get(): CongregationSettings {
    const stored =
      localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return defaultSettings;
    }

    try {
      return {
        ...defaultSettings,
        ...JSON.parse(stored),
      };
    } catch {
      return defaultSettings;
    }
  },

  save(
    settings: CongregationSettings
  ) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(settings)
    );
  },
};