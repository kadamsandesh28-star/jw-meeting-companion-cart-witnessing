import { useEffect, useState } from "react";
import { ReturnVisit } from "../types/returnVisit";
import { updateReturnVisit } from "../services/returnVisitService";

interface EditReturnVisitDialogProps {
  open: boolean;
  visit: ReturnVisit | null;
  onClose: () => void;
  onSaved: () => void;
}

export default function EditReturnVisitDialog({
  open,
  visit,
  onClose,
  onSaved,
}: EditReturnVisitDialogProps) {
  const [form, setForm] = useState<ReturnVisit | null>(null);

  useEffect(() => {
    if (visit) {
      setForm({ ...visit });
    } else {
      setForm(null);
    }
  }, [visit]);

  if (!open || !form) return null;

  function updateField<K extends keyof ReturnVisit>(
    field: K,
    value: ReturnVisit[K]
  ) {
    setForm((prev) =>
      prev
        ? {
            ...prev,
            [field]: value,
          }
        : prev
    );
  }

  function handleSave() {
    const currentForm = form;

    if (!currentForm) return;

    if (!currentForm.name.trim()) {
      alert("Please enter a name.");
      return;
    }

    if (!currentForm.address.trim()) {
      alert("Please enter an address.");
      return;
    }

    if (!currentForm.nextVisit) {
      alert("Please choose the next visit date.");
      return;
    }

    updateReturnVisit({
      ...currentForm,
      updatedAt: new Date().toISOString(),
    });

    onSaved();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900">
        <h2 className="mb-6 text-2xl font-bold dark:text-white">
          Edit Return Visit
        </h2>

        <div className="space-y-4">
          <input
            className="w-full rounded-lg border p-3 dark:bg-slate-800 dark:text-white"
            placeholder="Name"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
          />

          <input
            className="w-full rounded-lg border p-3 dark:bg-slate-800 dark:text-white"
            placeholder="Address"
            value={form.address}
            onChange={(e) => updateField("address", e.target.value)}
          />

          <input
            className="w-full rounded-lg border p-3 dark:bg-slate-800 dark:text-white"
            placeholder="Phone"
            value={form.phone ?? ""}
            onChange={(e) => updateField("phone", e.target.value)}
          />

          <input
            className="w-full rounded-lg border p-3 dark:bg-slate-800 dark:text-white"
            placeholder="Email"
            value={form.email ?? ""}
            onChange={(e) => updateField("email", e.target.value)}
          />

          <input
            type="date"
            className="w-full rounded-lg border p-3 dark:bg-slate-800 dark:text-white"
            value={form.nextVisit}
            onChange={(e) => updateField("nextVisit", e.target.value)}
          />

          <select
            className="w-full rounded-lg border p-3 dark:bg-slate-800 dark:text-white"
            value={form.status}
            onChange={(e) =>
              updateField(
                "status",
                e.target.value as ReturnVisit["status"]
              )
            }
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Not Home">Not Home</option>
            <option value="Moved Away">Moved Away</option>
          </select>

          <textarea
            rows={4}
            className="w-full rounded-lg border p-3 dark:bg-slate-800 dark:text-white"
            placeholder="Notes"
            value={form.notes}
            onChange={(e) => updateField("notes", e.target.value)}
          />

          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={onClose}
              className="rounded-lg border px-5 py-2"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}