import { useEffect, useState } from "react";
import { BibleStudy, BibleStudyStatus } from "../types/bibleStudy";
import { updateBibleStudy } from "../services/bibleStudyService";

interface EditBibleStudyDialogProps {
  open: boolean;
  study: BibleStudy | null;
  onClose: () => void;
  onSaved: () => void;
}

export default function EditBibleStudyDialog({
  open,
  study,
  onClose,
  onSaved,
}: EditBibleStudyDialogProps) {
  const [form, setForm] = useState<BibleStudy | null>(null);

  useEffect(() => {
    if (study) {
      setForm({ ...study });
    } else {
      setForm(null);
    }
  }, [study]);

  if (!open || !form) return null;

  function updateField<K extends keyof BibleStudy>(
    field: K,
    value: BibleStudy[K]
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

    if (!currentForm.studentName.trim()) {
      alert("Please enter the student's name.");
      return;
    }

    if (!currentForm.address.trim()) {
      alert("Please enter the address.");
      return;
    }

    if (!currentForm.nextStudyDate) {
      alert("Please select the next study date.");
      return;
    }

    updateBibleStudy({
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
          Edit Bible Study
        </h2>

        <div className="space-y-4">
          <input
            className="w-full rounded-lg border p-3 dark:bg-slate-800 dark:text-white"
            placeholder="Student Name"
            value={form.studentName}
            onChange={(e) => updateField("studentName", e.target.value)}
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
            value={form.contactNumber ?? ""}
            onChange={(e) => updateField("contactNumber", e.target.value)}
          />

          <input
            className="w-full rounded-lg border p-3 dark:bg-slate-800 dark:text-white"
            placeholder="Email"
            value={form.email ?? ""}
            onChange={(e) => updateField("email", e.target.value)}
          />

          <input
            className="w-full rounded-lg border p-3 dark:bg-slate-800 dark:text-white"
            placeholder="Publication"
            value={form.publication}
            onChange={(e) => updateField("publication", e.target.value)}
          />

          <input
            type="number"
            min={1}
            className="w-full rounded-lg border p-3 dark:bg-slate-800 dark:text-white"
            value={form.currentLesson}
            onChange={(e) =>
              updateField("currentLesson", Number(e.target.value))
            }
          />

          <input
            type="date"
            className="w-full rounded-lg border p-3 dark:bg-slate-800 dark:text-white"
            value={form.nextStudyDate}
            onChange={(e) => updateField("nextStudyDate", e.target.value)}
          />

          <select
            className="w-full rounded-lg border p-3 dark:bg-slate-800 dark:text-white"
            value={form.status}
            onChange={(e) =>
              updateField(
                "status",
                e.target.value as BibleStudyStatus
              )
            }
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Completed">Completed</option>
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