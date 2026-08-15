export interface BackupData {
  version: string;
  created: string;
  data: Record<string, string>;
}

export function createBackup(): BackupData {
  const data: Record<string, string> = {};

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    if (!key) continue;

    data[key] = localStorage.getItem(key) ?? "";
  }

  return {
    version: "1.0",
    created: new Date().toISOString(),
    data,
  };
}

export function restoreBackup(
  backup: BackupData
) {
  Object.entries(backup.data).forEach(
    ([key, value]) => {
      localStorage.setItem(key, value);
    }
  );
}

export function downloadBackup() {
  const backup = createBackup();

  const blob = new Blob(
    [JSON.stringify(backup, null, 2)],
    {
      type: "application/json",
    }
  );

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;

  link.download = `JW-Companion-Backup-${
    new Date().toISOString().split("T")[0]
  }.json`;

  link.click();

  URL.revokeObjectURL(url);
}