import { useState } from "react";

import { congregationSettingsStorage } from "../storage/congregationSettingsStorage";

export function useCongregationSettings() {
  const [settings, setSettings] =
    useState(
      congregationSettingsStorage.get()
    );

  const save = (
    next: typeof settings
  ) => {
    setSettings(next);

    congregationSettingsStorage.save(
      next
    );
  };

  return {
    settings,
    save,
  };
}